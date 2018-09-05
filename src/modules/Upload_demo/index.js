/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:46:42
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 11:06:59
 */
import React, { Component } from 'react';

import Upload from '../../component/Upload';

export default class index extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

	onChange = file => {
		console.log(file);
	}

	fileList = [
		{ url: 'test1', id: 1 },
		{ url: 'test2', id: 2 },
		{ url: 'test3', id: 3 },
		{ url: 'test4', id: 4 },
	]

    render = () => {
    	return (
    		<div className='index'>
    			<Upload fileList={ this.fileList } onChange={ this.onChange } />
    		</div>
    	);
    }
}