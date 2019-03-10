import React, { Component } from 'react';

import Drawer from '../../component/Drawer';

export default class DrawerDemo extends Component {
  state: { visible: boolean } = {
    visible: false,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  };

  onChange = (visible: boolean) => this.setState({ visible });

  render = () => {
    const { visible } = this.state;

    return (
      <div className="Drawer_demo">
        <Drawer visible={visible} onChange={this.onChange} direction="left">
          test
        </Drawer>
      </div>
    );
  };
}
