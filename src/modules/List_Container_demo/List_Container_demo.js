/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-02 21:02:58 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-05 09:44:06
 */
import React from 'react'

import Container from '../../component/List_Container'
// import {Container} from 'sc-component-mobile'
import './css/List_Container_demo.css'

import { List, Accordion, WingBlank } from 'antd-mobile'
import moment from 'moment'

export default class List_Container_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handle_onChange = item => {
        console.log(item)
    }

    config = {
        tcid: 10093,
        menuid: 1428,
        pageSize: 5,
        hasSearch: false, // 是否显示搜索面板
        hasAdd: false, // 是否显示右下添加按钮
        // UserId: 1,
        // CellPhone: 13900000000,
        // RequestUrl: '../../webapi/api/v2/generalbackstage/getdata',
        RequestParams: {
            // TCID: 1620,
            // PageSize: 10,
            // PageIndex: 1,
            // CellPhone: 13900000000,
            // sectionid: 4,
            // AddSearchField: 1,
        },
        // RequestMethod: 'POST',
    }

    render() {
        return (
            <div className='List_Container_demo'>
                <Container config={this.config} debug style={{ height: (document.documentElement.clientHeight || document.body.clientHeight) - 10 }}>
                    <div className='container' bind='true'>
                        <ul>
                            <li>
                                <div className='left'>
                                    <label>名称&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                                    <label data-key='id'></label>
                                </div>
                                <div className='right'>
                                    <label>所在河流&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;：</label>
                                    <label data-key='sectionidname'></label>
                                </div>
                            </li>

                            <li>
                                <div className='left'>
                                    <label>水闸类型：</label>
                                    <label data-key='sectionidname'></label>
                                </div>
                                <div className='right'>
                                    <label>最大过闸流量：</label>
                                    <label data-key='months' format='YYYY-MM-DD'></label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        )
    }
}