/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-12 19:46:59 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-12 20:37:21
 */
import React, { Component } from 'react'

import './css/index.css'

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render = () => {
        const { percent = 50, height = 8, start = '#F96', end = '#1890ff', active = false } = this.props;

        return (
            <div className='Progress'>
                <div className='outer'>
                    <div className='inner'>
                        <div className={`content ${active ? 'active' : ''}`} style={{ height, width: `${percent}%`, background: `linear-gradient(to right, ${start}, ${end})` }}></div>
                    </div>
                </div>
            </div>
        )
    }
}