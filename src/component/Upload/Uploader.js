/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:44:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 11:10:16
 */
import React, { Component } from 'react';

import './css/Uploader.css';

export default class Upload extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    wrapperOnClick = () => {
    	let el = this.uploadInput;

    	if (!el) {
    		return;
    	}

    	el.click();
    	el.value = '';
    }

    onChange = e => {
    	const { multiple, onStart } = this.props;
    	let files = e.target.files;

    	if (files.length > 0) {
    		for (let file of files) {
    			this.upload(file);
    		}

    		// if (multiple) {
    		// 	onStart(Array.prototype.slice.call(files));
    		// } else {
    		// 	onStart(Array.prototype.slice.call(files)[0]);
    		// }
    	}
    }

    upload = file => {
    	const { data, onChange } = this.props;

    	onChange && onChange(file);
    }

    render = () => {
    	return (
    		<div className='Uploader'>
    			<div onClick={ this.wrapperOnClick } className='wrapper'>
    				<span className='upload-button'>
    					<input type='file' ref={ ref => this.uploadInput = ref } style={{ display: 'none' }} onChange={ this.onChange } />

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