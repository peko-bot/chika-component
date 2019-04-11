import React, { Component } from 'react';
import { List, Button } from 'antd-mobile';
import { PropsGoToMaxBox } from './core';
import { bindTouchDirection } from '../../utils';
import Arrow from './DetailArrow';

export interface DetailFactoryProps {
  onPageChange: (status: string) => void;
  onBack: () => void;
  dataSource?: Array<any>;
  onDataFormat?: (value: string | number, item: any, bindKey: string) => void;
  onMapBoxChange?: (item: PropsGoToMaxBox) => void;
  currentOrder?: number;
  minPage?: number;
  maxPage?: number;
  showArrow?: boolean;
}

export default class DetailFactory extends Component<DetailFactoryProps> {
  content: HTMLDivElement;

  componentDidMount = () => {
    bindTouchDirection(this.content, direction => {
      const { onPageChange, currentOrder, minPage, maxPage } = this.props;
      switch (direction) {
        case 'toRight':
          if (currentOrder !== minPage) {
            if (onPageChange) {
              onPageChange('last');
            }
          }
          break;

        case 'toLeft':
          if (currentOrder !== maxPage) {
            if (onPageChange) {
              onPageChange('next');
            }
          }
          break;

        default:
          break;
      }
    });
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
            onClick={() => onMapBoxChange && onMapBoxChange(item)}
          >
            地址
          </List.Item>
        </React.Fragment>
      );
    }

    if (type === 'calendar') {
      return (
        <React.Fragment key={`detail-page-label-${index}`}>
          <List.Item
            extra={
              onDataFormat
                ? (onDataFormat(value[0], item, 'key') as any)
                : value
            }
          >
            {name + '开始时间'}
          </List.Item>
          <List.Item
            extra={
              onDataFormat
                ? (onDataFormat(value[1], item, 'key') as any)
                : value
            }
          >
            {name + '结束时间'}
          </List.Item>
        </React.Fragment>
      );
    }

    if (type !== 'mapPicker' && type !== 'upload') {
      return (
        <List.Item
          key={`detail-page-label-${index}`}
          extra={
            onDataFormat ? (onDataFormat(value, item, 'key') as any) : value
          }
        >
          {name}
        </List.Item>
      );
    }
    return null;
  };

  render = () => {
    const {
      onBack,
      dataSource = [],
      onPageChange,
      currentOrder,
      minPage,
      maxPage,
      showArrow,
    } = this.props;
    return (
      <div className="DetailFactory" ref={ref => ref && (this.content = ref)}>
        {showArrow && (
          <Arrow
            onClick={onPageChange}
            showLast={currentOrder !== minPage}
            showNext={currentOrder !== maxPage}
          />
        )}

        <List>
          <List.Item>
            {dataSource.map((item, i) => this.handleControls(item, i))}
          </List.Item>
          <List.Item>
            <Button onClick={onBack}>返回</Button>
          </List.Item>
        </List>
      </div>
    );
  };
}
