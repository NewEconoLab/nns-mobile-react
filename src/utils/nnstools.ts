import common from "@/store/common";
import * as commonAPI from "@/store/api/common.api";
import { Contract } from "./contract";
import DomainSelling from "@/store/DomainSelling";
import { HASH_CONFIG } from "@/config";
import { CoinTool } from "@/utils/cointools";
import { Transaction } from "@/utils/transaction";
import o3tools from "@/utils/o3tools";

export class nnstools
{


    /**
     * 域名转hash    
     * #region 域名转hash算法
     * 域名转hash算法
     * aaa.bb.test =>{"test","bb","aa"}
     * @param domain 域名
     */
    public static nameHash(domain: string): Neo.Uint256
    {
        const domainBytes: Uint8Array = ThinNeo.Helper.String2Bytes(domain);
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
        let hash: Neo.Uint256 = this.nameHash(domainarray[0]);
        for (let i = 1; i < domainarray.length; i++)
        {
            hash = this.nameHashSub(hash, domainarray[i]);
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
        const count = Neo.Fixed8.parse(amount).getData().toNumber();
        const sb = Contract.buildScript_random(
            HASH_CONFIG.ID_CGAS,
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
        try
        {
            console.log("------------script");

            console.log(script.toHexString());

            const res = await Contract.contractInvokeTrans_attributes(script);
            if (res)
            {
                return res;
            }
            else
            {
                throw new Error("交易发送异常");
            }
        } catch (error)
        {
            // alert(JSON.stringify(error));
            throw new Error(error);
        }
    }

    /**
     * 取回存储器下的cgas
     */
    public static async getMoneyBack(amount: number, register: Neo.Uint160)
    {
        const transcount = Neo.Fixed8.fromNumber(amount).getData().toNumber();
        const data = Contract.buildScript_random(
            register,
            "getmoneyback",
            ["(addr)" + common.address, "(int)" + transcount]
        )
        const res = await Contract.contractInvokeTrans_attributes(data.ToArray())
        return res;
    }


    /**
     * 域名开标
     */
    public static async startAuciton(register: Neo.Uint160, roothash: Neo.Uint160, subname: string)
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
            ["(hex160)" + who.toString(), "(hex256)" + id, "(int)" + count]
        );
        const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
        return res;
    }


    /**
     * 结束竞拍 
     * @param domain 域名
     */
    public static async bidSettlement(id: string, register: Neo.Uint160)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const script = Contract.buildScript_random(
            register,
            "bidSettlement",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        const res = await Contract.buildInvokeTrans_attributes(script.ToArray());
        return res;
    }

