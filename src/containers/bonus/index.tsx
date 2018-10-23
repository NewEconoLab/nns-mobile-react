/**
 * 我的分红
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import BonusList from './bonuslist'
import {IBonusList, IBonusProps} from './interface/index.interface';
import {observer, inject} from 'mobx-react';
import './index.less'

// 接口"getbonushistbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi", page, pagesize

@inject('bonus')
@observer
export default class Bonus extends React.Component<IBonusProps, any>
{
  public async componentDidMount() {
    await this.props.bonus.getBonusListByAddress();
  }
  
  public render()
  {
    return (
      <div className="bonus-wrap">
        <TitleText text="我的域名"/>
        <div className="bonus-list">
        {
          this.props.bonus.bonusList.map((item:IBonusList,index:number) => {
            return <BonusList item={item} key={index}/>
          })
        }
        </div>        
      </div>
    );
  }
}