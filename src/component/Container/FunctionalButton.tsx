import React, { Component } from 'react';
import { Modal, List } from 'antd-mobile';
import { compare } from '../../util';

type SortStatus = '无' | '升序' | '降序';
type SortDirection = 'horizontal' | 'up' | 'down';
type SortByProps = { key: string; text: string };
export type SortItem = {
  status: SortStatus;
  direction: SortDirection;
} & SortByProps;
export interface FunctionalButtonProps {
  sortBy: Array<SortByProps>;
  dataSource: Array<any>;
  onSort?: (dataSource: Array<any>) => void;
}
export interface FunctionalButtonState {
  modalVisible: boolean;
  sorts: Array<SortItem>;
}

export default class FunctionalButton extends Component<
  FunctionalButtonProps,
  FunctionalButtonState
> {
  constructor(props: FunctionalButtonProps) {
    super(props);

    let sorts: Array<
      {
        status: SortStatus;
        direction: SortDirection;
      } & SortByProps
    > = [];
    for (let item of props.sortBy) {
      sorts.push({
        ...{
          status: '无',
          direction: 'horizontal',
        },
        ...item,
      });
    }

    this.state = {
      modalVisible: false,
      sorts,
    };
  }

  /**
   * 排序顺序，初始为无，箭头向右
   * 无 => 升序 => 降序
   * horizontal => up => down
   * 只有一个字段参与排序
   */
  handleOnClick = (item: SortItem) => {
    let { dataSource, onSort } = this.props;
    let { sorts } = this.state;
    let { direction, key } = item;

    for (let ins of sorts) {
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
    onSort && onSort(dataSource);

    this.setState({ sorts });
  };

  render = () => {
    const { modalVisible, sorts } = this.state;
    return (
      <div className="FunctionalButton">
        <div
          className="sc-extend-add"
          onClick={() => this.setState({ modalVisible: true })}
        >
          <i className="sc-extend-add-icon">+</i>
        </div>

        <Modal
          popup
          animationType="slide-up"
          visible={modalVisible}
          onClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <List renderHeader="按字段排序">
            {sorts.map(item => (
              <List.Item
                extra={item.status}
                key={item.key}
                arrow={item.direction}
                onClick={() => this.handleOnClick(item)}
              >
                {item.text}
              </List.Item>
            ))}
          </List>
        </Modal>
      </div>
    );
  };
}
