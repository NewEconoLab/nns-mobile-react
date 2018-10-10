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