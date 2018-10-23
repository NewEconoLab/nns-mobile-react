import request from 'utils/request';

export const getauctioninfobyaddress = (address:string,pageIndex:number, pageSize:number,root?:string) => {
    const opts = {
      method:'getauctioninfobyaddress',
      params:[
        address,
        pageIndex,
        pageSize,
        "."+root?root:"neo"
      ],
     }
     return request(opts);
  }

  export const getAuctionInfoByAucitonid = (address:string,ids:string[],root:string) => {    
    const opts = {
    method:'getauctioninfobyaucitonid',
    params:[
      address,
      ids,
      root
    ],
   }
   return request(opts);
  }