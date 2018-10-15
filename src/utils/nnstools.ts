import common from "@/store/common";
import { Contract } from "./contract";
import DomainSelling from "@/store/DomainSelling";
import { HASH_CONFIG } from "@/config";
import { CoinTool } from "@/utils/cointools";
import { Transaction } from "@/utils/transaction";
import o3tools from "@/utils/o3tools";

export class nnstools{
    
    /**
     * 注册器充值
     * @param amount 充值金额
     */
    public static async rechargeReg(amount: string)
    {
        const addressto = ThinNeo.Helper.GetAddressFromScriptHash(DomainSelling.RootNeo.register);
        const address = common.address;
        const sb = Contract.buildScript_random(
            DomainSelling.RootNeo.register,
            "transfer",
            [
                "(addr)" + address,// from
                "(addr)" + addressto,// to
                "(int)" + amount.replace(".", "")// value
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
            return res;
        } catch (error) {
            alert(JSON.stringify(error));
            throw new Error(error);
        }
    }

    /**
     * 域名开标
     */
    public static async startAuciton(subname: string, register:Neo.Uint160,roothash:Neo.Uint160)
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
    public static async raise(id: string, amount: number, register: Neo.Uint160)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const count = Neo.Fixed8.parse(amount.toString()).getData().toNumber()
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