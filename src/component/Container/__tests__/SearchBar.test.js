import React from 'react';
import { mount } from 'enzyme';
import { originConfig } from '../../../mock/config';
import { formatControls, formatConfig } from '../utils';
import { formatDate } from '../../../utils';

let SearchBar;
switch (process.env.LIB_DIR) {
  case 'lib':
    SearchBar = require('../../../../lib/component/Container/SearchBar')
      .default;
    break;
  default:
    SearchBar = require('../SearchBar').default;
    break;
}

describe('SearchBar', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('Drawer.onOpenChange', () => {
    const onVisibleChange = jest.fn();
    const wrapper = mount(
      <SearchBar
        dataSource={formatControls(null, formatConfig(originConfig), 'dam_cd')}
        visible={false}
        onVisibleChange={onVisibleChange}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </SearchBar>,
    );
    wrapper
      .find('Drawer')
      .first()
      .props()
      .onOpenChange(false);
    expect(onVisibleChange).toHaveBeenCalled();
  });

  it('Calendar.onCancel', () => {
    const wrapper = mount(
      <SearchBar
        dataSource={formatControls(null, formatConfig(originConfig), 'dam_cd')}
        visible={false}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </SearchBar>,
    );
    wrapper
      .find('Calendar')
      .first()
      .props()
      .onCancel();
    expect(wrapper.state().calendarVisible).toBe(false);
  });

  it('Calendar.onConfirm', () => {
    const startDateTime = new Date();
    const endDateTime = new Date();
    const wrapper = mount(
      <SearchBar
        dataSource={formatControls(null, formatConfig(originConfig), 'dam_cd')}
        visible={false}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </SearchBar>,
    );
    wrapper.setState({
      currentCalendarItem: { config: { key: 'calendar', type: 'calendar' } },
    });
    wrapper
      .find('Calendar')
      .first()
      .props()
      .onConfirm(startDateTime, endDateTime);
    expect(wrapper.state().form[5].value).toEqual([
      formatDate(startDateTime),
      formatDate(endDateTime),
    ]);
  });

  it('update state correctly', () => {
    const datePickerTime = new Date();
    const wrapper = mount(
      <SearchBar
        dataSource={formatControls(null, formatConfig(originConfig), 'dam_cd')}
        visible={false}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </SearchBar>,
    );
    // input
    wrapper
      .find('input')
      .at(1)
      .simulate('change', { target: { value: 'test' } });
    expect(wrapper.state().form[1].value).toBe('test');
    // datePicker
    wrapper
      .find('ListItem')
      .at(2)
      .simulate('click');
    wrapper
      .find('DatePicker')
      .props()
      .onChange(datePickerTime);
    expect(wrapper.state().form[2].value.getDate()).toBe(
      datePickerTime.getDate(),
    );
    // select
    wrapper
      .find('Picker')
      .props()
      .onChange(['value1']);
    expect(wrapper.state().form[3].value).toBe('value1');
    // checkbox
    wrapper
      .find('.am-accordion-header')
      .first()
      .simulate('click');
    wrapper
      .find('.am-checkbox-input')
      .at(2)
      .simulate('change');
    expect(wrapper.state().form[4].value).toBe('checkbox3');
    wrapper
      .find('.am-accordion-header')
      .first()
      .simulate('click');
    wrapper
      .find('.am-checkbox-input')
      .at(1)
      .simulate('change');
    expect(wrapper.state().form[4].value).toBe('checkbox3,checkbox2');
    wrapper
      .find('.am-accordion-header')
      .first()
      .simulate('click');
    wrapper
      .find('.am-checkbox-input')
      .at(2)
      .simulate('change');
    expect(wrapper.state().form[4].value).toBe('checkbox2');
    // calendar
    const startDateTime = new Date();
    const endDateTime = new Date();
    wrapper.setState({
      currentCalendarItem: { config: { key: 'calendar', type: 'calendar' } },
    });
    wrapper
      .find('[arrow]')
      .at(2)
      .props()
      .onClick();
    wrapper
      .find('Calendar')
      .at(0)
      .props()
      .onConfirm(startDateTime, endDateTime);
    expect(wrapper.state().form[5].value).toEqual([
      formatDate(startDateTime),
      formatDate(endDateTime),
    ]);
    wrapper
      .find('Calendar')
      .at(0)
      .props()
      .onCancel();
    expect(wrapper.state().calendarVisible).toBe(false);
  });
});
