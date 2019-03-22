import React from 'react';
import { mount } from 'enzyme';
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
  it('render correctly', () => {
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
    expect(wrapper).toMatchSnapshot();
  });

  it('transform should work correctly', () => {
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
    expect(
      wrapper
        .find('.Transform-item')
        .at(1)
        .prop('style'),
    ).toEqual({ transform: 'translate3d(0%, 0, 0)' });
  });
});
