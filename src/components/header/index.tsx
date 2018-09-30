// 标题组件
import * as React from 'react';
import './index.less';
import { NavBar, Icon } from 'antd-mobile';
import {observer, inject} from 'mobx-react';


@inject('common')
@observer
export default class Header extends React.Component {
    public cons = () => {
        history.go(-1);
    }
    public render() {
        return (
            <div className="header-group">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent="返回"
                    onLeftClick={this.cons}
                >{this.props['common'].title}</NavBar>
            </div>
        );
    }
}