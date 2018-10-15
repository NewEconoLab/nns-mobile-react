import { CoinTool } from "./cointools";
import { HASH_CONFIG, WALLET_CONFIG } from "@/config";
import { Transaction } from "./transaction";
import { O3Tool } from "./o3tools";

export class Contract
{

    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    public static buildScript(appCall: Neo.Uint160, method: string, param: string[]): ThinNeo.ScriptBuilder
    {
        const sb = new ThinNeo.ScriptBuilder();
        sb.EmitParamJson(param); // 第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb;
    }

    /**
     * @method buildScript 构建script
     * @param appCall 合约地址
     * @param method 方法名
     * @param param 参数
     */
    public static buildScript_random(appCall: Neo.Uint160, method: string, param: string[]): ThinNeo.ScriptBuilder
    {
        const sb = new ThinNeo.ScriptBuilder();
        // 生成随机数
        const RANDOM_UINT8:Uint8Array = Neo.Cryptography.RandomNumberGenerator.getRandomValues<Uint8Array>(new Uint8Array(32));
        const RANDOM_INT:Neo.BigInteger = Neo.BigInteger.fromUint8Array(RANDOM_UINT8);
        // 塞入随机数
        sb.EmitPushNumber(RANDOM_INT);
        sb.Emit(ThinNeo.OpCode.DROP);
        sb.EmitParamJson(param);// 第二个参数是个数组
        sb.EmitPushString(method);
        sb.EmitAppCall(appCall);
        return sb;
    }
    
    /**
     * invokeTrans 方式调用合约塞入attributes
     * @param script 合约的script
     */
    public static async contractInvokeTrans_attributes(script: Uint8Array)
    {
        const tran:Transaction = new Transaction();
        try {
            const utxos = await CoinTool.getAssets();
            const gass = utxos[ HASH_CONFIG.id_GAS ];
            tran.setScript(script);
            if(gass)
            {
                tran.creatInuptAndOutup(gass,WALLET_CONFIG.netfee);
            }
            O3Tool.sign(data =>{alert(data)})
        } catch (error) {
            // alert(JSON.stringify(error))
        }
    }
}