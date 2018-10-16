import request from 'utils/request';
import {HASH_CONFIG} from 'config';
/**
 * 获取nep5的资产（CGAS）
 */
export const getnep5balanceofaddress =  (address:string) => {
  const opts = {
   method:'getnep5balanceofaddress',
   params:[
    HASH_CONFIG.id_CGAS.toString(),
    address
   ],
   baseUrl:'common'
  }
  return request(opts);
}

/**
 * 
 * @param address 
 */
export const getregisteraddressbalance =  (address:string) => {
  const opts = {
   method:'getregisteraddressbalance',
   params:[    
    address,
    HASH_CONFIG.accountCGAS.toString()
   ]
  }
  return request(opts);
}

/**
 * 发送交易
 * @param data 交易数据
 */
export const sendrawtransaction =  (data:string) => {
  const opts = {
   method:'sendrawtransaction',
   params:[
    data
   ],
   baseUrl:'common'
  }
  return request(opts);
}

/**
 * 获得指定地址对应的utxo
 * @param address 地址
 */
export const getUtxo=(address:string)=>{
  const opts={
    method:"getutxo",
    params:[
      address
    ],
    baseUrl:'common'
  }
  return request(opts);
}


/**
 * 获得指定地址对应的utxo
 * @param address 地址
 */
export const getDomainInfo=(domain:string)=>{
  const opts={
    method:"getdomaininfo",
    params:[
      domain
    ]
  }
  return request(opts);
}