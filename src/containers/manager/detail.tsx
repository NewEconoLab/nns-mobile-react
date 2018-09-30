/**
 * 域名的解析、映射以及续约
 */
import * as React from 'react';
import TitleText from '@/components/titletext';
import { Button } from 'antd-mobile';
import {IProps} from './interface/index.interface';
import './index.less'

export default class DomainMap extends React.Component<IProps, any>
{
  public render()
  {
      console.log(this.props.match.params['domain'])
    return (
      <div className="domainset-wrap">
        <div className="mapping-block">
            <TitleText text="域名"/>
            <div className="text-normal">sadfasdfa.neo</div>
        </div>
        <div className="mapping-block">
            <TitleText text="地址解析器">
                {/* <Button type="warning" inline={true} size="small">重置</Button> */}
                <Button type="primary" inline={true} size="small">设置</Button>
            </TitleText>
            <div className="text-normal">6bcc17c5628de5fc05a80cd87add35f0f3f1b0ab</div>
        </div>
        <div className="mapping-block">
            <TitleText text="地址映射">
                {/* <Button type="warning" inline={true} size="small">重置</Button> */}
                <Button type="ghost" inline={true} size="small" disabled={true} style={{background:'#ddd',color:'#bbb'}}>设置</Button>
            </TitleText>
            <div className="text-normal">AYMa5TcgVfvPxBxzzfYswUHAvXLyaptquh</div>
        </div>
        <div className="mapping-block">
            <TitleText text="到期时间">
                <Button type="primary" inline={true} size="small">续约</Button>
            </TitleText>
            <div className="text-normal">2018/08/14 10:20:20 <span className="text-orange">（即将过期）</span></div>
        </div>
      </div>
    );
  }
}
