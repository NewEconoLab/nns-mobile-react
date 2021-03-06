import common from "@/store/common";
import * as Api from "@/store/api/common.api";
import { Utxo } from "@/store/interface/coin.interface";
import { MarkUtxo } from "@/session/oldutxo";

export class CoinTool{

    /**
     * 获得可用的utxo
     * @returns { [ id: string ]: Utxo[] }
     */
    public static async getAssets():Promise<{ [ id: string ]: Utxo[] }>
    {
        try 
        {
            const utxos = await Api.getUtxo(common.address);   // 获得为使用的utxo
            if(!utxos)
            {
                return {};
            }
            const marks = MarkUtxo.getMark();   // 获得被标记的utxo
            console.log("=================get mark=============");
            
            console.log(marks);
            
            const assets = {};        
            // 对utxo进行归类，并且将count由string转换成 Neo.Fixed8
            // tslint:disable-next-line:forin        
            for (const i in utxos)
            {
                const item = utxos[ i ];
                const mark = marks[item["txid"]]
                if(!mark || !mark.includes(item.n))   // 排除已经标记的utxo返回给调用放
                {
                    const asset = item.asset;
                    if (assets[ asset ] === undefined || assets[ asset ] == null)
                    {
                        assets[ asset ] = [];
                    }
                    const utxo = new Utxo();
                    utxo.addr = item.addr;
                    utxo.asset = item.asset;
                    utxo.n = item.n;
                    utxo.txid = item.txid;
                    utxo.count = Neo.Fixed8.parse(item.value);
                    assets[ asset ].push(utxo);
                }
            }
            return assets;
        } 
        catch (error) 
        {
            if(error["code"]==="-1")
            {
                return {};
            }else
            {
                throw error; 
            }            
        }
    }


    public static makeTran():ThinNeo.Transaction
    {   
        const tran = new ThinNeo.Transaction();
        tran.type = ThinNeo.TransactionType.ContractTransaction;
        tran.version = 0;// 0 or 1
        tran.extdata = null;
        tran.attributes = [];
        return tran;
    }

    /**
     * 构造并发送交易
     * @param {ThinNeo.Transaction} tran 
     * @param {string} randomStr
     */
    public static signData(msg: Uint8Array)
    {
        try
        {
            const WIF = "KyKtTeuYN41h3z6T3rzrqGYZXturhsDAazjvUFzntjuXpCTzrhNc";
            const prekey = ThinNeo.Helper.GetPrivateKeyFromWIF(WIF);
            const pubkey = ThinNeo.Helper.GetPublicKeyFromPrivateKey(prekey)
            const addr = ThinNeo.Helper.GetAddressFromPublicKey(pubkey);
            common.address = addr;
            const signdata = ThinNeo.Helper.Sign(msg, prekey);
            return signdata;
        } catch (error)
        {
            throw new Error("Signature interrupt");
        }

    }

    

}