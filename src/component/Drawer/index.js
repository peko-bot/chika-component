/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-14 13:54:25
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-17 09:56:47
 */
import React, { Component } from 'react';

import './css/Drawer.css';

export default class Drawer extends Component {
	handlePosition = (direction, clientView, visible, width, type) => {
		const transform = this.handleTransform(direction);
		const { view } = this.handleClientView(direction, clientView, visible, width, type);

		return `${ transform }(${ view }px)`;
	}

	handleTransform = direction => {
		if(direction == 'left' || direction == 'right') {
			return 'translateX';
		} else if(direction == 'top' || direction == 'bottom') {
			return 'translateY';
		}

		return 'transform error';
	}

	// 返回箭头方向值跟抽屉位置
	handleClientView = (direction, clientView, visible, width, type) => {
		let view, iconDeg;

		if(direction == 'left' || direction == 'right') {
			clientView = clientView || (document.documentElement.clientWidth || document.body.clientWidth);
		} else if(direction == 'top' || direction == 'bottom') {
			clientView = clientView || (document.documentElement.clientHeight || document.body.clientHeight);
		}

		if(direction == 'left' || direction == 'top') {
			if(type == 'operate') {
				view = visible ? width : 0;
			} else {
				view = visible ? 0 : -width;
			}

			iconDeg = visible ? 0 : 180;
		} else if(direction == 'right' || direction == 'bottom') {
			if(type == 'operate') {
				view = visible ? clientView - width - 60 : clientView - 60;
			} else {
				view = visible ? clientView - width : clientView;
			}

			iconDeg = visible ? 180 : 0;
		}

		return { view, iconDeg };
	}

	handleOperateClick = () => {
		const { onChange, visible } = this.props;
		let iconDeg = visible ? 180 : 0;

		onChange && onChange(!visible);

		this.setState({ iconDeg });
	}

    render = () => {
    	const { children, width = 400, operaNode, direction = 'left', visible, isOperateShow = true, clientView, style } = this.props;
    	const { iconDeg } = this.handleClientView(direction, clientView, visible, width);

    	const operateDrawer = (
    		<div className='operate-drawer' style={{ transform: this.handlePosition(direction, clientView, visible, width, 'operate'), background: `linear-gradient(to ${ direction == 'left' ? 'right' : 'left' }, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0))` }} onClick={ this.handleOperateClick }>
    			<div className='scale-wrapper' style={{ transform: `rotateZ(${ iconDeg }deg)` }}>
    				{ operaNode ? operaNode : <img src='../../assets/Drawer/arrow.png' /> }
    			</div>
    		</div>
    	);

    	const showDrawer = (
    		<div className='show-drawer' style={ Object.assign({}, { width }, { transform: this.handlePosition(direction, clientView, visible, width) }, style) }>
    			{ children }
    		</div>
    	);

    	return (
    		<div className='Drawer'>
    			{ showDrawer }

    			{ isOperateShow && operateDrawer }
    		</div>
    	);
    }
}