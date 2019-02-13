import request from 'utils/request';

/**
 * 获得竞拍列表的数据
 * @param address 地址
 * @param currentpage 当前页码
 * @param pagesize 页面条数
 * @param root 根节点
 * @param searchStr 搜索字段
 * @param people 出价者
 * @param status 域名状态
 */
export const getauctioninfobyaddress = (address: string, currentpage: number, pagesize: number, root: string, searchStr: string,people:string,status:string) =>
{
  const opts = {
    method: 'getauctioninfobyaddress',
    params: [
      address,
      currentpage,
      pagesize,
      '.'+root,
      searchStr,
      people,
      status
    ],
  }
  return request(opts);
}