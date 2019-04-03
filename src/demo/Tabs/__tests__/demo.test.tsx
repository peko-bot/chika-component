import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import TabsDemo from '..';

describe('TabsDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<TabsDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
