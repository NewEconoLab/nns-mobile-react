import { observable, action } from "mobx";
import { ICoinStore } from "./interface/coin.interface";
import {Utxo} from "./interface/coin.interface";
import * as Api from "./api/common.api";
import common from "./common";

class Coin implements ICoinStore{
    @observable public assets: { [ id: string ]: Utxo[] }={};
    @action public async initUtxos () {
        try {
            const utxos = await Api.getUtxo(common.address);
            const assets = {};        // 对utxo进行归类，并且将count由string转换成 Neo.Fixed8
            // tslint:disable-next-line:forin        
            for (const i in utxos)
            {
                const item = utxos[ i ];
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
            this.assets = assets;
            return true;
        } catch (error) {
            return false;   
        }
    }

    // tslint:disable-next-line:no-empty
    public setOldUtxo(){
        
    }
}
export default new Coin;