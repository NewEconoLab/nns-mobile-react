import Axios from 'axios';

interface IOpts {
  method:string, // 接口名
  params: any[], // 参数
  isGET?:boolean, // 是否是get 请求（默认请求是post）
  baseUrl?:string, // 如果是common 则 取 baseCommonUrl（默认 baseUrl）
  getAll?:boolean, // 是否获取所有返回结果
}

const baseCommonUrl: string = "https://api.nel.group/api/testnet";
const baseUrl: string = "https://apiwallet.nel.group/api/testnet";

const makeRpcPostBody = (method: string, params: any): {} => {
    
  const body = {};
  body["jsonrpc"] = "2.0";
  body["id"] = 1;
  body["method"] = method;
  body["params"] = params;
  return body;
}
const defaultConfig = {
  headers:{
    'Content-Type':'application/json'
  }
}
export default function request(opts: IOpts): Promise<any> {
  let url = baseUrl;
  if (opts.baseUrl === 'common') {
    url = baseCommonUrl;
  }
  
  const args = {
    url,
    method:opts.isGET? 'GET' : 'POST',
    data: JSON.stringify(makeRpcPostBody(opts.method, opts.params)),
    ...defaultConfig,
  }
  return new Promise((resolve, reject) => {
    Axios(args)
      .then((data: any) => {
        if(data.data.result) {
          if(opts.getAll) {
            resolve(data.data);
            return;
          }
          resolve(data.data.result);
          return;
        }

        reject(data.data.error);
      })
      .catch((err: any) => { reject(err) });
  });
}
