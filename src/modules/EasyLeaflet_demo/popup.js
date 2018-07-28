/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-27 16:25:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-27 17:11:50
 */
import React, { Component } from 'react';

import { Modal, List, Button } from 'antd-mobile';

export default class popup extends Component {
    handleBack = e => {
    	this.props.onBack && this.props.onBack();
    }

    render = () => {
    	const { visible } = this.props;
    	const footer = [
    		{ text: '返回地图', onPress: this.handleBack },
    		{ text: '返回上级', onPress: this.handleBack },
    	];

    	return (
    		<Modal popup animationType='slide-up' visible={ visible } onClose={ () => { this.setState({ visible: !visible }); } } footer={ footer }>
    			<List renderHeader={ () => <div>坐标信息</div> }>
    				{/* {
                        datas.map((item, index) => (
                            <List.Item extra={ item.status } key={ index } arrow={ item.direction } onClick={ () => this.handle_onClick(item) }>{ item.text }</List.Item>
                        ))
                    } */}

    				{/* <List.Item>
                        <Button onClick={ this.handleBack }>返回</Button>
                    </List.Item> */}
    			</List>
    		</Modal>
    	);
    }
}