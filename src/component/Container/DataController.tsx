import React, { Component } from 'react';
import Container from './core';
import { ajax } from '../../util/urlHelper';
import { Toast } from 'antd-mobile';

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
          config: data.tablefieldconfig,
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
      url: '../../mock/search.json',
      // params: {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   mode: 'cors',
      // },
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

  formatControls = (dataItem: any, configs: Array<any>) => {
    let result = [];
    const keys = Object.keys(dataItem);
    for (let item of keys) {
      const targetItem = configs.filter(target => target.fname === item);
      if (targetItem.length) {
        const {
          fname,
          controltype,
          dateformat,
          unit,
          fvalue,
          isvisiable,
          decimalcount,
        } = targetItem[0];
        if (!isvisiable) continue;

        let type = (controlTypeEnums as any)[controltype];
        let value = dataItem[fname];
        const item = {
          type,
          key: fname,
          name: fvalue,
          value,
          dateFormat: dateformat,
          decimalCount: decimalcount,
          unit,
          templateOrder: dataItem.templateOrder,
          // when mapPicker change, dataSource will change target
          // item by this.
          primaryValue: dataItem[this.state.primaryKey],
        };

        // handle with mapPicker
        if (controltype === 14) {
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

  handeMapPickerChange = (dataItem: any) => {
    // eslint-disable-next-line
    console.log(dataItem);
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
          onDelete={this.handleDelete}
          formatControls={this.formatControls}
          onMapPickerChange={this.handeMapPickerChange}
        />
      </div>
    );
  };
}

const controlTypeEnums = {
  1: 'input',
  2: 'timePicker',
  3: 'select',
  5: 'checkbox',
  9: 'datePicker',
  12: 'upload',
  14: 'mapPicker',
  99: 'label',
};
