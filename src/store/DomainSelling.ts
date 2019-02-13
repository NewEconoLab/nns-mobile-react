import { observable, action } from 'mobx';
import * as Api from '@/store/api/common.api';
import { DomainInfo, IDomainSelling } from './interface/domain.interface';
import common from './common';
class DomainSelling implements IDomainSelling
{
    @observable public RootNeo: DomainInfo = new DomainInfo();
    @observable public day: number = 0;
    @action
    public async initRoot()
    {
        try
        {
            this.RootNeo.root = "testnet" === common.network ? 'test' : 'neo';
            this.day = (this.RootNeo.root === "test" ? 5 * 60 * 1000 : 24 * 60 * 60 * 1000);
            const res = await Api.getDomainInfo(this.RootNeo.root);
            if (res)
            {
                this.RootNeo.owner = res[0].owner;
                this.RootNeo.register = Neo.Uint160.parse((res[0].register as string).replace("0x", ""));
                this.RootNeo.resolver = res.resolver ? Neo.Uint160.parse(res[0].resolver) : null;
            }
        } catch (error)
        {
            throw error;
        }
        return true;
    }
}
// 外部使用require
export default new DomainSelling();