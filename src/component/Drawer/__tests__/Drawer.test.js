import React from 'react';
import { render, mount, shallow } from 'enzyme';
import Drawer from '..';

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapperShow = render(<Drawer visible={true}>test</Drawer>);

    const wrapperHide = render(<Drawer visible={false}>test</Drawer>);

    expect(wrapperShow).toMatchSnapshot();
    expect(wrapperHide).toMatchSnapshot();
  });

  it('when operate drawer is clicked, onChange should to be called', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <Drawer visible={true} onChange={onChange} direction="right">
        test
      </Drawer>,
    );

    wrapper.find('.operate-drawer').simulate('click');

    expect(onChange).toBeCalled();
  });
});
