import React from 'react';

import Button from '../../component/Button';

export default class ButtonDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  onChange = e => {
    // eslint-disable-next-line
    console.log(e);
  };

  render() {
    return (
      <div className="Button_demo">
        <Button
          type="primary"
          onChange={this.onChange}
          style={{ height: 35, width: 200 }}
        >
          测试文字
        </Button>
      </div>
    );
  }
}