    /**
     * 获得领取域名
     * @param domain 域名
     */
    public static async collectDomain(id: string, register: Neo.Uint160): Promise<Uint8Array>
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const script = Contract.buildScript_random(
            register,
            "collectDomain",
            [
                "(hex160)" + who.toString(),
                "(hex256)" + id
            ]
        );
        const res = await Contract.buildInvokeTrans_attributes(script.ToArray());
        return res;
    }

    /**
     * 生成解析器
     * @param protocol 
     * @param nnshash 
     * @param scriptaddress 
     */
    public static async setResolve(domain: string, resolver: string)
    {
        const hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address);
        const hashstr = hash.reverse().toHexString();
        const arr = domain.split(".");
        const nnshash: Neo.Uint256 = this.nameHashArray(arr);
        /**
         * 构造 owner_SetResolver script
         * 
         */
        const sb = Contract.buildScript_random(
            HASH_CONFIG.baseContract,
            "owner_SetResolver",
            [
                "(hex160)" + hashstr,
                "(hex256)" + nnshash.toString(),
                "(hex160)" + resolver
            ]
        );
        const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
        return res;
    }

    /**
     * 设置解析器映射地址
     * @param domain 域名
     * @param str 映射内容
     * @param resolve 解析器
     */
    public static async setResolveData(domain: string, str: string, resolve: string)
    {
        const hash = ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address)
        const hashstr = hash.reverse().toHexString();
        const arr = domain.split(".");
        const nnshash: Neo.Uint256 = this.nameHashArray(arr);
        const scriptaddress = resolve.hexToBytes();

        const sb = Contract.buildScript_random(
            scriptaddress.reverse(),
            "setResolverData",
            [
                "(hex160)" + hashstr,
                "(hex256)" + nnshash.toString(),
                "(str)",
                "(str)addr",
                "(str)" + str
            ]
        );
        const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
        return res;
    }


    public static async renewDomain(domain: string, register: Neo.Uint160)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const domainarr = domain.split(".").reverse();
        const str = domainarr[1];
        const roothash = this.nameHash(domainarr[0]);
        const sb = Contract.buildScript(
            register,
            "renewDomain", [
                "(hex160)" + who.toString(),
                "(hex256)" + roothash.toString(),
                "(str)" + str
            ]);
        try
        {
            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;

        }
    }

    /**
     * 域名转让
     * @param domain 
     * @param newOwner 
     */
    public static async setOwner(domain: string, newOwner: string)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const toWho = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(newOwner).buffer as ArrayBuffer);
        const nnshash: Neo.Uint256 = nnstools.nameHashArray(domain.split("."));
        const scriptaddress = HASH_CONFIG.baseContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "owner_SetOwner",
                [
                    "(hex160)" + who,
                    "(hex256)" + nnshash.toString(),
                    "(hex160)" + toWho
                ]
            );
            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;
        }
    }
    /**
     * 获取收益的nnc
     */
    public static async getAllMyNNC()
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const scriptaddress = HASH_CONFIG.saleContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "getMoneyBackAll",
                [
                    "(hex160)" + who,
                ]
            );
            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;
        }
    }
    /**
     * 域名出售
     * @param domain 
     * @param newOwner 
     */
    public static async saleDomain(domain: string, price: string)
    {
        const result = await commonAPI.getnep5asset(HASH_CONFIG.ID_NNC.toString());
        if (!result)
        {
            return;
        }
        const arr = domain.split(".").reverse();
        arr[0] = "(str)" + arr[0]
        arr[1] = "(str)" + arr[1]
        const scriptaddress = HASH_CONFIG.saleContract;
        const count = parseFloat(price).toFixed(result[0].decimals).replace(".", "");
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "launch",
                [
                    arr,
                    "(int)" + count
                ]
            );
            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;
        }
    }
    /**
     * 购买金额处理
     * @param amount 金额
     */
    public static async registerNNC(amount)
    {
        const result = await commonAPI.getnep5asset(HASH_CONFIG.ID_NNC.toString());
        if (!result)
        {
            return false;
        }
        const register = HASH_CONFIG.saleContract;
        const value = parseFloat(amount).toFixed(result[0].decimals).replace(".", "");
        const addressto = ThinNeo.Helper.GetAddressFromScriptHash(register);
        const sb = Contract.buildScript_random(
            HASH_CONFIG.ID_NNC,
            "transfer",
            [
                "(addr)" + common.address,// from
                "(addr)" + addressto,// to
                "(int)" + value// value
            ]);
        //// 这个方法是为了在同一笔交易中转账并充值
        //// 当然你也可以分为两笔交易
        //// 插入下述两条语句，能得到txid
        sb.EmitSysCall("System.ExecutionEngine.GetScriptContainer");
        sb.EmitSysCall("Neo.Transaction.GetHash");
        // 把TXID包进Array里
        sb.EmitPushNumber(Neo.BigInteger.fromString("1"));
        sb.Emit(ThinNeo.OpCode.PACK);
        sb.EmitPushString("setMoneyIn");
        sb.EmitAppCall(register);
        const script = sb.ToArray();
        try
        {
            const res = await Contract.buildInvokeTrans_attributes(script);
            if (res)
            {
                return res;
            }
            else
            {
                throw new Error("交易发送异常");
            }
        } catch (error)
        {
            // alert(JSON.stringify(error));
            throw error;
        }
    }
    /**
     * 购买域名
     * @param domain 域名
     * @param address 购买者
     */
    public static async buyDomain(domain: string)
    {
        const who = new Neo.Uint160(ThinNeo.Helper.GetPublicKeyScriptHash_FromAddress(common.address).buffer as ArrayBuffer);
        const domainHash = nnstools.nameHashArray(domain.split("."));
        const scriptaddress = HASH_CONFIG.saleContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "buy",
                [
                    "(hex160)" + who,
                    "(hex256)" + domainHash.toString()
                ]
            );
            const res = await Contract.buildInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;
        }
    }
    /**
     * 下架域名
     * @param domain 域名
     */
    public static async unSaleDomain(domain: string)
    {
        const domainHash = nnstools.nameHashArray(domain.split("."));
        const scriptaddress = HASH_CONFIG.saleContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "discontinue",
                [
                    "(hex256)" + domainHash.toString()
                ]
            );

            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw error;
        }
    }
    /**
     * 绑定域名地址
     * @param doamin 域名字符串
     * @param address 当前地址
     */
    public static async bindDomain(domain: string, address: string)
    {
        let arr = domain.split(".").reverse();
        arr = arr.map(str => `(str)${str}`);
        const scriptaddress = HASH_CONFIG.bindContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "authenticate",
                [
                    `(addr)${address}`,
                    arr
                ]
            );

            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw new Error(error)
        }
    }
    /**
     * 解除绑定域名地址
     * @param address 当前地址
     */
    public static async cancalBindDomain(address: string)
    {
        const scriptaddress = HASH_CONFIG.bindContract;
        try
        {
            const sb = Contract.buildScript_random(
                scriptaddress,
                "revoke",
                [
                    `(addr)${address}`
                ]
            );

            const res = await Contract.contractInvokeTrans_attributes(sb.ToArray());
            return res;
        } catch (error)
        {
            throw new Error(error)
        }
    }
    /**
     * Gas兑换CGas
     * @param count 兑换数量
     */
    public async exchangeCGas(count: number)
    {
        // 获得登陆信息
        const script = Contract.buildScript(HASH_CONFIG.ID_CGAS, "mintTokens", []);
        // 获得sgas的合约地址
        const cgasaddr = ThinNeo.Helper.GetAddressFromScriptHash(HASH_CONFIG.ID_CGAS);
        try
        {
            const utxos = await CoinTool.getAssets();
            const tran = new Transaction(); // 创建交易体
            tran.creatInuptAndOutup(utxos[HASH_CONFIG.ID_GAS], Neo.Fixed8.fromNumber(count), cgasaddr); // 给交易体塞入输入输出 (这个我没给你弄手续费)
            if (tran.inputs.length + tran.outputs.length > 60)
            {
                throw new Error("Don't have enough change")
            }
            else
            {
                const promise = new Promise((resolve, reject) =>
                {
                    // Parameter inversion 
                    tran.setScript(script.ToArray());   // 塞入执行合约用的脚本 hash
                    const msg = tran.GetMessage().clone();
                    o3tools.sign(msg.toHexString(), res =>
                    {
                        tran.AddWitness((res as string).hexToBytes(), common.publicKey.hexToBytes(), common.address);
                        const data: Uint8Array = tran.GetRawData();
                        common.sendrawtransaction(data.toHexString())
                            .then(value =>
                            {
                                if (!value)
                                {
                                    reject("Transaction send failed");
                                }
                                resolve(value)
                            })
                            .catch(error =>
                            {
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