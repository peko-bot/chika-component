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
import Upload from '../Upload';
import { formatDate } from '../../utils';
import { PropsGoToMaxBox } from './core';
import { UpdatePageMapBoxItemProps } from './DataController';
import { simplifyFormDatas } from './utils';

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
export interface UpdatePageProps {
  onBack?: () => void;
  dataSource: Array<any>;
  status: UpdatePageStatus;
  onMapBoxChange?: (item: PropsGoToMaxBox) => void;
  updatePageMapBoxItem?: UpdatePageMapBoxItemProps;
  onFormChange?: (form: Array<any>, status?: UpdatePageStatus) => void;
  updatePageForm?: Array<any>;
  updatePageSave?: (form: Array<any>) => void;
}
export type CalendarItem = {
  calendarVisible: boolean;
  currentCalendarItem: {
    key: string;
    config: any;
    type?: string;
  };
};
export type UpdatePageState = {
  form: Array<any>;
} & CalendarItem;

export const CalendarDefaultValue: CalendarItem = {
  calendarVisible: false,
  currentCalendarItem: {
    key: '',
    config: {},
    type: '',
  },
};

export default class UpdatePage extends Component<
  UpdatePageProps,
  UpdatePageState
> {
  static getDerivedStateFromProps(prevProps: UpdatePageProps) {
    if (prevProps.status === 'add') {
      if (prevProps.updatePageForm && prevProps.updatePageForm.length !== 0) {
        return { form: prevProps.updatePageForm };
      }
    }
    return null;
  }

  constructor(props: UpdatePageProps) {
    super(props);

    this.state = {
      ...CalendarDefaultValue,
      form: this.initDefaultValue(props.dataSource),
    };
  }

  componentDidUpdate() {
    const { props, state } = this;

    if (
      simplifyFormDatas(props.updatePageForm || []) !==
      simplifyFormDatas(state.form)
    ) {
      if (props.onFormChange) {
        props.onFormChange(state.form);
      }
    }
  }

  initDefaultValue = (dataSource: any) => {
    for (const item of dataSource) {
      item.error = false;
      item.message = '';
    }
    return dataSource;
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

  checkValue = (value: any, item: any) => {
    const { type } = item;
    let tip = {};
    let rest = {};
    const index = this.state.form.findIndex(f => f.key === item.key);
    switch (type) {
      case 'checkbox':
        let stateValue;
        stateValue = this.state.form[index].value || '';
        let checkboxSet = new Set();
        if (stateValue) {
          checkboxSet = new Set(stateValue.split(','));
          checkboxSet.has(value)
            ? checkboxSet.delete(value)
            : checkboxSet.add(value);
        } else {
          checkboxSet.add(value);
        }
        value = Array.from(checkboxSet).toString();
        break;

      case 'calendar':
        const { startDateTime, endDateTime } = value;
        value = [formatDate(startDateTime), formatDate(endDateTime)];
        rest = CalendarDefaultValue;
        break;

      case 'upload':
        const fileList = this.state.form[index].value || [];
        fileList.push({
          url: value.url,
          id: value.id,
          name: value.name,
        });
        value = fileList;
        break;

      default:
        tip = this.validValue(value, item);
        break;
    }

    this.state.form[index] = Object.assign(this.state.form[index], {
      value,
      ...tip,
    });
    this.setState({
      form: this.state.form,
      ...rest,
    });
  };

  renderEditItem = () => {
    const { props, state } = this;
    const {
      status,
      onMapBoxChange,
      updatePageMapBoxItem,
      onFormChange,
    } = props;
    const prefixCls = `update-page-${status}`;
    const element = [];
    for (const item of state.form) {
      const { type, name, key, foreignData, id } = item;
      switch (type) {
        case 'input':
          element.push(
            <List.Item
              key={`${prefixCls}-input-item-${id}`}
              extra={
                <InputItem
                  clear
                  placeholder="请输入"
                  style={{ textAlign: 'right' }}
                  onErrorClick={() => Toast.fail(item.message)}
                  onChange={(value: string) => this.checkValue(value, item)}
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
              key={`${prefixCls}-data-picker-${id}`}
              onChange={(value: Date) => this.checkValue(value, item)}
              value={item.value}
            >
              <List.Item arrow="horizontal">{name}</List.Item>
            </DatePicker>,
          );
          break;

        case 'select':
          element.push(
            <Picker
              key={`${prefixCls}-select-${id}`}
              data={foreignData}
              cols={1}
              onChange={(value: any) => this.checkValue(value[0], item)}
              value={item.value ? [item.value] : []}
            >
              <List.Item arrow="horizontal">{name}</List.Item>
            </Picker>,
          );
          break;

        case 'checkbox':
          element.push(
            <Accordion key={`${prefixCls}-checkbox-${id}`}>
              <Accordion.Panel header={name}>
                <List>
                  {foreignData.map(
                    (
                      checkboxItem: { value: string; label: string },
                      i: number,
                    ) => {
                      const stateValue =
                        (item.value && item.value.split(',')) || [];
                      return (
                        <CheckboxItem
                          key={`${prefixCls}-checkbox-item-${i}`}
                          checked={stateValue.includes(checkboxItem.value)}
                          onChange={() =>
                            this.checkValue(checkboxItem.value, item)
                          }
                        >
                          {checkboxItem.label}
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
          element.push(
            <React.Fragment key={`${prefixCls}-calendar-${id}`}>
              <List.Item
                extra={item.value[0] ? '' : '请选择'}
                arrow="horizontal"
                onClick={() =>
                  this.setState({
                    calendarVisible: true,
                    currentCalendarItem: { type, key, config: item },
                  })
                }
              >
                {name}
              </List.Item>
              <List.Item extra={item.value[0]}>起始时间</List.Item>
              <List.Item extra={item.value[1]}>结束时间</List.Item>
            </React.Fragment>,
          );
          break;

        case 'upload':
          element.push(
            <Accordion key={`${prefixCls}-upload-${id}`}>
              <Accordion.Panel header={name}>
                <Upload
                  fileList={item.value as any}
                  onChange={file => this.checkValue(file, item)}
                />
              </Accordion.Panel>
            </Accordion>,
          );
          break;

        case 'mapPicker':
          const latlng = (item.value && item.value.split('|')) || [];
          const lng =
            updatePageMapBoxItem && updatePageMapBoxItem.lng !== '-1'
              ? updatePageMapBoxItem.lng
              : latlng[0];
          const lat =
            updatePageMapBoxItem && updatePageMapBoxItem.lng !== '-1'
              ? updatePageMapBoxItem.lng
              : latlng[1];
          if (status === 'add') {
            if (
              updatePageMapBoxItem &&
              Object.keys(updatePageMapBoxItem).length
            ) {
              element.push(
                <List.Item
                  key={`${prefixCls}-map-picker-address-${id}`}
                  arrow="horizontal"
                  onClick={() => {
                    if (onFormChange) {
                      onFormChange(state.form);
                    }
                    if (onMapBoxChange) {
                      onMapBoxChange({ lat, lng, key });
                    }
                  }}
                  extra="修改"
                >
                  地址
                </List.Item>,
              );
              element.push(
                <List.Item
                  key={`${prefixCls}-map-picker-lng-${id}`}
                  extra={parseFloat(updatePageMapBoxItem.lng).toFixed(6)}
                >
                  经度
                </List.Item>,
              );
              element.push(
                <List.Item
                  key={`${prefixCls}-map-picker-lat-${id}`}
                  extra={parseFloat(updatePageMapBoxItem.lat).toFixed(6)}
                >
                  纬度
                </List.Item>,
              );
            } else {
              element.push(
                <List.Item
                  extra="请选择"
                  key={`${prefixCls}-map-picker-add-${id}`}
                  arrow="horizontal"
                  onClick={() => {
                    if (onFormChange) {
                      onFormChange(state.form);
                    }
                    if (onMapBoxChange) {
                      onMapBoxChange({ lat, lng, key });
                    }
                  }}
                >
                  {name}
                </List.Item>,
              );
            }
          } else if (status === 'update') {
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-address-${id}`}
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
                key={`${prefixCls}-map-picker-lng-${id}`}
                extra={parseFloat(lng).toFixed(6)}
              >
                经度
              </List.Item>,
            );
            element.push(
              <List.Item
                key={`${prefixCls}-map-picker-lat-${id}`}
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

  save = () => {
    const { props, state } = this;
    if (props.updatePageSave) {
      props.updatePageSave(state.form);
    }
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
              onClick={this.save}
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
              currentCalendarItem.config,
            )
          }
        />
      </>
    );
  };
}
