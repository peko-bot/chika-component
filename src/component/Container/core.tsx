import React, { Component } from 'react';
import { Modal, ActivityIndicator, List, Button } from 'antd-mobile';
const { alert, operation } = Modal;
import Template from '../Template';
import TransformManager, { TransformManagerItem } from '../TransformManager';
import DetailFactory from './DetailFactory';
import UpdatePage, { UpdatePageStatus } from './UpdatePage';
import { MapBox } from '../MapBox';
import { formatDate } from '../../util';
import { updatePageMapBoxOnAddProps } from './DataController';
import './css/Container-core.css';

type GroupType = 'list-page' | 'update-page' | 'detail-page' | 'map-box';
export type PropsGoToMaxBox = {
  lat: string;
  lng: string;
  primaryValue?: string;
  key?: string;
};
export type MapPickerChangeProps = {
  lat: string;
  lng: string;
  primaryValue: string | number | null;
  targetKey: string;
};
export interface ContainerCoreProps {
  power: any;
  config: Array<any>;
  dataSource: Array<any>;
  total?: number;
  loading?: boolean;
  primaryKey: string;
  onDelete?: (primaryValue: string | number) => void;
  onSearch?: () => void;
  formatControls: (item: any, config: any, primaryKey: string) => void;
  onMapPickerChange?: (item: MapPickerChangeProps) => void;
  updatePageMapBoxOnAdd?: updatePageMapBoxOnAddProps;
}
export interface ContainerCoreState {
  currentOrder: number;
  currentGroup: GroupType;
  lng: string;
  lat: string;
  primaryValue: string | number;
  currentState: number;
  updatePageStatus: UpdatePageStatus;
  mapBoxTargetKey: string;
}

export default class ContainerCore extends Component<
  ContainerCoreProps,
  ContainerCoreState
