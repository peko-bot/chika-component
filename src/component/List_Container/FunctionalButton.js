/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-10 13:50:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-10 17:46:49
 */
import React, { Component } from 'react'

import { Modal, List, Button } from 'antd-mobile'

export default class FunctionalButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal_visible: true,
            datas: [
                {
                    status: '降序',
                    direction: 'down',
                    text: 'test1'
                },
                {
                    status: '升序',
                    direction: 'up',
                    text: 'test2'
                },
                {
                    status: '无',
                    direction: 'horizontal',
                    text: 'test3'
                },
            ],
        }
    }

    handle_onAdd = () => {
        const { onAdd } = this.props;

        onAdd('add');

        this.setState({ modal_visible: false });
    }

    /**
     * 排序顺序，初始为无，箭头向右
     * 无 => 升序 => 降序 => 无
     * horizontal => up => down => horizontal
    */
    handle_onClick = item => {
        let { direction, status } = item;

        switch(direction) {
            case 'horizontal':
                item.direction = 'up';
                item.status = '升序';
            break;

            case 'up':
                item.direction = 'down';
                item.status = '降序';
            break;

            case 'down':
                item.direction = 'horizontal';
                item.status = '无';
            break;

            default:
                item.direction = 'horizontal';
                item.status = '无';
            break;
        }

        this.setState({});
    }

    render = () => {
        const { visible } = this.props;
        const { modal_visible, datas } = this.state;

        return (
            <div className='FunctionalButton'>
                <div className='sc-extend-add' onClick={ () => this.setState({ modal_visible: !modal_visible }) } style={{ display: visible ? '' : 'none' }}>
                    <i className='sc-extend-add-icon'>+</i>
                </div>

                <Modal popup animationType='slide-up' visible={ modal_visible } onClose={ () => { this.setState({ modal_visible: !modal_visible }) } }>
                    <List renderHeader={ () => <div>按字段排序</div> }>
                        {
                            datas.map((item, index) => (
                                <List.Item extra={ item.status } key={ index } arrow={ item.direction } onClick={ () => this.handle_onClick(item) }>{ item.text }</List.Item>
                            ))
                        }
                        <List.Item>
                            <Button type='primary' onClick={ this.handle_onAdd }>新增</Button>
                        </List.Item>
                    </List>
                </Modal>
            </div>
        )
    }
}