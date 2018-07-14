/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-10 13:50:10 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-14 14:46:44
 */
import React, { Component } from 'react'

import { Modal, List, Button } from 'antd-mobile'

import { compare } from '../../util/Sort'

export default class FunctionalButton extends Component {
    constructor(props) {
        super(props);

        // 初始化排序属性
        let default_var = {
            status: '无',
            direction: 'horizontal'
        };
        let datas = [];
        for(let item of props.sortBy) {
            item = Object.assign({}, default_var, item);
            datas.push(item);
        }
        
        this.state = {
            modal_visible: false,
            datas,
        }
    }

    handle_onAdd = () => {
        const { onAdd } = this.props;

        onAdd('add');

        this.setState({ modal_visible: false });
    }

    /**
     * 排序顺序，初始为无，箭头向右
     * 无 => 升序 => 降序
     * horizontal => up => down
     * 只有一个字段参与排序
    */
    handle_onClick = item => {
        let { dataSource, onSort } = this.props;
        let { datas } = this.state;
        let { direction, status, key } = item;

        for(let ins of datas) {
            let { key: ins_key } = ins;

            if(key != ins_key) {
                ins.direction = 'horizontal';
                ins.status = '无';
            }
        }

        let isDesc = false;

        switch(direction) {
            case 'horizontal':
                item.direction = 'up';
                item.status = '升序';
            break;

            case 'up':
                item.direction = 'down';
                item.status = '降序';
                isDesc = true;
            break;

            case 'down':
                item.direction = 'up';
                item.status = '升序';
            break;

            default:
                item.direction = 'horizontal';
                item.status = '无';
            break;
        }

        dataSource.sort(compare(key, isDesc));
        onSort(dataSource);

        this.setState({ datas });
    }

    render = () => {
        const { visible, sortBy, power } = this.props;
        const { modal_visible, datas } = this.state;

        let extra_add = null;

        for(let item of power) {
            if(item.includes('Add')) {
                extra_add = (
                    <List.Item>
                        <Button type='primary' onClick={ this.handle_onAdd }>新增</Button>
                    </List.Item>
                );
            }
        }

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
                        { extra_add }
                    </List>
                </Modal>
            </div>
        )
    }
}