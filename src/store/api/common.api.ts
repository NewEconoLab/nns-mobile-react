import request from 'utils/request';
import {HASH_CONFIG} from 'config';
/**
 * 获取nep5的资产（CGAS）
 */
export const getnep5balanceofaddress =  (address:string) => {
  const opts = {
   method:'getnep5balanceofaddress',
   params:[
    HASH_CONFIG.cgasHash,
    address
   ],
   baseUrl:'common'
  }
  return request(opts);
}

/**
 * 获取账户中的cgas
 */
export const getregisteraddressbalance =  (address:string) => {
  const opts = {
   method:'getregisteraddressbalance',
   params:[    
    address,
    HASH_CONFIG.cgasHash
   ]
  }
  return request(opts);
}

// 发送交易
export const sendrawtransaction =  (toHex:string) => {
  const opts = {
   method:'sendrawtransaction',
   params:[
    toHex
   ],
   baseUrl:'common',
   getAll:true
  }
  return request(opts);
}