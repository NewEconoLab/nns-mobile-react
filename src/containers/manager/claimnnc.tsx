import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd-mobile';
import { IManagerProps } from './interface/index.interface';
import { nnstools } from '@/utils/nnstools';
@inject('manager', 'common')
@observer
class ClaimNNC extends React.Component<IManagerProps, any>
{
    public prop = this.props.intl.messages;
    public componentDidMount(){
        this.props.manager.getNNCfromSellingHash(this.props.common.address)
    }
    public toGetNNC = async () => {
        const res = await nnstools.getAllMyNNC();
        console.log(res);
        
    }
    public render()
    {
        const mynnc = parseFloat(this.props.manager.myNNCBalance);
        return (
            <div className="manager-mynnc">
                <div className="hastips-title">
                    <h3>{this.prop.manager.myIncome}</h3>
                    <p>{this.prop.manager.note}</p>
                </div>
                <div className="mynnc-content">
                    <div className="mynnc-text">
                        <strong>{this.prop.manager.unclaimed}</strong>
                        <strong className="mynnc-number">{mynnc === 0 ? '0':this.props.manager.myNNCBalance}</strong>
                    </div>
                    <div className="mynnc-btn">
                        <Button 
                            type={mynnc !== 0 ? 'primary':'ghost'} 
                            inline={true} 
                            size="small" 
                            disabled={mynnc === 0}
                            onClick={this.toGetNNC}
                        >{this.prop.btn.claim}</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(ClaimNNC);