import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import RippleDemo from '..';

describe('RippleDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<RippleDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
