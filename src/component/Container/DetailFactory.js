import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import { List, Button } from 'antd-mobile';

function noop() {}
class DetailFactory extends Component {
  static propTypes = {
    controlType: PropTypes.string,
    onPageChange: PropTypes.func,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    controlType: '',
    onPageChange: noop,
    onBack: noop,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  render = () => {
    const { onBack } = this.props;
    return (
      <div className="DetailFactory">
        <List>
          <List.Item>
            <Button onClick={onBack}>返回上级</Button>
          </List.Item>
        </List>
      </div>
    );
  };
}

export default createForm()(DetailFactory);
