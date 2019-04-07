import React from 'react';
import { shallow, mount } from 'enzyme';
import 'nino-cli/scripts/setup';
let DataController;
switch (process.env.LIB_DIR) {
  case 'lib':
    DataController = require('../../../../lib/component/Container/DataController')
      .default;
    break;
  default:
    DataController = require('../DataController').default;
    break;
}

describe('DataController', () => {
  it('render correctly', () => {
    const wrapper = shallow(
      <DataController tableId={-2} menuId={-2}>
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </DataController>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('handlePowerStr should work correctly', () => {
    const wrapper = mount(
      <DataController tableId={-2} menuId={-2}>
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </DataController>,
    ).instance();
    expect(wrapper.handlePowerStr('Select')).toEqual({
      select: true,
      delete: false,
      update: false,
      add: false,
    });
    expect(wrapper.handlePowerStr('Select,Add')).toEqual({
      select: true,
      delete: false,
      update: false,
      add: true,
    });
    expect(wrapper.handlePowerStr('Select,Add,Del')).toEqual({
      select: true,
      delete: true,
      update: false,
      add: true,
    });
    expect(wrapper.handlePowerStr('Select,Add,Del,Update')).toEqual({
      select: true,
      delete: true,
      update: true,
      add: true,
    });
  });

  it('getPrimaryKey should work correctly', () => {
    const wrapper = mount(
      <DataController tableId={-2} menuId={-2}>
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </DataController>,
    ).instance();
    expect(wrapper.getPrimaryKey([{ fname: 'test', iskey: true }])).toBe(
      'test',
    );
  });
});
