import request from 'utils/request';
/**
 * 获取可绑定的域名列表 
 */
export const getBindDomainList = (address: string, currentPage: number, pageSize: number, str?: string) =>
{
    const opts = {
        method: 'getDomainListByAddress',
        params: [
            address,
            currentPage,
            pageSize,
            str?str:''
        ]
    }

    return request(opts);
}

/**
 * 获取绑定的域名
 * @param address 当前地址
 */
export const getBindDomainname = (address: string) =>
{
    const opts = {
        method: 'getMappingDomain',
        params: [
            address
        ],
        baseUrl: 'scan'
    }

    return request(opts);
}