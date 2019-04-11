import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
let Drawer;
switch (process.env.LIB_DIR) {
  case 'lib':
    Drawer = require('../../../../lib/component/Drawer').default;
    break;
  case 'dist':
    Drawer = require('../../../../dist/lib/Drawer').default;
    break;
  default:
    Drawer = require('..').default;
    break;
}

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapperShow = mount(<Drawer visible>test</Drawer>);
    const wrapperHide = mount(<Drawer visible={false}>test</Drawer>);
    expect(wrapperShow).toMatchSnapshot();
    expect(wrapperHide).toMatchSnapshot();
  });

  it('when operate drawer is clicked, onChange should to be called', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Drawer visible onChange={onChange} direction="right">
        test
      </Drawer>,
    );
    wrapper.find('.operate-drawer').simulate('click');
    expect(onChange).toBeCalled();
  });
});
