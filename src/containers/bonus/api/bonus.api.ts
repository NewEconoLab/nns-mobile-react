import request from 'utils/request';
/**
 * 获取分红列表 
 */
export const getBonusListByAddress =  (address:string,currentPage:number,pageSize:number) => {
  const opts = {
   method:'getbonushistbyaddress',
   params:[
    address,
    currentPage,
    pageSize
   ]
  }

  return request(opts);
}
/**
 * 获取我的分红详情
 * @param address 当前地址
 */
export const getcurrentbonus =  (address:string) => {
  const opts = {
   method:'getcurrentbonus',
   params:[
    address
   ]
  }

  return request(opts);
}
/**
 * 申请领取分红
 * @param address 当前地址
 */
export const applybonus =  (address:string) => {
  const opts = {
   method:'applybonus',
   params:[
    address
   ]
  }

  return request(opts);
}
/**
 * 获取分红记录列表
 * @param address 当前地址
 * @param page 当前页面
 * @param pagesize 每页条数
 */
export const getbonusbyaddress =  (address: string, page: number, pagesize: number) => {
  const opts = {
   method:'getbonusbyaddress',
   params:[
    address,
    page,
    pagesize
   ]
  }

  return request(opts);
}