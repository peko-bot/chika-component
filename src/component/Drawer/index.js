/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-14 13:54:25
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-14 15:08:52
 */
import React, { Component } from 'react';

import './css/Drawer.css';

export default class Drawer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			position: 0,
			iconDeg: 90,
		};
	}

    render = () => {
    	const { children, width = 400, operaNode, direction = 'left', visible, isOperateShow = true, clientView } = this.props;
    	const { position, iconDeg } = this.state;

    	const operateDrawer = (
    		<div className='operate-drawer' style={{ transform: `translateX(${ position + width }px)` }} onClick={ () => this.setState({ position: position == 0 ? -width : 0, iconDeg: position == 0 ? 180 : 0 }) }>
    			<div className='scale-wrapper' style={{ transform: `rotateZ(${ iconDeg }deg)` }}>
    				{ operaNode ? operaNode : <img src='../../assets/Drawer/arrow.png' /> }
    			</div>
    		</div>
    	);

    	return (
    		<div className='Drawer'>
    			<div className='show-drawer' style={{ transform: `translateX(${ position }px)` }}>
    				{ children }
    			</div>

    			{ isOperateShow && operateDrawer }
    		</div>
    	);
    }
}