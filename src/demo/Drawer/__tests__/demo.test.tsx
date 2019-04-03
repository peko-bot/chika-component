import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import DrawerDemo from '..';

describe('DrawerDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
