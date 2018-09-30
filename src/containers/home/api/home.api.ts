import request from 'utils/request';

/**
 * 获取nep5的资产（CGAS）
 */
export const getnep5balanceofaddress =  (address:string) => {
  const opts = {
   method:'getnep5balanceofaddress',
   params:[
    '0x74f2dc36a68fdc4682034178eb2220729231db76',
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
    '0xfe041f87b1a4cc0efb827664d6f20a0e990d0969'
   ]
  }
  return request(opts);
}