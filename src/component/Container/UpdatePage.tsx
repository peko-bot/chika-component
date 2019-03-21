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
  Calendar,
} from 'antd-mobile';
const { CheckboxItem } = Checkbox;
import Upload from './UploadWrapper';
import { formatDate } from '../../util';
import { PropsGoToMaxBox } from './core';

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
export type Form = {
  [fieldName: string]: CheckItem;
};
export interface UpdatePageProps {
  onBack?: () => void;
  config: Array<any>;
  dataItem: any;
  status: UpdatePageStatus;
  onMapBoxChange?: (item: PropsGoToMaxBox) => void;
}
export type CalendarItem = {
  calendarVisible: boolean;
  currentCalendarItem: {
    key: string;
    config: any;
  };
};
export type UpdatePageState = {
  form: Form;
} & CalendarItem;

const CalendarDefaultValue: CalendarItem = {
  calendarVisible: false,
  currentCalendarItem: {
    key: '',
    config: {},
  },
};

export default class UpdatePage extends Component<
  UpdatePageProps,
  UpdatePageState
> {
  constructor(props: UpdatePageProps) {
    super(props);

    this.state = {
      ...CalendarDefaultValue,
      // form: this.initDefaultValue(props.dataItem),
      form: {},
    };
  }

  initDefaultValue = (dataItem: any) => {
    const result: Form = {};
    for (let key in dataItem) {
      result[key] = {
        value: dataItem[key],
        error: false,
        message: '',
      };
    }
    return result;
  };

  validValue = (value: any, rule: ValidTypes) => {
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
        error: true,
        message: `不能少于${minLength}个字符`,
      };
    }
    return {
      error: false,
      message: '',
    };
  };

  checkValue = (
    value: any,
    type: ControlTypes,
    fieldName: string,
    rule: ValidTypes,
  ) => {
    let tip = {};
    let rest = {};
    switch (type) {
      case 'checkbox':
        let stateValue = this.state.form[fieldName].value;
        let checkboxSet = new Set();
        if (stateValue) {
          checkboxSet = new Set(stateValue.split(','));
          checkboxSet.has(value)
            ? checkboxSet.delete(value)
            : checkboxSet.add(value);
        } else {
          checkboxSet.add(value);
        }
        value = [...checkboxSet].toString();
        break;

      case 'calendar':
        const { startDateTime, endDateTime } = value;
        value = `${formatDate(startDateTime)},${formatDate(endDateTime)}`;
        rest = CalendarDefaultValue;
        break;

      default:
        tip = this.validValue(value, rule);
        break;
    }

    const form = Object.assign(this.state.form, {
      [fieldName]: { value, ...tip },
    });
    this.setState({
      form,
      ...rest,
    });
  };

  renderEditItem = () => {
    const { props, state } = this;
    const { status, config, onMapBoxChange } = props;
    const prefixCls = `update-page-${status}`;
    let element = [];
    for (let i = 0; i < config.length; i++) {
      const { type, name, key, foreignData } = config[i];
      let item: CheckItem = { message: '', value: '', error: false };
      if (state.form[key]) {
        item = state.form[key];
      }
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
                  value={item.value}
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
              value={item.value ? new Date(item.value) : new Date()}
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
              value={item.value ? [item.value] : []}
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
                    (item: { value: string; label: string }, i: number) => {
                      const stateValue =
                        (item.value && item.value.split(',')) || [];
                      return (
                        <CheckboxItem
                          key={`${prefixCls}-checkbox-item-${i}`}
                          checked={stateValue.includes(item.value)}
                          onChange={() =>
                            this.checkValue(item.value, type, key, config[i])
                          }
                        >
                          {item.label}
                        </CheckboxItem>
                      );
                    },
                  )}
                </List>
              </Accordion.Panel>
            </Accordion>,
          );
          break;

        case 'calendar':
          const dateArr = (item.value && item.value.split(',')) || ['', ''];
          element.push(
            <React.Fragment key={`${prefixCls}-calendar-${i}`}>
              <List.Item
                extra={dateArr[0] ? '' : '请选择'}
                arrow="horizontal"
                onClick={() =>
                  this.setState({
                    calendarVisible: true,
                    currentCalendarItem: { type, key, config: config[i] },
                  })
                }
              >
                {name}
              </List.Item>
              <List.Item extra={dateArr[0]}>起始时间</List.Item>
              <List.Item extra={dateArr[1]}>结束时间</List.Item>
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
            const latlng = (item.value && item.value.split('|')) || [];
            const lng = latlng[0];
            const lat = latlng[1];
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-address-${i}`}
                arrow="horizontal"
                onClick={() =>
                  onMapBoxChange && onMapBoxChange({ lat, lng, key })
                }
                extra={latlng.length > 2 ? latlng[2] : '查看'}
              >
                地址
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-lng-${i}`}
                extra={parseFloat(lng).toFixed(6)}
              >
                经度
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-lat-${i}`}
                extra={parseFloat(lat).toFixed(6)}
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
    const { calendarVisible, currentCalendarItem } = this.state;
    return (
      <>
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
        <Calendar
          visible={calendarVisible}
          onCancel={() => {
            this.setState({ calendarVisible: false });
          }}
          pickTime
          onConfirm={(startDateTime: Date, endDateTime: Date) =>
            this.checkValue(
              { startDateTime, endDateTime },
              'calendar',
              currentCalendarItem.key,
              currentCalendarItem.config,
            )
          }
        />
      </>
    );
  };
}
