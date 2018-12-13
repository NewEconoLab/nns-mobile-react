import request from 'utils/request';

/**
 * 获取竞拍状态
 */
export const getdomainauctioninfo =  (args:string) => {
  const opts = {
   method:'getdomainauctioninfo',
   params:[
    args
   ],
  }
  return request(opts);
}

export const getdomainstate =  (args:string) => {
  const opts = {
   method:'getdomainstate',
   params:[
    args
   ],
  }
  return request(opts);
}

export const getSaleDomainInfo =  (args:string) => {
  const opts = {
   method:'getNNSfixedSellingInfo',
   params:[
    args
   ],
  }
  return request(opts);
}
export const getnep5balanceofaddress =  (asset: string, address: string) => {
  const opts = {
   method:'getnep5balanceofaddress',
   params:[
    asset,
    address
   ],
  }
  return request(opts);
}