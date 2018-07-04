/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-02 21:02:58 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-03 15:41:54
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
                <Container config={this.config} debug height='100%'>
                    <Accordion defaultActiveKey='0' style={{margin: '10px 8px'}}>
                        <Accordion.Panel header={<label>{`最近更新时间： ${moment().format('YYYY-MM-DD HH:mm:ss')}`}</label>}>
                            <WingBlank>
                                {/* <List bind> */}
                                <List onChange={this.handle_onChange}>
                                    <List.Item>
                                        <label>id</label>
                                        <label data-key='id' style={{float: 'right'}} />
                                    </List.Item>
                                    <List.Item>
                                        <label>水库名称</label>
                                        <label data-key='sectionidname' style={{float: 'right'}} />
                                    </List.Item>
                                    <List.Item>
                                        <label>建成时间</label>
                                        {/* format需要写在最下层，不能有子标签 */}
                                        <label data-key='months' format='YYYY-MM-DD' style={{float: 'right'}} />
                                    </List.Item>
                                </List>
                            </WingBlank>
                        </Accordion.Panel>
                    </Accordion>
                </Container>
            </div>
        )
    }
}