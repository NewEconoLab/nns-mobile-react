import request from 'utils/request';

export const getdomainbyaddress = ()=>{
  const opts = {
    method:"getdomainbyaddress",
    params:[
      "ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi",
      ".neo"
    ]
  }
  return request(opts);
}