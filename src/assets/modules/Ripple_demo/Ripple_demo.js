import React from 'react'

import Ripple from '../../component/Ripple/Ripple'

export default class Ripple_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () => {

    }

    dataSource = [
        {label: 'test1'},
        {label: 'test2'},
    ];
    
    render() {
        return (
            <div className='Ripple_demo'>
                {
                    this.dataSource.map((item, i) => {
                        return (
                            <div style={{overflow: 'hidden', position: 'relative', float: 'left', width: '50%'}}>
                                <Ripple wrapWidth={document.body.clientWidth / 2} duration='1s'>
                                    <div style={{background: '#F96', height: 200}}>{item.label}</div>
                                </Ripple>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}