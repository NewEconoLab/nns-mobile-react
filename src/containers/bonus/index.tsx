/**
 * 我的分红
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import BonusList from './bonuslist'
import { IBonusProps, IBonuseInfo } from './interface/index.interface';
import { observer, inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd-mobile';
import * as formatTime from 'utils/formatTime';
import Alert from '@/components/alert';
import './index.less'

@inject('bonus')
@observer
class Bonus extends React.Component<IBonusProps, any>
{
  public prop = this.props.intl.messages;
  public listRef: React.RefObject<HTMLDivElement> = React.createRef();
  public async componentDidMount() {
    this.props.bonus.getCurrentBonus();
    await this.props.bonus.getBonusListByAddress();
    window.addEventListener('scroll', this.onScroll, false);
  }
  public onScroll = () => {
    if (this.props.bonus.bonusList.length === 0) {
      return;
    }
    if (!this.listRef || !this.listRef.current) {
      return;
    }

    const winScroll = window.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    if (winScroll + (document.documentElement ? document.documentElement.clientHeight : 0) >= this.listRef.current.offsetHeight + this.listRef.current.offsetTop + 46) {
      this.props.bonus.pageIndex++;
      this.props.bonus.getBonusListByAddress();
    }

  }
  public componentWillUnmount() {
    this.props.bonus.myBonusInfo = null;
    this.props.bonus.bonusList = [];
    this.props.bonus.applyState = 0;
    window.removeEventListener('scroll', this.onScroll);
    this.props.bonus.pageIndex = 1;
    this.props.bonus.isLast = false;
  }
  public toApplyBonus = async () => {
    const res = await this.props.bonus.applyBonus();
    if (res) {
      Alert(this.prop.message.successmsg, this.prop.message.waitmsg, this.prop.btn.confirm, function () {
        return;
      });
    }
  }
  public render() {
    return (
      <div className="bonus-wrap" ref={this.listRef}>
        <div className="mybonus-box">
          <div className="title-bonus">
            <div className="title-bonusname">{this.prop.bonus.bonus}</div>
            <p className="title-bonustips">{this.prop.bonus.tips}</p>
          </div>
          <div className="mybonus-wrapper">
            <div className="mybonus-text">{this.prop.bonus.dividends}<span className="text-green">+ {this.props.bonus.myBonusInfo && this.props.bonus.myBonusInfo.send} CGAS</span></div>
            <div className="mybonus-othertext">{this.prop.bonus.pool}{this.props.bonus.myBonusInfo && this.props.bonus.myBonusInfo.totalSend} CGAS</div>
            <div className="mybonus-othertext">{this.prop.bonus.mytotal}{this.props.bonus.myBonusInfo && this.props.bonus.myBonusInfo.balance} NNC</div>
            <div className="mybonus-othertext">
              {this.prop.bonus.time}
              {
                this.props.bonus.myBonusInfo && formatTime.format('yyyy/MM/dd hh:mm:ss', this.props.bonus.myBonusInfo.blocktime.toString(), this.props.intl.locale)
              }
            </div>
          </div>
        </div>
        {
          this.props.bonus.bonusList.length !== 0 &&
          <React.Fragment>
            <TitleText text={this.prop.bonus.title} />
            <div className="bonus-list">
              {
                this.props.bonus.bonusList.map((item: IBonuseInfo, index: number) => {
                  return <BonusList item={item} key={index} />
                })
              }
            </div>
          </React.Fragment>
        }
        <div className="apply-bonus">
          {
            this.props.bonus.applyState === 0 && <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" disabled={true} >{this.prop.btn.apply}</Button>
          }
          {
            this.props.bonus.applyState === 1 && <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" onClick={this.toApplyBonus}>{this.prop.btn.apply}</Button>
          }
          {
            this.props.bonus.applyState === 2 && <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" disabled={true}>{this.prop.btn.applying}</Button>
          }
          {
            this.props.bonus.applyState === 3 && <Button type="primary" style={{ borderRadius: '0' }} className="detail-btn" disabled={true} >{this.prop.btn.applyed}</Button>
          }
        </div>
      </div>
    );
  }
}
export default injectIntl(Bonus);