import { observable, action } from 'mobx';
import * as Api from '@/store/api/common.api';
import { DomainInfo, IDomainSelling } from './interface/domain.interface';
class DomainSelling implements IDomainSelling {
    @observable
    public RootNeo: DomainInfo = new DomainInfo();
    @action
    public async initRoot() {
        try {            
            const res = await Api.getDomainInfo("neo");
        if (res) {
            this.RootNeo.owner = res[0].owner;
            this.RootNeo.register = Neo.Uint160.parse((res[0].register as string).replace("0x",""));
            this.RootNeo.resolver = res.resolver ? Neo.Uint160.parse(res[0].resolver) : null;
        }
        } catch (error) {
            throw error;
        }
        return true;
    }
}
// 外部使用require
export default new DomainSelling();