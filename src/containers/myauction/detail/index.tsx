/**
 * 我的竞拍域名详情页
 */
import * as React from 'react';
import Detail from './detail'
import TimeList from './timelist'
import Addbid from './addbid'
import { Button } from 'antd-mobile';
import '../index.less'
export default class DomainDetail extends React.Component
{

    public render()
    {
        return (
            <div className="domain-detail-wrapper">
                <Detail/>
                <TimeList/>
                <div className="detail-footer">
                    <Addbid/>
                    <Button type="primary" style={{borderRadius:'0'}} className="detail-btn">出价</Button>
                </div>
            </div>
        );
    }
}
