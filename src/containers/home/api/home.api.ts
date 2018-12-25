import request from 'utils/request';

/**
 * 获取竞拍状态
 */
export const getdomainauctioninfo = (args: string) =>
{
  const opts = {
    method: 'getdomainauctioninfo',
    params: [
      args
    ],
  }
  return request(opts);
}

export const getdomainstate = (args: string) =>
{
  const opts = {
    method: 'getdomainstate',
    params: [
      args
    ],
  }
  return request(opts);
}

export const getSaleDomainInfo = (args: string) =>
{
  const opts = {
    method: 'getNNSfixedSellingInfo',
    params: [
      args
    ],
  }
  return request(opts);
}
export const getnep5balanceofaddress = (asset: string, address: string) =>
{
  const opts = {
    method: 'getnep5balanceofaddress',
    params: [
      asset,
      address
    ],
    baseUrl: 'common'
  }
  return request(opts);
}
/**
 * 两笔交易提交给服务器发送
 * @param data1 第一笔交易数据
 * @param data2 第二笔交易数据
 */
export const rechargeandtransfer = (data1: Uint8Array, data2: Uint8Array) =>
{
  const opts = {
    method: 'rechargeandtransfer',
    params: [
      data1.toHexString(),
      data2.toHexString()
    ],
    baseUrl: 'common'
  }
  return request(opts);
}