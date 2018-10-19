/**
 * 我的竞拍域名详情页
 */
import * as React from 'react';
import {injectIntl} from 'react-intl';
import {inject, observer} from 'mobx-react';
import Detail from './detail'
import TimeList from './timelist'
// import Addbid from './addbid'
import { Button } from 'antd-mobile';
import {IAuctionDetailProps} from '../interface/index.interface';
import '../index.less'

@inject('myauction', 'common')
@observer
class DomainDetail extends React.Component<IAuctionDetailProps>
{
    public prop = this.props.intl.messages;
    

    public componentDidMount() {
        if(!this.props.myauction.detail) {
            this.props.history.goBack();
        }
    }
    public onShowDialog = () => {
        this.props.myauction.showDialog = true;
    }
    public render()
    {
        // todo 时间轴还没写，出价还没写
        return (
            <div className="domain-detail-wrapper">
                <Detail {...this.props}/>
                <TimeList/>   
                <div className="detail-footer">
                    {/* {
                        this.props.myauction.showDialog && <Addbid {...this.props} />
                    } */}
                    <Button type="primary"  onClick={this.onShowDialog} style={{borderRadius:'0'}} className="detail-btn">出价</Button>
                </div>
            </div>
        );
    }
    
}

export default injectIntl(DomainDetail)