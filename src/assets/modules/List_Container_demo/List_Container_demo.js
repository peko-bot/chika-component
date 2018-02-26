import React from 'react'

import Container from '../../component/List_Container/List_Container'
// import {Container} from 'sc-component-mobile'
import './css/List_Container_demo.css'
import { List, Accordion, WingBlank } from 'antd-mobile'

export default class List_Container_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {

    }

    config = {
        tcid: 10093,
        menuid: 1428,
        pageSize: 5,
        // UserId: 1,
        // CellPhone: 13900000000,
        // RequestUrl: 'http://47.95.1.229:8500/webapi/api/v2/generalbackstage/getdata',
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
                <Container config={this.config}>
                    <Accordion defaultActiveKey='0' style={{margin: '10px 8px'}}>
                            <Accordion.Panel header={<label>{`最近更新时间： ${T.clock().fmt('YYYY-MM-DD hh:mm:ss')}`}</label>}>
                                <WingBlank>
                                    <List bind>
                                        <List.Item>
                                            <label>id</label>
                                            <label data-key='rs_id' style={{float: 'right'}} />
                                        </List.Item>
                                        <List.Item>
                                            <label>水库名称</label>
                                            <label data-key='rs_name' style={{float: 'right'}} />
                                        </List.Item>
                                        {/* <List.Item>
                                            <label>类型</label>
                                            <label data-key='rs_type_text' style={{float: 'right'}} />
                                        </List.Item>
                                        <List.Item>
                                            <label>所在市</label>
                                            <label data-key='city' style={{float: 'right'}} />
                                        </List.Item> */}
                                        <List.Item>
                                            <label>建成时间</label>
                                            {/* format需要写在最下层，不能有子标签 */}
                                            <label data-key='create_tm' format='YYYY-MM-DD' style={{float: 'right'}} />
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