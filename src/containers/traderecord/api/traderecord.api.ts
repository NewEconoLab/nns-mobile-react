import request from 'utils/request';
/**
 * 根据地址查询已出售已成交列表
 * @param address 当前地址
 * @param type 域名类型“neo or test”
 * @param showtype 显示类型“sale or buy”
 * @param page 当前页码
 * @param pagesize 每页条数
 */
export const getsaleorbuylist = (address: string, type: string, showtype: string, page: number, pagesize: number) => {
  const opts = {
    method:'getDomainSellingListByAddress',
    params:[
      address,
      type,
      showtype,
      page,
      pagesize
    ],
   }
   return request(opts);
}