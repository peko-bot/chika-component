import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './core';
import { ajax } from '../../util/urlHelper';
import { Toast } from 'antd-mobile';

export default class DataController extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    tableId: PropTypes.number.isRequired,
    menuId: PropTypes.number,
  };

  static defaultProps = {
    children: null,
    tableId: -1,
    menuId: -1,
  };

  constructor(props) {
    super(props);

    this.state = {
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
  }

  componentDidMount = () => {
    this.getConfig();
  };

  handlePowerStr = power => {
    let result = {};
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

  getPrimaryKey = data => {
    const keyItem = data.filter(item => item.iskey);
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
        this.setState({
          dataSource: data.list,
          total: data.recordcount,
          loading: false,
        });
      },
    });
  };

  handleDelete = primaryValue => {
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

  formatControls = (dataItem, configs) => {
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

        result.push({
          type: controlTypeEnums[controltype],
          key: fname,
          name: fvalue,
          value: dataItem[fname],
          dateFormat: dateformat,
          decimalCount: decimalcount,
          unit,
        });
      }
    }
    return result;
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
