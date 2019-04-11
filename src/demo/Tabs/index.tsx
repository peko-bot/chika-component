import React from 'react';

import Tabs from '../../component/Tabs';

export default class TabsDemo extends React.Component {
  state = {
    result: [],
    currentSelect: 1,
    labelText1: 9,
    labelText2: 8,
  };

  config = {
    // containerStyle: {background: '#F96'}
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        labelText1: '测试1',
        labelText2: '测试2',
      });
    }, 1000);
  };

  onClick = (_: any, currentSelect: number) => {
    this.setState({ currentSelect });
  };

  render() {
    const { currentSelect, labelText1, labelText2 } = this.state;

    return (
      <div className="Tabs_demo">
        <Tabs
          currentSelect={currentSelect}
          onClick={this.onClick}
          config={this.config}
        >
          <div data-label={`test1${labelText1}`}>test1</div>
          <div data-label={`test2${labelText2}`}>test2</div>
        </Tabs>
      </div>
    );
  }
}
