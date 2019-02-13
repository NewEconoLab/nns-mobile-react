import request from 'utils/request';

/**
 * 获得竞拍列表的数据
 * @param address 地址
 * @param currentpage 当前页码
 * @param pagesize 页面条数
 * @param root 根节点
 * @param searchStr 搜索字段
 */
export const getauctioninfobyaddress = (address: string, currentpage: number, pagesize: number, root: string, searchStr: string) =>
{
  const opts = {
    method: 'getauctioninfobyaddress',
    params: [
      address,
      currentpage,
      pagesize,
      root,
      searchStr
    ],
  }
  return request(opts);
}

export const getAuctionInfoByAucitonid = (address: string, ids: string[], root: string) =>
{
  const opts = {
    method: 'getauctioninfobyaucitonid',
    params: [
      address,
      ids,
      root
    ],
  }
  return request(opts);
}

export const getAuctionInfoCount = (address: string, root: string) =>
{
  const opts = {
    method: 'getauctioninfocount',
    params: [
      address,
      root
    ]
  }
  return request(opts);
}