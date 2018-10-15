

export interface ICommonStore {
  title: string,
  language: string,
  address: string,
  publicKey:string,
  network: string,
  accountBalance: string,
  cgasBalance: string,
  getnep5balanceofaddress: () => boolean,
  getregisteraddressbalance: () => boolean,
  sendrawtransaction:(toHex:string) => boolean
}