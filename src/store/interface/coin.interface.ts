export interface ICoinStore{
    assets:{ [ id: string ]: Utxo[] };
    initUtxos: ()=>Promise<boolean>;
}

export class Utxo{
    public addr: string;
    public txid: string;
    public n: number;
    public asset: string;
    public count: Neo.Fixed8;
}