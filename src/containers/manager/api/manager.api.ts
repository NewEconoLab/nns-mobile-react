import request from 'utils/request';
import DomainSelling from '@/store/DomainSelling';

export const getdomainbyaddress = (address:string)=>{
  const opts = {
    method:"getdomainbyaddress",
    params:[
      address,
      "."+DomainSelling.RootNeo.root
    ]
  }
  return request(opts);
}
/**
 * 出售域名获取NNC的收益
 * @param address 当前地址
 */
export const getNNCfromSellingHash = (address:string)=>{
  const opts = {
    method:"getNNCfromSellingHash",
    params:[
      address
    ]
  }
  return request(opts);
}