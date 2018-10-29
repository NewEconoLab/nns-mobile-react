/**
 * 我的分红
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import BonusList from './bonuslist'
import {  IBonusProps, IBonusList } from './interface/index.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import './index.less'
import { ActivityIndicator } from 'antd-mobile';

// 接口"getbonushistbyaddress", 参数："ATBTRWX8v8teMHCvPXovir3Hy92RPnwdEi", page, pagesize

@inject('bonus')
@observer
class Bonus extends React.Component<IBonusProps, any>
{
  public prop = this.props.intl.messages;
  public async componentDidMount()
  {
    await this.props.bonus.getBonusListByAddress();
  }
  public render()
  {
    return (
      <div className="bonus-wrap">
        {
          !!!this.props.bonus.bonusList && 
          <div className="nodata-page">
            <div className="nodata-wrap">
              <ActivityIndicator animating={true}/>
            </div>          
          </div>  
        }
        {
          this.props.bonus.bonusList.length === 0 && 
          <div className="nodata-page">
            <div className="nodata-wrap">
              <img src={require('@/img/nodata.png')} alt=""/>
              <p>{this.prop.message.empty}</p>
            </div>          
          </div>    
        }            
        {
          this.props.bonus.bonusList.length !== 0 && 
            <React.Fragment>
              <TitleText text={this.prop.bonus.title} />
              <div className="bonus-list">
                {
                  this.props.bonus.bonusList.map((item: IBonusList, index: number) =>
                  {
                    return <BonusList item={item} key={index} />
                  })
                }
              </div>
            </React.Fragment> 
        }
        
      </div>
    );
  }
}
export default injectIntl(Bonus);