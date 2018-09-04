/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:46:42
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-04 16:27:36
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

    render = () => {
    	return (
    		<div className='index'>
    			<Upload fileList={ [] } onChange={ this.onChange } />
    		</div>
    	);
    }
}