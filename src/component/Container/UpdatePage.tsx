import React, { Component } from 'react';
import {
  List,
  Button,
  InputItem,
  DatePicker,
  Picker,
  Accordion,
  Checkbox,
  Toast,
} from 'antd-mobile';
const { CheckboxItem } = Checkbox;
import Upload from './UploadWrapper';

export type UpdatePageStatus = 'add' | 'update';
export type ValidTypes = {
  maxLength: number | string;
  minLength: number | string;
  isNull: boolean;
};
export type ControlTypes =
  | 'input'
  | 'datePicker'
  | 'select'
  | 'checkbox'
  | 'calendar'
  | 'upload'
  | 'mapPicker'
  | 'label';
export type CheckItem = {
  error?: boolean;
  value?: string;
  message?: string;
};
export interface UpdatePageProps {
  onBack?: () => void;
  config: Array<any>;
  dataItem: any;
  status: UpdatePageStatus;
}
export interface UpdatePageState {
  [fieldName: string]: CheckItem;
}

function noop() {}

export default class UpdatePage extends Component<
  UpdatePageProps,
  UpdatePageState
> {
  static defaultProps = {
    onBack: noop,
    config: [],
    dataItem: {},
    status: 'add',
  };

  constructor(props: UpdatePageProps) {
    super(props);

    this.state = this.initDefaultValue(props.dataItem);
  }

  initDefaultValue = (dataItem: any) => {
    const result: UpdatePageState = {};
    for (let key in dataItem) {
      result[key] = {
        value: dataItem[key],
        error: false,
        message: '',
      };
    }
    return result;
  };

  validValue = (value: any, fieldName: string, rule: ValidTypes) => {
    // isNull = false => it shouldn't be null
    const { maxLength, minLength, isNull } = rule;
    if (!isNull && !value) {
      return { error: true, message: '该值不能为空' };
    }
    if (maxLength && value.toString().length > maxLength) {
      return {
        error: true,
        message: `不能超过${maxLength}个字符`,
      };
    }
    if (minLength && value.toString().length < minLength) {
      return {
        [fieldName]: {
          error: true,
          message: `不能少于${minLength}个字符`,
        },
      };
    }
    return {
      [fieldName]: {
        error: false,
        message: '',
      },
    };
  };

  checkValue = (
    value: any,
    type: ControlTypes,
    fieldName: string,
    rule: ValidTypes,
  ) => {
    let tip;
    switch (type) {
      case 'input':
        tip = this.validValue(value, fieldName, rule);
        break;

      case 'datePicker':
        tip = this.validValue(value, fieldName, rule);
        break;

      case 'select':
        tip = this.validValue(value, fieldName, rule);
        break;

      case 'checkbox':
        tip = this.validValue(value, fieldName, rule);
        break;

      default:
        break;
    }
    this.setState({ [fieldName]: { value, ...tip } });
  };

  renderEditItem = () => {
    const { props, state } = this;
    const { status, config } = props;
    const prefixCls = `update-page-${status}`;
    let element = [];
    for (let i = 0; i < config.length; i++) {
      const { type, name, key, foreignData } = config[i];
      const item = state[key];
      const value = status === 'add' ? '' : item.value;
      switch (type) {
        case 'input':
          element.push(
            <List.Item
              key={`${prefixCls}-input-item-${i}`}
              extra={
                <InputItem
                  clear
                  placeholder="请输入"
                  style={{ textAlign: 'right' }}
                  onErrorClick={() => Toast.fail(item.message)}
                  onChange={(value: string) =>
                    this.checkValue(value, type, key, config[i])
                  }
                  value={value}
                  error={item.error}
                />
              }
            >
              {name}
            </List.Item>,
          );
          break;

        case 'datePicker':
          element.push(
            <DatePicker
              key={`${prefixCls}-data-picker-${i}`}
              onChange={(value: Date) =>
                this.checkValue(value, type, key, config[i])
              }
              value={typeof value === 'string' ? new Date(value) : value}
            >
              <List.Item arrow="horizontal">{name}</List.Item>
            </DatePicker>,
          );
          break;

        case 'select':
          element.push(
            <Picker
              key={`${prefixCls}-select-${i}`}
              data={foreignData}
              cols={1}
              onChange={(value: any) =>
                this.checkValue(value[0], type, key, config[i])
              }
              value={value ? [value] : []}
            >
              <List.Item arrow="horizontal">{name}</List.Item>
            </Picker>,
          );
          break;

        case 'checkbox':
          element.push(
            <Accordion key={`${prefixCls}-checkbox-${i}`}>
              <Accordion.Panel header={name}>
                <List>
                  {foreignData.map(
                    (
                      item: { value: string | number; label: string },
                      i: number,
                    ) => (
                      <CheckboxItem
                        key={`${prefixCls}-checkbox-item-${i}`}
                        checked={value === item.value}
                        onChange={() =>
                          this.checkValue(item.value, type, key, config[i])
                        }
                      >
                        {item.label}
                      </CheckboxItem>
                    ),
                  )}
                </List>
              </Accordion.Panel>
            </Accordion>,
          );
          break;

        case 'calendar':
          element.push(
            <React.Fragment key={`${prefixCls}-calendar-${i}`}>
              <List.Item
                extra="请选择"
                arrow="horizontal"
                // onClick={() => this.setState({ calendarVisible: true })}
              >
                {name}
              </List.Item>
              <List.Item extra="起始时间">{name}起始时间</List.Item>
              <List.Item extra="结束时间">{name}结束时间</List.Item>
            </React.Fragment>,
          );
          break;

        case 'upload':
          element.push(
            <Accordion key={`${prefixCls}-upload-${i}`}>
              <Accordion.Panel header={name}>
                <Upload />
              </Accordion.Panel>
            </Accordion>,
          );
          break;

        case 'mapPicker':
          if (status === 'add') {
            element.push(
              <List.Item
                extra="请选择"
                key={`${prefixCls}-map-picker-add-${i}`}
                arrow="horizontal"
                // onClick={() => this.setState({ calendarVisible: true })}
              >
                {name}
              </List.Item>,
            );
          } else if (status === 'update') {
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-address-${i}`}
                arrow="horizontal"
                onClick={() => console.log('test')}
                extra="测试地址"
              >
                地址
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-lng-${i}`}
                extra={parseFloat('11').toFixed(6)}
              >
                经度
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-lat-${i}`}
                extra={parseFloat('22').toFixed(6)}
              >
                纬度
              </List.Item>,
            );
          }
          break;

        default:
          break;
      }
    }
    return element;
  };

  render = () => {
    const { onBack } = this.props;
    return (
      <List>
        {this.renderEditItem() as any}
        <List.Item>
          <Button
            type="primary"
            // onClick={this.save}
            inline
            style={{ marginRight: 4, width: 'calc(50% - 4px)' }}
          >
            保存
          </Button>
          <Button inline onClick={onBack} style={{ width: '50%' }}>
            返回
          </Button>
        </List.Item>
      </List>
    );
  };
}
