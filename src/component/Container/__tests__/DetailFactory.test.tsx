import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
const DataItem = originDataSource[0];
import { formatControls, formatConfig } from '../utils';
const dataItem = formatControls(DataItem, formatConfig(originConfig), 'dam_cd');
let DetailFactory;
switch (process.env.LIB_DIR) {
  case 'lib':
    DetailFactory = require('../../../../lib/component/Container/DetailFactory')
      .default;
    break;
  default:
    DetailFactory = require('../DetailFactory').default;
    break;
}

const handleChildDataFormat = (
  value: string | number | Date,
  childProps: any,
  bindKey: string,
) => {
  for (const item of formatConfig(originConfig)) {
    const { key, unit, decimalCount } = item;
    if (key === childProps[bindKey]) {
      if (value instanceof Date) {
        // todo: find a way not to transform local to utc
        // for ci problem, local can't get reproduce
        // value = formatDate(value, dateFormat);
        value = '2017-08-09 08:00:00';
      }
      if (decimalCount) {
        value = +parseFloat(
          parseFloat(value.toString()).toFixed(decimalCount),
        ).toPrecision(12);
      }
      if (unit) {
        value = `${value} ${unit}`;
      }
    }
  }
  return value;
};

describe('DetailFactory', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <DetailFactory
        dataSource={dataItem}
        onDataFormat={handleChildDataFormat}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onMapBoxChange should work correctly', () => {
    const onMapBoxChange = jest.fn();
    const wrapper = mount(
      <DetailFactory
        dataSource={dataItem}
        onMapBoxChange={onMapBoxChange}
        onDataFormat={handleChildDataFormat}
      />,
    );
    wrapper
      .find('ListItem')
      .at(5)
      .simulate('click');
    expect(onMapBoxChange).toBeCalled();
  });
  it('handeContentTouch', () => {
    const onPageChange = jest.fn();
    const wrapper = mount(
      <DetailFactory
        dataSource={dataItem}
        onDataFormat={handleChildDataFormat}
        onPageChange={onPageChange}
        currentOrder={2}
        minPage={0}
        maxPage={10}
      />,
    );
    wrapper
      .find('.DetailFactory')
      .props()
      .onTouchStart({ touches: [{ pageX: 100, pageY: 150 }] }, 'touchStart');
    expect(wrapper.instance().contentStartX).toBe(100);
    expect(wrapper.instance().contentStartY).toBe(150);
    wrapper
      .find('.DetailFactory')
      .props()
      .onTouchEnd({ changedTouches: [{ pageX: 100, pageY: 200 }] }, 'touchEnd');
    expect(onPageChange).toHaveBeenCalled();
  });
});
