import React, { Component } from 'react';
import Container, { MapPickerChangeProps } from './core';
import { ajax } from '../../utils/urlHelper';
import { Toast } from 'antd-mobile';
import { formatConfig, formatControls } from './utils';

export interface DataControllerProps {
  children: any;
  tableId: number;
  menuId: number;
}
export type UpdatePageMapBoxItemProps = {
  lat: string;
  lng: string;
  key: string;
};
export interface DataControllerState {
  config: Array<any>;
  dataSource: Array<any>;
  total: number;
  primaryKey: string;
  loading: boolean;
  power: {
    select: boolean;
    delete: boolean;
    update: boolean;
    add: boolean;
  };
  updatePageMapBoxItem: UpdatePageMapBoxItemProps;
  updatePageForm: Array<any>;
}

export default class DataController extends Component<
  DataControllerProps,
  DataControllerState
> {
  state: DataControllerState = {
    config: [],
    dataSource: [],
    total: 0,
    power: {
      select: false,
      delete: false,
      update: false,
      add: false,
    },
    primaryKey: '',
    loading: false,
    updatePageMapBoxItem: { lng: '-1', lat: '-1', key: 'key' },
    updatePageForm: [],
  };

  static defaultProps = {
    children: null,
    tableId: -1,
    menuId: -1,
  };

  componentDidMount = () => {
    this.getConfig();
  };

  handlePowerStr = (power: string) => {
    let result = {
      select: false,
      delete: false,
      update: false,
      add: false,
    };
    for (let item of Array.from(power.split(','))) {
      switch (item) {
        case 'Select':
          result.select = true;
          break;

        case 'Add':
          result.add = true;
          break;

        case 'Del':
          result.delete = true;
          break;

        case 'Update':
          result.update = true;
          break;

        default:
          break;
      }
    }
    return result;
  };

  getConfig = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    const { tableId, menuId } = this.props;

    ajax({
      url: './assets/getConfig.json',
      data: { tableId, menuId },
      success: ({ data }) => {
        const primaryKey = this.getPrimaryKey(data.tablefieldconfig);
        this.setState({
          config: formatConfig(data.tablefieldconfig),
          power: this.handlePowerStr(data.power),
          primaryKey,
        });
        this.search();
      },
    });
  };

  getPrimaryKey = (data: any) => {
    const keyItem = data.filter((item: any) => item.iskey);
    if (!keyItem.length) {
      console.error('where is the primary key? please check.');
      return;
    }
    return keyItem[0]['fname'];
  };

  search = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    ajax({
      url: './assets/search.json',
      success: ({ data }) => {
        let dataSource: Array<any> = [];
        data.list.map((item: any, i: number) => {
          dataSource.push({
            ...item,
            templateOrder: i,
          });
        });
        this.setState({
          dataSource,
          total: data.recordcount,
          loading: false,
        });
      },
    });
  };

  handleDelete = (primaryValue: string | number) => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    ajax({
      url: './assets/operatedata.json',
      data: { id: primaryValue },
      success: ({ data }) => {
        if (data.result) {
          this.search();
        } else {
          this.setState({ loading: false });
          Toast.fail('保存失败：' + data.remark || '');
        }
      },
    });
  };

  handeMapPickerChange = ({
    primaryValue,
    targetKey,
    lng,
    lat,
  }: MapPickerChangeProps) => {
    const { dataSource, primaryKey } = this.state;
    if (!primaryValue) {
      this.setState({ updatePageMapBoxItem: { lat, lng, key: targetKey } });
    } else {
      const itemIndex = dataSource.findIndex(
        item => item[primaryKey] === primaryValue,
      );
      dataSource[itemIndex] = Object.assign({}, dataSource[itemIndex], {
        [targetKey]: `${lng}|${lat}|`,
      });
      this.setState({ dataSource });
    }
  };

  getUploadParam = (file: File) => {
    const param = new FormData();
    param.append('Filedata', file);
    param.append('Filename', file.name);
    param.append(
      'fileext',
      '*.' + file.name.split('.')[file.name.split('.').length - 1],
    );
    param.append('DataType', 'UploadFile');
    param.append('UploadFolder', '/Attachement/');
    param.append('IsConvertOffice', '');
    param.append('GetFileName', 'y');
    param.append('TCID', '');
    param.append('UploadTargetKey', 'n');
    param.append('GetFileInfo', 'y');
    return param;
  };

  handleSort = (dataSource: Array<any>) => {
    this.setState({ dataSource });
  };

  // todo: refactor this
  // combine dataSource and updatePageForm
  handleUpdatePageChange = (updatePageForm: Array<any>) => {
    const { updatePageMapBoxItem: mapItem } = this.state;
    const index = updatePageForm.findIndex(f => f.key === mapItem.key);
    if (index !== -1) {
      updatePageForm[index] = Object.assign({}, updatePageForm[index], mapItem);
      updatePageForm[index].value = `${mapItem.lng}|${mapItem.lat}|`;
    }
    this.setState({ updatePageForm });
  };

  handleUpdatePageSave = (updatePageForm: Array<any>) => {
    console.log(updatePageForm);
  };

  render = () => {
    const {
      power,
      config,
      dataSource,
      loading,
      total,
      primaryKey,
      updatePageMapBoxItem,
      updatePageForm,
    } = this.state;
    return (
      <div className="DataController">
        <Container
          {...this.props}
          power={power}
          config={config}
          dataSource={dataSource}
          total={total}
          primaryKey={primaryKey}
          loading={loading}
          onSearch={this.search}
          onDelete={this.handleDelete}
          formatControls={formatControls as any}
          onMapPickerChange={this.handeMapPickerChange}
          updatePageMapBoxItem={updatePageMapBoxItem}
          updatePageForm={updatePageForm}
          updatePageChange={this.handleUpdatePageChange}
          updatePageSave={this.handleUpdatePageSave}
          onSort={this.handleSort}
        />
      </div>
    );
  };
}
