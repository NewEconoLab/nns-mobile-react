import request from 'utils/request';

/**
 * 获取竞拍状态
 */
export const getauctionstate =  (args:string) => {
  const opts = {
   method:'getauctionstate',
   params:[
    args
   ],
  }
  return request(opts);
}