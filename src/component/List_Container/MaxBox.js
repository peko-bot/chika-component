/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-30 09:22:09
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-30 13:40:35
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

    	onClose && onClose(window.leafletLatng);
    }

    render = () => {
    	const { url } = this.props;

    	return (
    		<div className='MaxBox'>
    			{/* <Modal visible={ !!url } closable onClose={ onClose } title={ <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1000 }}>test</div> }> */}
    			<Modal visible={ !!url }>
	    			<iframe ref={ ref => this.frameWork = ref } src={ url } style={{ border: 'none', width: '100%', height: '90%', display: url ? '' : 'none', position: 'absolute', left: 0, top: 0 }}></iframe>

    				<div style={{ position: 'absolute', bottom: '1%', left: '10%', width: '80%' }}>
    				    <Button type='primary' onClick={ this.handleOnClose }>返回</Button>
    				</div>
    			</Modal>
    		</div>
    	);
    }
}