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
    dataItem: PropTypes.array,
    onDataFormat: PropTypes.func,
  };

  static defaultProps = {
    controlType: '',
    onPageChange: noop,
    onBack: noop,
    dataItem: [],
    onDataFormat: function(value) {
      return value;
    },
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  handleControls = (item, index) => {
    const { onDataFormat } = this.props;
    const { type, value, name } = item;

    if (type !== 'upload' && type !== 'mapPicker') {
      return (
        <List.Item
          key={`detail-page-item-${index}`}
          extra={onDataFormat(value, item)}
        >
          {name}
        </List.Item>
      );
    }
    return null;
  };

  render = () => {
    const { onBack, dataItem } = this.props;
    return (
      <div className="DetailFactory">
        <List>
          {dataItem.map((item, i) => this.handleControls(item, i))}
          <List.Item>
            <Button onClick={onBack}>返回上级</Button>
          </List.Item>
        </List>
      </div>
    );
  };
}

export default createForm()(DetailFactory);
