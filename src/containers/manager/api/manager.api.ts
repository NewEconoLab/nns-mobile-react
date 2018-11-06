import request from 'utils/request';
import DomainSelling from '@/store/DomainSelling';

export const getdomainbyaddress = (address:string)=>{
  const opts = {
    method:"getdomainbyaddress",
    params:[
      address,
      "."+DomainSelling.RootNeo.root
    ]
  }
  return request(opts);
}