import React from 'react';
import { mount } from 'enzyme';
import SwiperDemo from '..';

describe('SwiperDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<SwiperDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
