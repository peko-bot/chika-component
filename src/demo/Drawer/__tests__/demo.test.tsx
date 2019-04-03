import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import DrawerDemo from '..';

describe('DrawerDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<DrawerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
