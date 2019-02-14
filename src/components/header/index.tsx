// 标题组件
import * as React from 'react';
import './index.less';
import { NavBar, Icon } from 'antd-mobile';
import {observer, inject} from 'mobx-react';
// import { RouteComponentProps } from 'react-router-dom';
interface IProps{
    locale:any,
    isHome:boolean // 是否为主页，true为是
}

@inject('common')
@observer
export default class Header extends React.Component<IProps> {
    public cons = () => {
        history.back();
    }
    public notAllow = () => {
        return
    }
    public render() {
        return (
            <div className="header-group">
                <NavBar
                    mode="light"
                    icon={this.props.isHome?'':<Icon type="left" />}
                    leftContent={this.props.isHome?'':this.props.locale.back}
                    onLeftClick={this.props.isHome?this.notAllow:this.cons}
                >{this.props['common'].title}</NavBar>
            </div>
        );
    }
}