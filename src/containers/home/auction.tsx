
/**
 * nns主页下的域名竞拍模块
 */
import * as React from 'react';
import './index.less'
import Input from '@/components/Input/Input'
import TitleText from '@/components/titletext';
import { Button,WingBlank } from 'antd-mobile';
// 引入数据类型
import {IHomeProps} from '@/containers/home/interface/home.interface';
import {injectIntl} from 'react-intl'

interface IState {
  inputValue:string,
  message:string,
  status:string
}

// 获取竞拍状态：getauctionstate 参数：域名
class Auction extends React.Component<IHomeProps, IState>
{
  public prop = this.props.intl.messages;
  constructor(props:any) {
    super(props);
    this.state = {
      inputValue:"",
      status:"",
      message:""
    }
  }
  public change = (value:string) => {
    this.setState({
      inputValue:value,
      status:'error',
      message:'erroroooorrrr'
    });
  }
  public render()
  {
    return (
      <div className="auction-wrap box-wrap">
        <TitleText text={this.prop.home.auction.title}/>
        <div className="auction-name">
          <Input 
              placeholder=""
              style={{width: 300}}
              status=""
              message=""
              value={this.state.inputValue}
              onChange={this.change}
              type="text"
          />
          <span className="auction-neo">.neo</span>
        </div>        
        <WingBlank><Button type="primary">{this.prop.btn.startauction}</Button></WingBlank>
      </div>
    );
  }
}

export default injectIntl(Auction);