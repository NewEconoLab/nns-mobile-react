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
                    <h3>竞拍账户</h3>
                    <p>注意：出售域名所获得的NNC会显示在这里，您可以点击提取按钮，将其提取至你的钱包余额。</p>
                </div>
                <div className="mynnc-content">
                    <div className="mynnc-text">
                        <strong>未提取的NNC</strong>
                        <strong className="mynnc-number">{this.props.manager.myNNCBalance}</strong>
                    </div>
                    <div className="mynnc-btn">
                        <Button 
                            type={mynnc !== 0 ? 'primary':'ghost'} 
                            inline={true} 
                            size="small" 
                            disabled={mynnc === 0}
                            onClick={this.toGetNNC}
                        >提取</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default injectIntl(ClaimNNC);