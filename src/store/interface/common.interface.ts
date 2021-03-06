export interface ICommonStore {
  title: string,
  language: string,
  address: string,
  publicKey:string,
  network: string,
  netfee:Neo.Fixed8,
  accountBalance: string,
  cgasBalance: string,
  getnep5balanceofaddress: () => boolean,
  getregisteraddressbalance: () => boolean,
  sendrawtransaction:(toHex:string) => boolean,
  initWalletConfig:()=>void;
}
 export interface INep5Info {
   assetid:string,
   totalsupply:string,
   name:string,
   symbol:string,
   decimals:number
 }