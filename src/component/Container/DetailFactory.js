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

    if (type === 'mapPicker') {
      return (
        <React.Fragment key={`detail-page-map-picker-${index}`}>
          <List.Item extra={item.lng}>经度</List.Item>
          <List.Item extra={item.lat}>纬度</List.Item>
          <List.Item extra={item.address}>地址</List.Item>
        </React.Fragment>
      );
    }

    if (type !== 'mapPicker' && type !== 'upload') {
      return (
        <List.Item
          key={`detail-page-label-${index}`}
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
