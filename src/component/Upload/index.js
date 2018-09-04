/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:44:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-04 14:41:07
 */
import React, { Component } from 'react';

import './css/index.css';

export default class Upload extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    wrapperOnClick = () => {
    	let el = this.uploadInput;

    	if (!el) {
    		return;
    	}

    	el.click();
    	el.value = '';
    }

    render = () => {
    	return (
    		<div className='Upload'>
    			<div onClick={ this.wrapperOnClick } className='wrapper'>
    				<span className='upload-button'>
    			        <input type='file' ref={ ref => this.uploadInput = ref } style={{ display: 'none' }} />

    					<div>
    						<i className='plus-icon'>+</i>
    						<div>upload</div>
    					</div>
    				</span>
    			</div>
    		</div>
    	);
    }
}