import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import SwiperDemo from '..';

describe('SwiperDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<SwiperDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
