import React, { Component } from 'react';

import { Modal, List, Button } from 'antd-mobile';

import { compare } from '../../util/Sort';

export default class FunctionalButton extends Component {
  constructor(props) {
    super(props);

    // 初始化排序属性
    const defaultVar = {
      status: '无',
      direction: 'horizontal',
    };
    let datas = [];

    for (let item of props.sortBy) {
      item = Object.assign({}, defaultVar, item);
      datas.push(item);
    }

    this.state = {
      modalVisible: false,
      datas,
    };
  }

  handleOnAdd = () => {
    const { onAdd } = this.props;

    onAdd('add');

    this.setState({ modalVisible: false });
  };

  /**
   * 排序顺序，初始为无，箭头向右
   * 无 => 升序 => 降序
   * horizontal => up => down
   * 只有一个字段参与排序
   */
  handleOnClick = item => {
    let { dataSource, onSort } = this.props;
    let { datas } = this.state;
    let { direction, status, key } = item;

    for (let ins of datas) {
      let { key: insKey } = ins;

      if (key != insKey) {
        ins.direction = 'horizontal';
        ins.status = '无';
      }
    }

    let isDesc = false;

    switch (direction) {
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
  };

  render = () => {
    const { visible, sortBy, power } = this.props;
    const { modalVisible, datas } = this.state;

    let extraAdd = null;

    for (let item of power) {
      if (item.includes('Add')) {
        extraAdd = (
          <List.Item>
            <Button type="primary" onClick={this.handleOnAdd}>
              新增
            </Button>
          </List.Item>
        );
      }
    }

    return (
      <div className="FunctionalButton">
        <div
          className="sc-extend-add"
          onClick={() => this.setState({ modalVisible: !modalVisible })}
          style={{ display: visible ? '' : 'none' }}
        >
          <i className="sc-extend-add-icon">+</i>
        </div>

        <Modal
          popup
          animationType="slide-up"
          visible={modalVisible}
          onClose={() => {
            this.setState({ modalVisible: !modalVisible });
          }}
        >
          <List renderHeader={() => <div>按字段排序</div>}>
            {datas.map((item, index) => (
              <List.Item
                extra={item.status}
                key={index}
                arrow={item.direction}
                onClick={() => this.handleOnClick(item)}
              >
                {item.text}
              </List.Item>
            ))}
            {extraAdd}
          </List>
        </Modal>
      </div>
    );
  };
}
