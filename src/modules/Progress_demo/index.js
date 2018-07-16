/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-12 19:48:04 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-16 09:36:05
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
        const customImage = `linear-gradient(90deg, 
            #feda3d 0%, 
            #80b99e 0%, 
            #0298ff 0%, 
            #02ccff 39%, 
            #01fefc 100%)`;

        return (
            <div className='Progress_demo'>
                <Progress percent={ 70 } height={ 20 } customImage={ customImage } active />
            </div>
        )
    }
}