import common from "@/store/common";
import { Contract } from "./contract";
import DomainSelling from "@/store/DomainSelling";

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
}