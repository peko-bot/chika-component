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

  validValue = (
    value: string | number,
    fieldName: string,
    rule: ValidTypes,
  ) => {
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
  };

  checkValue = (
    value: string,
    type: ControlTypes,
    fieldName: string,
    rule: ValidTypes,
  ) => {
    let tip;
    switch (type) {
      case 'input':
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
    const preClass = `update-page-${status}`;
    let element = [];
    for (let i = 0; i < config.length; i++) {
      const { type, name, key } = config[i];
      const item = state[key];
      const value = status === 'add' ? '' : item.value;
      const commonProps = {
        onErrorClick: () => Toast.fail(item.message),
        onChange: (value: string) =>
          this.checkValue(value, type, key, config[i]),
        value,
        error: item.error,
      };
      switch (type) {
        case 'input':
          element.push(
            <List.Item
              key={`${preClass}-input-item-${i}`}
              extra={
                <InputItem
                  clear
                  placeholder="请输入"
                  style={{ textAlign: 'right' }}
                  {...commonProps}
                />
              }
            >
              {name}
            </List.Item>,
          );
          break;

        case 'datePicker':
          element.push(
            <DatePicker key={`${preClass}-data-picker-${i}`}>
              <List.Item arrow="horizontal">{name}</List.Item>
            </DatePicker>,
          );
          break;

        case 'select':
          element.push(
            <Picker key={`${preClass}-select-${i}`} data={[]}>
              <List.Item arrow="horizontal">{name}</List.Item>
            </Picker>,
          );
          break;

        // foreigndata
        case 'checkbox':
          element.push(
            <Accordion key={`${preClass}-checkbox-${i}`}>
              <Accordion.Panel header={name}>
                <List>
                  {[].map((item: { value: string | number; label: string }) => (
                    <CheckboxItem
                      // onChange={value =>
                      //   this.handleCheckbox(item.value, 'searchParam', fname)
                      // }
                      key={item.value}
                    >
                      {item.label}
                    </CheckboxItem>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion>,
          );
          break;

        case 'calendar':
          element.push(
            <React.Fragment key={`${preClass}-calendar-${i}`}>
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
            <Accordion key={`${preClass}-upload-${i}`}>
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
                key={`${preClass}-map-picker-add-${i}`}
                arrow="horizontal"
                // onClick={() => this.setState({ calendarVisible: true })}
              >
                {name}
              </List.Item>,
            );
          } else if (status === 'update') {
            element.push(
              <List.Item
                key={`${preClass}-map-picker-address-${i}`}
                arrow="horizontal"
                onClick={() => console.log('test')}
                extra="测试地址"
              >
                地址
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${preClass}-map-picker-lng-${i}`}
                extra={parseFloat('11').toFixed(6)}
              >
                经度
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${preClass}-map-picker-lat-${i}`}
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
