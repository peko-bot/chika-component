/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:44:01
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 21:19:40
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
    	const { fileList, onChange, loading, style, isShowPlus, plusText } = this.props;

    	return (
    		<div className='Upload' style={ Object.assign({}, style) }>
    			<UploadView  fileList={ fileList } loading={ loading } />
    			<Uploader onChange={ onChange } visible={ isShowPlus } plusText={ plusText } />
    		</div>
    	);
    }
}