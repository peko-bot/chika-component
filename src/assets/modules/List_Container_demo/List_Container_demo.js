import React from 'react'

import Container from '../../component/List_Container/List_Container'
import './css/List_Container_demo.css'

export default class List_Container_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {
        // console.log('componentDidMount')
    }

    render() {
        return (
            <div className='List_Container_demo'>
                <Container tcid={1620} menuid={315}>
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
                            <label data-key='sectionid'>U_ADDRESS</label>
                        </div>
                        <div>
                            <label>测试字段4：</label>
                            {/* format需要写在最下层 */}
                            <label data-key='months' format='YYYY-MM-DD'>CREATETIME</label>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}