import React from 'react';
import { mount, shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
let TransformManager, Item, targetModule;
switch (process.env.LIB_DIR) {
  case 'lib':
    targetModule = require('../../../../lib/component/TransformManager');
    TransformManager = targetModule.default;
    Item = targetModule.TransformManagerItem;
    break;
  default:
    targetModule = require('..');
    TransformManager = targetModule.default;
    Item = targetModule.TransformManagerItem;
    break;
}

describe('TransformManager', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('render correctly', () => {
    const wrapper = shallow(
      <TransformManager currentGroup="group1" currentOrder="0">
        <Item group="group1" order={0} key="group1-0">
          group1-0
        </Item>
        <Item group="group1" order={1} key="group1-1">
          group1-1
        </Item>
      </TransformManager>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('transform should work correctly when group is same', () => {
    const wrapper = mount(
      <TransformManager currentGroup="group1" currentOrder="0">
        <Item group="group1" order={0} key="group1-0">
          group1-0
        </Item>
        <Item group="group1" order={1} key="group1-1">
          group1-1
        </Item>
      </TransformManager>,
    );
    wrapper.setProps({ currentOrder: '1' });
    jest.runAllTimers();
    wrapper.update();
    expect(
      wrapper
        .find('.Transform-item')
        .at(1)
        .prop('style'),
    ).toEqual({ transform: 'translate3d(0%, 0, 0)' });
  });

  it('transform should work correctly when group is different', () => {
    const wrapper = mount(
      <TransformManager currentGroup="group1" currentOrder="0">
        <Item group="group1" order={0} key="group1-0">
          group1-0
        </Item>
        <Item group="group1" order={1} key="group1-1">
          group1-1
        </Item>
        <Item group="group2" order={0} key="group2-0">
          group2-0
        </Item>
        <Item group="group2" order={1} key="group2-1">
          group2-1
        </Item>
      </TransformManager>,
    );
    wrapper.setProps({ currentOrder: '1', currentGroup: 'group2' });
    jest.runAllTimers();
    wrapper.update();
    expect(
      wrapper
        .find('.Transform-item')
        .at(1)
        .prop('style'),
    ).toEqual({ transform: 'translate3d(0%, 0, 0)' });
  });
});
