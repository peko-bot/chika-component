/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-28 08:08:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 21:54:38
 */

/**自定义内容弹框
* config 传入的配置
* lat : 纬度
* lng : 经度
* direction : 方向 top/bottom/left/right
* height : 高度
* width : 宽度
* x : x轴偏移
* y : y轴偏移
*/
import React from 'react';

import { defaultDivStyle } from '../css/style';
import { eHelper } from '../helper';

let map = null;

export default class Popup extends React.Component {
	constructor (props) {
		super(props);
		this.state = {

		};
	}
	componentDidMount () {
		eHelper.on(event, 'MAP_MOVE', this.moveFun);
		this.setState();
	}
    moveFun = (e) => {
    	this.setState();
    }
    render () {
    	let boxStyle = { position: 'absolute', zIndex: 9997 },
    		dx, dy,
    		{ config } = this.props;

    	config = Object.assign({}, defaultDivStyle, config);
    	if (map) {
    		switch (config.direction) {
    			case 'top': dx = - (parseFloat(config.width) / 2) + config.x; dy = - parseFloat(config.height) + config.y; break;
    			case 'bottom': dx = - (parseFloat(config.width) / 2) + config.x; dy = config.y; break;
    			case 'left': dx = - parseFloat(config.width) + config.x; dy = - (parseFloat(config.height) / 2) + config.y; break;
    			case 'right': dx = config.x; dy = - (parseFloat(config.height) / 2) + config.y; break;
    			default: dx = config.x; dy = config.y; break;
    		}
    		// let bounds = map.getBounds(),size = map.getSize();
    		//     boxStyle.left = size.x / (bounds._northEast.lng - bounds._southWest.lng) * (config.lng - bounds._southWest.lng) + dx,
    		//     boxStyle.top = size.y / (bounds._southWest.lat - bounds._northEast.lat) * (config.lat - bounds._northEast.lat) + dy;
    	}
    	return (
    		<div style={ boxStyle }>
    			{
    				React.Children.map(this.props.children, (child, i) => {
    					return <div>{ child }</div>;
    				})
    			}
    		</div>
    	);
    }
}