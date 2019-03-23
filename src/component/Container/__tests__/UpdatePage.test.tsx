import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
const DataItem = originDataSource[0];
import { formatConfig } from '../utils';
const Config = formatConfig(originConfig);
let UpdatePage;
switch (process.env.LIB_DIR) {
  case 'lib':
    UpdatePage = require('../../../../lib/component/Container/UpdatePage')
      .default;
    break;
  default:
    UpdatePage = require('../UpdatePage').default;
    break;
}

describe('UpdatePage', () => {
  it('should render correctly when status is add', () => {
    const wrapper = mount(
      <UpdatePage config={Config} dataItem={DataItem} status="add" />,
    );
    const listContent = wrapper.find('.am-list-content');
    expect(listContent.length).toBe(8);
    expect(listContent.at(0).text()).toBe('dam_cd');
    expect(listContent.at(1).text()).toBe('datePicker');
    expect(listContent.at(2).text()).toBe('select');
    expect(listContent.at(3).text()).toBe('calendar');
    expect(listContent.at(4).text()).toBe('起始时间');
    expect(listContent.at(5).text()).toBe('结束时间');
    expect(listContent.at(6).text()).toBe('mapPicker');
  });

  it('should update state correctly when status is add', () => {
    const wrapper = mount(
      <UpdatePage config={Config} dataItem={{}} status="add" />,
    );
    expect(wrapper.state().form).toEqual({});
    // input
    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { value: 'test' } });
    expect(wrapper.state().form.dam_cd.value).toBe('test');
    // datePicker
    wrapper
      .find('ListItem')
      .at(1)
      .simulate('click');
    wrapper.find('.am-picker-popup-header-right').simulate('click');
    expect(wrapper.state().form.datePicker.value.getDate()).toBe(
      new Date().getDate(),
    );
    // select
    wrapper
      .find('ListItem')
      .at(2)
      .simulate('click');
    wrapper.find('.am-picker-popup-header-right').simulate('click');
    expect(wrapper.state().form.select.value).toBe('value1');
    // checkbox
    wrapper
      .find('.am-accordion-header')
      .first()
      .simulate('click');
    wrapper
      .find('.am-checkbox-input')
      .at(1)
      .simulate('change');
    expect(wrapper.state().form.checkbox.value).toBe('checkbox2');
    // calendar
    // upload
    // mapPicker
    // hard to test
  });
});
