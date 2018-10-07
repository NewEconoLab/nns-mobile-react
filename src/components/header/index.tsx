// 标题组件
import * as React from 'react';
import './index.less';
import { NavBar, Icon } from 'antd-mobile';
import {observer, inject} from 'mobx-react';

interface IProps {
    locale:any
}

@inject('common')
@observer
export default class Header extends React.Component<IProps> {
    public cons = () => {
        history.go(-1);
    }
    public render() {
        return (
            <div className="header-group">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    leftContent={this.props.locale.back}
                    onLeftClick={this.cons}
                >{this.props['common'].title}</NavBar>
            </div>
        );
    }
}