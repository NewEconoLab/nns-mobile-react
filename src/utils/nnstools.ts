import common from "@/store/common";
import { Contract } from "./contract";
import DomainSelling from "@/store/DomainSelling";
import { HASH_CONFIG } from "@/config";
import { CoinTool } from "@/utils/cointools";
import { Transaction } from "@/utils/transaction";
import o3tools from "@/utils/o3tools";

export class nnstools{

    
    /**
     * 域名转hash    
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    public static nameHash(domain: string): Neo.Uint256
    {
        const domainBytes:Uint8Array = ThinNeo.Helper.String2Bytes(domain);
        const hashd = Neo.Cryptography.Sha256.computeHash(domainBytes);
        return new Neo.Uint256(hashd);
    }

    /**
     * 子域名转hash
     * @param roothash  根域名hash
     * @param subdomain 子域名
     */
    public static nameHashSub(roothash: Neo.Uint256, subdomain: string): Neo.Uint256
    {
        const bs: Uint8Array = ThinNeo.Helper.String2Bytes(subdomain);
        if (bs.length === 0)
        {
            return roothash;
        }
        const domain = Neo.Cryptography.Sha256.computeHash(bs);
        const domainBytes = new Uint8Array(domain);
        const domainUint8arry = domainBytes.concat(new Uint8Array(roothash.bits.buffer));
        const sub = Neo.Cryptography.Sha256.computeHash(domainUint8arry);
        return new Neo.Uint256(sub);
    }

    /**
     * 返回一组域名的最终hash
     * @param domainarray 域名倒叙的数组
     */
    public static nameHashArray(domainarray: string[]): Neo.Uint256
    {
        domainarray.reverse();
        let hash: Neo.Uint256 = this.nameHash(domainarray[ 0 ]);
        for (let i = 1; i < domainarray.length; i++)
        {
            hash = this.nameHashSub(hash, domainarray[ i ]);
        }
        return hash;
    }
    
    /**
     * 注册器充值
     * @param amount 充值金额
     */
    public static async rechargeReg(amount: string)
    {
        const addressto = ThinNeo.Helper.GetAddressFromScriptHash(DomainSelling.RootNeo.register);
        const address = common.address;
        alert(address);
        alert(addressto);
        alert(amount);
        const count = Neo.Fixed8.parse(amount).getData().toNumber();
        alert(amount);
        const sb = Contract.buildScript_random(
            HASH_CONFIG.id_CGAS,
            "transfer",
            [
                "(addr)" + address,// from
                "(addr)" + addressto,// to
                "(int)" + count// value
            ]);
        //// 这个方法是为了在同一笔交易中转账并充值
        //// 当然你也可以分为两笔交易
        //// 插入下述两条语句，能得到txid
        sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
        sb.EmitSysCall("Neo.Transaction.GetHash");
        // 把TXID包进Array里
        sb.EmitPushNumber(Neo.BigInteger.fromString("1"));
        sb.Emit(ThinNeo.OpCode.PACK);
        sb.EmitPushString("setmoneyin");
        sb.EmitAppCall(DomainSelling.RootNeo.register);
        const script = sb.ToArray();
        try {
            const res = await Contract.contractInvokeTrans_attributes(script);
            if(res)
            {
                alert(res);
            }
            return res;
        } catch (error) {
            alert(JSON.stringify(error));
            throw new Error(error);
        }
    }

    /**
     * 域名开标
     */
    public static async startAuciton(register:Neo.Uint160,roothash:Neo.Uint160,subname: string)
    {
        try
        {
            const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
            const sb = Contract.buildScript_random(
                register, 
                "startAuction",
                [
                    '(hex160)' + who.toString(),
                    "(hex256)" + roothash.toString(),
                    "(str)" + subname
                ]);
            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res
        } catch (error)
        {
            throw error;
        }

    }

    /**
     * 竞标加价
     * @param domain 域名
     */
    public static async raise(id: string, amount: string, register: Neo.Uint160)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const count = Neo.Fixed8.parse(amount).getData().toNumber()
        const sb = Contract.buildScript_random(
            register,
            "raise",
            [ "(hex160)" + who.toString(), "(hex256)" + id, "(int)" + count ]
        );
        const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
        return res;
    }


    
    /**
     * Gas兑换CGas
     * @param count 兑换数量
     */
    public async exchangeCGas(count: number)
    {
        // 获得登陆信息
        const script = Contract.buildScript(HASH_CONFIG.id_CGAS, "mintTokens", []);
        // 获得sgas的合约地址
        const cgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(HASH_CONFIG.id_CGAS);
        try
        {
            const utxos = await CoinTool.getAssets();
            const tran = new Transaction(); // 创建交易体
            tran.creatInuptAndOutup(utxos[HASH_CONFIG.id_GAS],Neo.Fixed8.fromNumber(count),cgasaddr); // 给交易体塞入输入输出 (这个我没给你弄手续费)
            if (tran.inputs.length + tran.outputs.length > 60)
            {
                throw new Error("Don't have enough change")
            }
            else
            {
                const promise = new Promise((resolve, reject) =>{
                    // Parameter inversion 
                    tran.setScript(script.ToArray());   // 塞入执行合约用的脚本 hash
                    const msg = tran.GetMessage().clone();
                    o3tools.sign(msg.toHexString(),res =>{                            
                        tran.AddWitness((res as string).hexToBytes(), common.publicKey.hexToBytes(), common.address);
                        const data: Uint8Array = tran.GetRawData();                        
                        common.sendrawtransaction(data.toHexString())
                        .then(value=>{
                            if(!value)
                            {
                                reject("Transaction send failed");
                            }
                            resolve(value)
                        })
                        .catch(error=>{
                            reject(error)
                        })
                    }
                    )
                })
                return promise;
            }

            // return txid;
        } catch (error)
        {
            throw error;
        }
    }
}