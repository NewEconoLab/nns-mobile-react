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