> {
  content: any;
  state: ContainerCoreState = {
    currentOrder: 0,
    currentGroup: 'list-page',
    // for mapPicker
    lng: '-1',
    lat: '-1',
    primaryValue: '',
    currentState: 0,
    updatePageStatus: 'add',
    mapBoxTargetKey: '',
  };

  history: {
    group: GroupType;
    order: number;
  } = {
    group: 'list-page',
    order: -1,
  };

  backToList = () => {
    if (this.props.onSearch) {
      this.props.onSearch();
    }
    this.setState({ currentGroup: 'list-page', currentOrder: 0 });
  };

  handleDelete = (primaryValue: string | number) => {
    alert('长痛不如短痛，删tm的', '真删了啊？', [
      { text: '容朕三思' },
      {
        text: '真的',
        onPress: () => {
          if (this.props.onDelete) {
            this.props.onDelete(primaryValue);
          }
        },
      },
    ]);
  };

  handleTemplateClick = ({
    templateOrder,
  }: {
    templateOrder: number;
    childProps?: any;
    event?: any;
  }) => {
    this.setState({ currentOrder: templateOrder, currentGroup: 'detail-page' });
  };

  // show Modal for operation
  handleTemplatePress = (dataItem: any) => {
    const { primaryKey, power } = this.props;
    const { add, delete: del, update, select } = power;
    const primaryValue = dataItem[primaryKey || ''];
    let param = [];

    if (!select) {
      return;
    }

    if (add) {
      param.push({
        text: '新增',
        onPress: () =>
          this.setState({
            currentGroup: 'update-page',
            currentOrder: 0,
            primaryValue,
            updatePageStatus: 'add',
          }),
      });
    }

    if (update) {
      param.push({
        text: '修改',
        onPress: () => {
          this.setState({
            currentGroup: 'update-page',
            currentOrder: 0,
            primaryValue,
            updatePageStatus: 'update',
          });
        },
      });
    }

    if (del) {
      param.push({
        text: '删除',
        onPress: () => this.handleDelete(primaryValue),
      });
    }
    param.length !== 0 && operation(param);
  };

  handleChildDataFormat = (
    value: string | number | Date,
    childProps: any,
    bindKey: string,
  ) => {
    for (let item of this.props.config) {
      const { key, unit, decimalCount, dateFormat } = item;
      if (key === childProps[bindKey]) {
        if (value instanceof Date) {
          value = formatDate(value, dateFormat);
        }
        if (decimalCount) {
          value = +parseFloat(
            parseFloat(value.toString()).toFixed(decimalCount),
          ).toPrecision(12);
        }
        if (unit) {
          value = `${value} ${unit}`;
        }
      }
    }
    return value;
  };

  onDetailPageChange = (status: string) => {
    let currentOrder = this.state.currentOrder;
    switch (status) {
      case 'last':
        currentOrder--;
        break;

      case 'next':
        currentOrder++;
        break;

      default:
        break;
    }
    this.setState({ currentGroup: 'detail-page', currentOrder });
  };

  renderDetailPage = () => {
    const { config, formatControls, primaryKey, dataSource } = this.props;
    let result: Array<any> = [];
    dataSource.map((item, i) => {
      const dataItem = formatControls(item, config, primaryKey);
      result.push(
        <TransformManagerItem
          group="detail-page"
          order={i}
          key={`detail-page-${i}`}
        >
          <DetailFactory
            onBack={this.backToList}
            currentOrder={this.state.currentOrder}
            minPage={0}
            maxPage={dataSource.length - 1}
            onPageChange={this.onDetailPageChange}
            dataSource={dataItem as any}
            onDataFormat={this.handleChildDataFormat as any}
            onMapBoxChange={this.handleMapBoxChange}
          />
        </TransformManagerItem>,
      );
    });
    return result;
  };

  handleMapBoxChange = ({ lat, lng, key }: PropsGoToMaxBox) => {
    const { currentGroup, currentOrder } = this.state;
    // record position, for going back
    this.history = {
      group: currentGroup,
      order: currentOrder,
    };

    this.setState({
      currentGroup: 'map-box',
      currentOrder: 0,
      lat,
      lng,
      mapBoxTargetKey: key || '',
    });
  };

  handleBackFromMapBox = () => {
    const { group, order } = this.history;
    const {
      primaryValue,
      mapBoxTargetKey,
      lat,
      lng,
      updatePageStatus,
    } = this.state;
    const { onMapPickerChange } = this.props;

    onMapPickerChange &&
      onMapPickerChange({
        lat: lat.toString(),
        lng: lng.toString(),
        primaryValue: updatePageStatus === 'add' ? null : primaryValue,
        targetKey: mapBoxTargetKey,
      });
    this.setState(
      {
        currentGroup: group,
        currentOrder: order,
      },
      () => {
        this.history = {
          group: 'list-page',
          order: -1,
        };
      },
    );
  };

  renderTemplate = () => {
    const { children, dataSource } = this.props;
    return (
      <TransformManagerItem group="list-page" order={0} key="list-page-0">
        <div className="sc-content" ref={(ref: any) => (this.content = ref)}>
          <Template
            template={children}
            dataSource={dataSource}
            onDataFormat={this.handleChildDataFormat}
            onClick={this.handleTemplateClick}
            onPress={this.handleTemplatePress}
          />
        </div>
      </TransformManagerItem>
    );
  };

  renderUpdatePage = () => {
    const {
      config,
      dataSource,
      primaryKey,
      formatControls,
      updatePageMapBoxOnAdd,
    } = this.props;
    const { primaryValue, updatePageStatus } = this.state;
    const dataItemIndex = dataSource.findIndex(
      item => item[primaryKey] === primaryValue,
    );
    const dataItem =
      updatePageStatus === 'add'
        ? formatControls(null, config, primaryKey)
        : formatControls(dataSource[dataItemIndex], config, primaryKey);
    return (
      <TransformManagerItem group="update-page" order={0} key="update-page-0">
        <UpdatePage
          onBack={this.backToList}
          dataSource={dataItem as any}
          status={updatePageStatus}
          onMapBoxChange={this.handleMapBoxChange}
          updatePageMapBoxOnAdd={updatePageMapBoxOnAdd}
        />
      </TransformManagerItem>
    );
  };

  renderMapBox = () => {
    const { lat, lng } = this.state;
    return (
      <TransformManagerItem group="map-box" order={0} key="map-box-0">
        <MapBox
          center={{ lat, lng }}
          onMarkerDrag={({ lat, lng }) => {
            this.setState({ lat: lat.toString(), lng: lng.toString() });
          }}
        />
        <List
          renderHeader="坐标信息"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            zIndex: 400,
          }}
        >
          <List.Item extra={lng}>经度</List.Item>
          <List.Item extra={lat}>纬度</List.Item>
          <List.Item>
            <Button onClick={this.handleBackFromMapBox}>返回</Button>
          </List.Item>
        </List>
      </TransformManagerItem>
    );
  };

  render = () => {
    const { state, props } = this;
    const { currentOrder, currentGroup } = state;

    return (
      <div className="Container-core">
        <TransformManager
          currentGroup={currentGroup}
          currentOrder={currentOrder}
        >
          {this.renderTemplate()}
          {this.renderDetailPage()}
          {this.renderUpdatePage()}
          {this.renderMapBox()}
        </TransformManager>

        <ActivityIndicator
          animating={props.loading}
          text="正在加载..."
          toast
          size="large"
        />
      </div>
    );
  };
}
