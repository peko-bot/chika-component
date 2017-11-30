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
                <Container>
                    <div className='item' bind>
                        <div>
                            <span>测试字段1：</span>
                            <span data-key='RNAME'/>
                        </div>
                        <div>
                            <span>测试字段2：</span>
                            <span data-key='REALNAME'/>
                        </div>
                        <div>
                            <span>测试字段3：</span>
                            <span data-key='U_ADDRESS'/>
                        </div>
                        <div>
                            <span>测试字段4：</span>
                            {/* format需要写在最下层 */}
                            <span data-key='CREATETIME' format='YYYY-MM-DD' />
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}