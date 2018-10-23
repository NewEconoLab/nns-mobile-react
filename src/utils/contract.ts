import { CoinTool } from "./cointools";
import { HASH_CONFIG, WALLET_CONFIG } from "@/config";
import { Transaction } from "./transaction";
// import o3tools from './o3tools'
import common from '@/store/common'
// import alert from "@/components/alert";

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
  public static async buildInvokeTrans_attributes(script: Uint8Array) {
    const utxos = await CoinTool.getAssets()
    const gass = utxos[HASH_CONFIG.id_GAS];
    const tran: Transaction = new Transaction()
    tran.setScript(script)
    if (gass) {
      tran.creatInuptAndOutup(gass, WALLET_CONFIG.netfee)
    }
    const msg = tran.GetMessage().clone();
    const WIF = "KyKtTeuYN41h3z6T3rzrqGYZXturhsDAazjvUFzntjuXpCTzrhNc";
    const prekey = ThinNeo.Helper.GetPrivateKeyFromWIF(WIF);
    const pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prekey)
    const addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    const signdata = ThinNeo.Helper.Sign(msg, prekey);
    tran.AddWitness(signdata, pubkey, addr);
    const data: Uint8Array = tran.GetRawData();
    return data;
    // const promise:Promise<Uint8Array> = new Promise((resolve, reject) =>{
    //   o3tools.sign(msg.toHexString(),res =>{        
    //     tran.AddWitness((res as string).hexToBytes(),common.publicKey.hexToBytes(), common.address);
    //     try {
    //       const data: Uint8Array = tran.GetRawData();   
    //       resolve(data);
    //     } catch (error) {
    //       reject(error);
    //     }        
    //   })
    // })
    // return promise;
  }
    
  /**
   * invokeTrans 方式调用合约塞入attributes
   * @param script 合约的script
   */
  public static async contractInvokeTrans_attributes(script: Uint8Array) {
    const utxos = await CoinTool.getAssets()
    const gass = utxos[HASH_CONFIG.id_GAS];
    const tran: Transaction = new Transaction()
    tran.setScript(script)
    if (gass) {
      tran.creatInuptAndOutup(gass, WALLET_CONFIG.netfee)
    }
    
    const WIF = "KyKtTeuYN41h3z6T3rzrqGYZXturhsDAazjvUFzntjuXpCTzrhNc";
    const prekey = ThinNeo.Helper.GetPrivateKeyFromWIF(WIF);
    const pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prekey)
    const addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
    const signdata = ThinNeo.Helper.Sign(tran.GetMessage().clone(), prekey);
    tran.AddWitness(signdata, pubkey, addr);
    const data: Uint8Array = tran.GetRawData();
    const res = await common.sendrawtransaction(data.toHexString())
    return res;
    // const msg = tran.GetMessage().clone();
    // const promise = new Promise((resolve, reject) =>{      
      
      // o3tools.sign(msg.toHexString(),res =>{        
      //   tran.AddWitness((res as string).hexToBytes(),common.publicKey.hexToBytes(), common.address);
      //   const data: Uint8Array = tran.GetRawData();   
      //   common.sendrawtransaction(data.toHexString())
      //   .then(value=>{
      //     alert("tranHex",JSON.stringify(data.toHexString()),"确定",()=>{
      //       return true;
      //     })
      //     resolve(value)
      //   })
      //   .catch(error=>{
      //     reject(error)
      //   })
      // })
    // })
    // return promise;
  }
}