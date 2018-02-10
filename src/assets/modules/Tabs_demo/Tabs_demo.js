import React from 'react'

import Tabs from '../../component/Tabs/Tabs'

export default class Tabs_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: [],
            currentSelect: 1,
        }
    }

    componentDidMount = () => {
        // 请求页签数据
        // T.ajax({
        //     key: 'tableDatas',
        //     f: 'json',
        //     success: (result) => {
        //         this.setState({result});
        //     }
        // })
    }

    onClick = (item, currentSelect) => {
        this.setState({currentSelect});
    }

    config = {
        // containerStyle: {background: '#F96'}
    }

    render() {
        const {result,currentSelect} = this.state;

        return (
            <div className='Tabs_demo'>
                <Tabs currentSelect={currentSelect} onClick={this.onClick} config={this.config}>
                    <div label='test111111'>test1</div>
                    <div label='test2'>test2</div>
                </Tabs>
            </div>
        )
    }
}