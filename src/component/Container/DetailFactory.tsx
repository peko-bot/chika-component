import React, { Component } from 'react';
import { List, Button } from 'antd-mobile';

function noop() {}

export interface DetailFactoryProps {
  controlType: string;
  onPageChange: () => void;
  onBack: () => void;
  dataItem?: Array<any>;
  onDataFormat: (value: string | number, item: any) => void;
  onMapBoxChange: (item: {
    lat: string;
    lng: string;
    primaryValue: string;
  }) => void;
}

export default class DetailFactory extends Component<DetailFactoryProps> {
  static defaultProps = {
    controlType: '',
    onPageChange: noop,
    onBack: noop,
    dataItem: [],
    onDataFormat: (value: any) => value,
    onMapBoxChange: noop,
  };

  handleControls = (item: any, index: number) => {
    const { onDataFormat, onMapBoxChange } = this.props;
    const { type, value, name } = item;

    if (type === 'mapPicker') {
      return (
        <React.Fragment key={`detail-page-map-picker-${index}`}>
          <List.Item extra={item.lng}>经度</List.Item>
          <List.Item extra={item.lat}>纬度</List.Item>
          <List.Item
            extra={item.address}
            arrow="horizontal"
            onClick={() => onMapBoxChange(item)}
          >
            地址
          </List.Item>
        </React.Fragment>
      );
    }

    if (type !== 'mapPicker' && type !== 'upload') {
      return (
        <List.Item
          key={`detail-page-label-${index}`}
          extra={onDataFormat(value, item) as any}
        >
          {name}
        </List.Item>
      );
    }
    return null;
  };

  render = () => {
    const { onBack, dataItem = [] } = this.props;
    return (
      <div className="DetailFactory">
        <List>
          <List.Item>
            {dataItem.map((item, i) => this.handleControls(item, i))}
          </List.Item>
          <List.Item>
            <Button onClick={onBack}>返回</Button>
          </List.Item>
        </List>
      </div>
    );
  };
}
