/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:44:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 20:41:53
 */
import React, { Component } from 'react';

import Uploader from './Uploader';
import UploadView from './UploadView';

export default class Upload extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    render = () => {
    	const { fileList, onChange, loading } = this.props;

    	return (
    		<div className='Upload'>
    			<UploadView  fileList={ fileList } loading={ loading } />
    			<Uploader onChange={ onChange } />
    		</div>
    	);
    }
}