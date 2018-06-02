import React from 'react'

// import './css/Button_demo.css'
import Button from '../../component/Button/Button'

export default class Button_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {}

    onChange = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div className='Button_demo'>
                <Button type='primary' onChange={this.onChange} style={{height:35,width:200}}>测试文字</Button>
            </div>
        )
    }
}