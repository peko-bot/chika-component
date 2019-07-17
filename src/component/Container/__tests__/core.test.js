import React from 'react';
import { shallow, mount } from 'enzyme';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
import { formatControls, formatConfig } from '../utils';
let Core;
switch (process.env.LIB_DIR) {
  case 'lib':
    Core = require('../../../../lib/component/Container/core').default;
    break;
  default:
    Core = require('../core').default;
    break;
}

describe('core', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('render correctly', () => {
    const wrapper = shallow(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onSearch should be called when SearchBar submit', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        onSearch={onSearch}
        config={formatConfig(originConfig)}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper.setState({ showSearchBar: true });
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledWith({
      calendar: '',
      checkbox: '',
      dam_cd: '', // eslint-disable-line
      datePicker: '',
      mapPicker: '',
      pjnm: '',
      select: '',
      upload: '',
    });
  });

  it('touch event', () => {
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper
      .find('.sc-content')
      .simulate('touchstart', { touches: [{ pageX: 100, pageY: 200 }] });
    expect(wrapper.instance().contentStartX).toBe(100);
    expect(wrapper.instance().contentStartY).toBe(200);

    wrapper
      .find('.sc-content')
      .simulate('touchend', { changedTouches: [{ pageX: 150, pageY: 200 }] });
    expect(wrapper.state().showSearchBar).toBe(true);
  });

  it('DetailFactory.onBack', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        onSearch={onSearch}
        config={formatConfig(originConfig)}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper
      .find('[data-key]')
      .at(0)
      .simulate('click');
    wrapper.update();
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(onSearch).toHaveBeenCalled();
    expect(wrapper.state().currentGroup).toBe('list-page');
    expect(wrapper.state().currentOrder).toBe(0);
  });

  it('handleTemplatePress', () => {
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
        primaryKey="dam_cd"
        power={{
          select: true,
          delete: true,
          update: true,
          add: true,
        }}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    expect(
      wrapper
        .find('Template')
        .props()
        .onPress({ dam_cd: 'testDamCd' }),
    ).toEqual({ dam_cd: 'testDamCd' });
  });

  it('DetailFactory.onPageChange', () => {
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
        primaryKey="dam_cd"
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper
      .find('[data-key]')
      .at(2)
      .simulate('click');
    wrapper.setState({ currentOrder: 2 });
    wrapper
      .find('DetailFactory')
      .props()
      .onPageChange('last');
    expect(wrapper.state().currentGroup).toBe('detail-page');
    expect(wrapper.state().currentOrder).toBe(1);
    wrapper.setState({ currentOrder: 2 });
    wrapper
      .find('DetailFactory')
      .props()
      .onPageChange('next');
    expect(wrapper.state().currentOrder).toBe(3);
    wrapper
      .find('DetailFactory')
      .props()
      .onPageChange('test');
    expect(wrapper.state().currentOrder).toBe(3);
  });

  it('DetailFactory.onMapBoxChange', () => {
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
        primaryKey="dam_cd"
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper
      .find('[data-key]')
      .at(2)
      .simulate('click');
    wrapper.setState({ currentOrder: 2 });
    wrapper
      .find('DetailFactory')
      .props()
      .onMapBoxChange({ lat: 1, lng: 2, key: 'test' });
    expect(wrapper.instance().history).toEqual({
      group: 'detail-page',
      order: 2,
    });
    expect(wrapper.state().mapBoxTargetKey).toBe('test');
  });

  it('MapBox.handleBackFromMapBox', () => {
    const onMapPickerChange = jest.fn();
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
        primaryKey="dam_cd"
        onMapPickerChange={onMapPickerChange}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper.setState({ currentGroup: 'map-box' });
    wrapper
      .find('Button')
      .at(1)
      .simulate('click');
    expect(onMapPickerChange).toHaveBeenCalled();
  });
});
