import request from 'utils/request';

export const getdomainbyaddress = (address:string)=>{
  const opts = {
    method:"getdomainbyaddress",
    params:[
      address,
      ".test"
    ]
  }
  return request(opts);
}