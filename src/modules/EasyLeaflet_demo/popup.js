/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-27 16:25:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 23:09:17
 */
import React, { Component } from 'react';

import { Modal, List, Button } from 'antd-mobile';

export default class popup extends Component {
    handleBack = e => {
    	this.props.onBack && this.props.onBack();
    }

    render = () => {
    	const { visible, info } = this.props;
    	const footer = [
    		{ text: '返回地图', onPress: this.handleBack },
    		{ text: '返回上级', onPress: this.handleBack },
    	];

    	return (
    		<Modal platform='android' popup animationType='slide-up' visible={ visible } onClose={ () => { this.setState({ visible: !visible }); } } footer={ footer }>
    			<List renderHeader={ () => <div>坐标信息</div> }>
    				<List.Item extra={ info.lng }>经度</List.Item>
    				<List.Item extra={ info.lat }>纬度</List.Item>
    			</List>
    		</Modal>
    	);
    }
}