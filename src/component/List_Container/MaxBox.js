/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-30 09:22:09
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-01 10:18:24
 */
import React, { Component } from 'react';

import { Modal, Button } from 'antd-mobile';

export default class MaxBox extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    handleOnClose = () => {
    	const { onClose } = this.props;

    	const [lng, lat, address] = window.leafletLatng.split('|');

    	onClose && onClose({ lng, lat, address });
    }

    render = () => {
    	const { url } = this.props;

    	return (
    		<div className='MaxBox'>
    			<Modal visible={ !!url }>
	    			<iframe src={ url } style={{ border: 'none', width: '100%', height: '90%', display: url ? '' : 'none', position: 'absolute', left: 0, top: 0 }}></iframe>

    				<div style={{ position: 'absolute', bottom: '1%', left: '10%', width: '80%' }}>
    				    <Button type='primary' onClick={ this.handleOnClose }>返回</Button>
    				</div>
    			</Modal>
    		</div>
    	);
    }
}