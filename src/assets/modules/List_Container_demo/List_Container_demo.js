import React from 'react'

import Container from '../../component/List_Container/List_Container'
import './css/List_Container_demo.css'

export default class List_Container_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='List_Container_demo'>
                <Container tbid={1483}>
                    <div className='item' bind>
                        <div>
                            <label>测试字段1：</label>
                            <label data-key='UNAME'>UNAME</label>
                        </div>
                        <div>
                            <label>测试字段2：</label>
                            <label data-key='REALNAME'>REALNAME</label>
                        </div>
                        <div>
                            <label>测试字段3：</label>
                            <label data-key='U_ADDRESS'>U_ADDRESS</label>
                        </div>
                        <div>
                            <label>测试字段4：</label>
                            {/* format需要写在最下层 */}
                            <label data-key='CREATETIME' format='YYYY-MM-DD'>CREATETIME</label>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}