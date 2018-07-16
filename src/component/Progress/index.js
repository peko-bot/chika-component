/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-12 19:46:59 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-16 09:35:18
 */
import React, { Component } from 'react'

import './css/index.css'

export default class index extends Component {
    render = () => {
        const { percent = 50, height = 8, start, end, active = false, customImage } = this.props;

        let backgroundImage;

        if(customImage) {
            backgroundImage = customImage;
        }

        if(start && end) {
            backgroundImage = `linear-gradient(to right, ${ start }, ${ end })`;
        }

        return (
            <div className='Progress'>
                <div className='outer'>
                    <div className='inner'>
                        <div className={ `content ${ active ? 'active' : '' }` } style={{ height, width: `${ percent }%`, backgroundImage }}></div>
                    </div>
                </div>
            </div>
        )
    }
}