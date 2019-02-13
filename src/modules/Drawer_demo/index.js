import React, { Component } from 'react';

import Drawer from '../../component/Drawer';
// import Drawer from '../../../dist/lib/Drawer';

const defaultWidth = 400;

export default class DrawerDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
  };

  onChange = visible => this.setState({ visible });

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
