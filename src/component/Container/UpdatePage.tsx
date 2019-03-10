import React, { Component } from 'react';
import {
  List,
  Button,
  InputItem,
  DatePicker,
  Picker,
  Accordion,
  Checkbox,
} from 'antd-mobile';
const { CheckboxItem } = Checkbox;
import Upload from './UploadWrapper';

export interface UpdatePageProps {
  onBack?: () => void;
  config: Array<any>;
  dataItem: any;
  status: 'add' | 'update';
}
export interface UpdatePageState {}

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

  renderEditItem = (dataItem: any, config: Array<any>) => {
    const { status } = this.props;
    const preClass = `update-page-${status}`;
    let element = [];
    for (let i = 0; i < config.length; i++) {
      // status === 'add' ? '' : value,
      const {
        type,
        name,
        key,
        //  maxLength, minLength, isNull
      } = config[i];
      const value = dataItem[key];
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
                  onErrorClick={() => console.log(name)}
                  value={value}
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
                onClick={() => this.setState({ calendarVisible: true })}
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
                onClick={() => this.setState({ calendarVisible: true })}
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
    const { onBack, dataItem, config } = this.props;
    return (
      <List>
        {this.renderEditItem(dataItem, config) as any}
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
