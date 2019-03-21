import React, { Component } from 'react';
import Container, { MapPickerChangeProps } from './core';
import { ajax } from '../../util/urlHelper';
import { Toast } from 'antd-mobile';
import { formatDate } from '../../util';

export interface DataControllerProps {
  children: any;
  tableId: number;
  menuId: number;
}
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
      url: '../../mock/getConfig.json',
      data: { tableId, menuId },
      success: ({ data }) => {
        const primaryKey = this.getPrimaryKey(data.tablefieldconfig);
        this.setState({
          config: this.formatConfig(data.tablefieldconfig),
          power: this.handlePowerStr(data.power),
          primaryKey,
        });
        this.search();
      },
    });
  };

  formatConfig = (config: Array<any>) => {
    let result: any = [];
    for (let item of config) {
      const {
        fname,
        controltype,
        fvalue,
        isvisiable,
        isadd,
        defaultvalue,
        editpageorderid,
        isnull,
        issearchfield,
        maxlen,
        minlen,
        foreigndata,
      } = item;
      result.push({
        type: (controlTypeEnums as any)[controltype],
        key: fname,
        name: fvalue,
        showInEdit: isadd,
        showInDetail: isvisiable,
        defaultValue: defaultvalue,
        orderInEdit: editpageorderid,
        orderInDetail: editpageorderid,
        isNull: isnull,
        isSearchItem: issearchfield,
        maxLength: maxlen,
        minLength: minlen,
        foreignData: foreigndata,
      });
    }
    return result;
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
      url: '../../mock/search.json',
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
      url: '../../mock/operatedata.json',
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

  formatControls = (dataItem: any, config: Array<any>) => {
    let result = [];
    const keys = Object.keys(dataItem);
    for (let item of keys) {
      const targetItem = config.filter(target => target.key === item);
      if (targetItem.length) {
        const { key, showInDetail, type } = targetItem[0];
        if (!showInDetail) continue;
        const value = dataItem[key];
        const item = {
          ...targetItem[0],
          value: dataItem[key],
          templateOrder: dataItem.templateOrder,
          // when mapPicker change, dataSource will change target item by this.
          primaryValue: dataItem[this.state.primaryKey],
        };

        // handle with mapPicker
        if (type === 'mapPicker') {
          const latng = value.split('|');
          result.push({
            ...item,
            lng: latng[0],
            lat: latng[1],
            address: latng[2],
          });
        } else {
          result.push(item);
        }
      }
    }
    return result;
  };

  handeMapPickerChange = ({
    primaryValue,
    targetKey,
    lng,
    lat,
  }: MapPickerChangeProps) => {
    const { dataSource, primaryKey } = this.state;
    const itemIndex = dataSource.findIndex(
      item => item[primaryKey] === primaryValue,
    );
    dataSource[itemIndex][targetKey] = `${lng}|${lat}|`;
    this.setState({ dataSource });
  };

  render = () => {
    const {
      power,
      config,
      dataSource,
      loading,
      total,
      primaryKey,
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
          formatControls={this.formatControls}
          onMapPickerChange={this.handeMapPickerChange}
          defaultDataFormatEnum={defaultDataFormatEnum}
        />
      </div>
    );
  };
}

const controlTypeEnums = {
  1: 'input',
  2: 'datePicker',
  3: 'select',
  5: 'checkbox',
  9: 'calendar',
  12: 'upload',
  14: 'mapPicker',
  99: 'label',
};

const defaultDataFormatEnum = [
  {
    key: 'data-date-format',
    method: (value: string, format: string) => formatDate(value, format),
  },
  {
    key: 'data-decimal-count',
    method: (value: number, decimalCount: number) =>
      +parseFloat(value.toFixed(decimalCount)).toPrecision(12),
  },
  {
    key: 'data-unit',
    method: (value: number | string, unit: string) => `${value} ${unit}`,
  },
];
