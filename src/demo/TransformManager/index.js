import React, { Component } from 'react';
import TransformManager, { Item } from '../../component/TransformManager';
import { Button } from 'antd-mobile';

export default class TransformManagerDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentOrder: 0,
    };
  }
  handleCurrentPosition = () => {
    let { currentOrder } = this.state;
    this.setState({ currentOrder: ++currentOrder });
  };

  render = () => {
    const { currentOrder } = this.state;
    return (
      <div className="TransformManagerDemo">
        <Button type="primary" onClick={this.handleCurrentPosition}>
          click
        </Button>
        <TransformManager currentGroup="group1" currentOrder={currentOrder}>
          <Item group="group1" order={0} key="group1-0">
            group1-0
          </Item>
          <Item group="group1" order={1} key="group1-1">
            group1-1
          </Item>
          <Item group="group1" order={2} key="group1-2">
            group1-2
          </Item>
          <Item group="group2" order={0} key="group2-0">
            group2-0
          </Item>
          <Item group="group2" order={1} key="group2-1">
            group2-1
          </Item>
          <Item group="group2" order={2} key="group2-2">
            group2-2
          </Item>
        </TransformManager>
      </div>
    );
  };
}
