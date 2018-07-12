/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-12 19:48:04 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-12 20:19:06
 */
import React, { Component } from 'react'

import Progress from '../../component/Progress'

import './css/index.css'

export default class Progress_demo extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount = () => {
    
    }

    render = () => {
        return (
            <div className='Progress_demo'>
                <Progress percent={ 70 } height={ 20 } start='#F96' end='#1890ff' active />
            </div>
        )
    }
}