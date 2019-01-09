/**
 * nns主页布局
 */
import * as React from 'react';
import Action from '@/containers/home/action';
import Account from '@/containers/home/account';
import Auction from '@/containers/home/auction';
import BuyDomain from '@/containers/home/buydomain';
import { IHomeProps } from '@/containers/home/interface/home.interface';
import './index.less'

import { observer, inject } from 'mobx-react';
// import { Button } from 'antd-mobile';
// import o3tools from '@/utils/o3tools';

@inject('home', 'common')
@observer
class NNS extends React.Component<IHomeProps, any> {
  // public componentDidMount() {
  //   Alert('操作失败', '操作失败，请稍后再试', '确定', () => {alert(1)}, 'error')
  // }
  // public toClick = ()=>{
  //   const data = "d100732007219014d66b086dc3fb5a57bfc25b570aaaaf52d22210eee0d78ed474e4f80575200873ccebcf243a6976761715f22d45054f97f4de17b03e52175a67fc7fce60fc147d8c98a8f70da385408ad784321130de551372ec52c1036275796766044f53088e2140268528e0e06483254392d0c401207d8c98a8f70da385408ad784321130de551372ec0000";
  //   o3tools.sign(data,res=>{
  //     console.log("o3 sign res");
      
  //     console.log(res);
  //   })
  // }
  public render() {
    return (
      <div className="nns-page">
        {/* <Button onClick={this.toClick}>签名</Button> */}
        <Action {...this.props} />
        <Account {...this.props} />
        <Auction {...this.props} />
        {
          this.props.home.isShowSaleBox && (
            <BuyDomain {...this.props} />
          )
        }
      </div>
    );
  }
}

export default NNS;
