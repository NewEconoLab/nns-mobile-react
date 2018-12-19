export class DomainInfo
{    
    public owner: string// 所有者
    public register: Neo.Uint160// 注册器
    public resolver: Neo.Uint160 | null // 解析器
    public ttl: string// 到期时间
    public root:string;// 根域名
    public parentOwner:string;// 父域名所有者

    constructor()
    {
        this.owner = "";
        this.register = Neo.Uint160.Zero;
        this.ttl = "";
        this.root = "";
        this.parentOwner="";
    }
}

export interface IDomainSelling
{
    day:number,
    RootNeo:DomainInfo,
    initRoot:()=>Promise<boolean>
}