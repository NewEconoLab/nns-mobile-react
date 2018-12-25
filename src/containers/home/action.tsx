
/**
 * nns主页下常用功能模块
 */
import * as React from 'react';
import { Grid} from 'antd-mobile';
import './index.less'
// 引入图片
// import tutorial from '@/img/tutorial.png'
// import cgas from '@/img/cgasex.png'
// import trade from '@/img/trading.png'
import myauction from '@/img/myauction.png'
import domainmanager from '@/img/domainmanage.png'
import bonus from '@/img/bonus.png'
import record from '@/img/record.png'
import setting from '@/img/setting.png'
// 引入小标题组件
import TitleText from '@/components/titletext';
// 引入数据类型
import {IGriddataItem, IHomeProps} from '@/containers/home/interface/home.interface';
// 引入中英文切换组件
import {injectIntl} from 'react-intl'

class Action extends React.Component<IHomeProps,any> {
    // 定义语言切换常量
    public home = this.props.intl.messages.home;
    // 自定义宫格里的样式
    public renderItem = (dataItem: IGriddataItem) => {
        return (
            <div style={{ padding: '.125rem' }}>
                <img src={dataItem.icon} style={{ width: '.32rem', height: '.32rem',marginBottom:'.1rem' }} alt="" />
                <div style={{ color: '#000', fontSize: '14px',whiteSpace:'nowrap' }}>
                    <span>{dataItem.text}</span>
                </div>
            </div>
            );
    }
    public onClickEvent = (el:IGriddataItem)=>{
        this.props.history.push(el.page);       
    }
    public render() {
        // 定义功能
        const data = [
            // {
            //     icon: cgas,
            //     text: this.home.action.exchange,
            //     page:'exchange'
            // },
            {
                icon: myauction,
                text: this.home.action.auction,
                page:'auction'
            },
            {
                icon: domainmanager,
                text: this.home.action.manager,
                page:'manager'
            },
            {
                icon: bonus,
                text: this.home.action.bonus,
                page:'bonus'
            },
            {
                icon: record,
                text: this.home.action.record,
                page:'record'
            },
            {
                icon: setting,
                text: this.home.action.setting,
                page:'setting'
            }
            // {
            //     icon: trade,
            //     text: this.home.action.traderecord,
            //     page:'traderecord'
            // }
            // {
            //     icon: tutorial,
            //     text: this.home.action.tutorial,
            //     page:'tutorial'
            // }
        ];

        return (
            <div className="action-wrap box-wrap">
                <TitleText text={this.home.action.title}/>
                <Grid
                    data={data}
                    hasLine={false}
                    columnNum={3}
                    itemStyle={{ height: '.85rem' }}
                    renderItem={this.renderItem}
                    onClick={this.onClickEvent}
                />
            </div>
        );
    }
}

export default injectIntl(Action);
