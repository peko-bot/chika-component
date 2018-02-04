import React from 'react'

import Container from '../../component/List_Container/List_Container'
// import {Container} from 'sc-component-mobile'
import './css/List_Container_demo.css'

export default class List_Container_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        // console.log('componentDidMount')
    }

    config = {
        tcid: 1620,
        menuid: 315,
        pageSize: null,
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
                    <div className='item' bind>
                        <div>
                            <label>测试字段1：</label>
                            <label data-key='id'>UNAME</label>
                        </div>
                        <div>
                            <label>测试字段2：</label>
                            <label data-key='bottle'>REALNAME</label>
                        </div>
                        <div>
                            <label>测试字段3：</label>
                            <label data-key='sectionidname'>U_ADDRESS</label>
                        </div>
                        <div>
                            <label>测试字段4：</label>
                            {/* format需要写在最下层 */}
                            <label data-key='months' format='YYYY-MM-DD'>CREATETIME</label>
                        </div>
                        <div>
                            <label>测试字段5：</label>
                            <label data-key='test1'>U_ADDRESS</label>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}