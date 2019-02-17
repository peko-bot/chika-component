import React, { Component } from 'react';
import TransformManager, { Item } from '../../component/TransformManager';

export default class TransformManagerDemo extends Component {
  render = () => {
    return (
      <div className="TransformManagerDemo">
        <TransformManager currentGroup="group1" currentOrder={2}>
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
