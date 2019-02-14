import request from 'utils/request';
import DomainSelling from '@/store/DomainSelling';
/**
 * 获取域名列表
 * @param address 当前地址
 * @param type 出售状态
 * @param currentPage 当前页
 * @param pageSize 每页显示条数
 * @param search 搜索字段
 */
export const getdomainbyaddress = (address:string,type:string,currentPage:number,pageSize:number,search:string)=>{
  const opts = {
    method:"getdomainbyaddress",
    params:[
      address,
      "."+DomainSelling.RootNeo.root,
      type,
      currentPage,
      pageSize,
      search
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
/**
 * 查询域名映射地址
 * @param domain 域名
 */
export const getresolvedaddress = (domain:string)=>{
  const opts = {
    method:"getresolvedaddress",
    params:[
      domain
    ]
  }
  return request(opts);
}