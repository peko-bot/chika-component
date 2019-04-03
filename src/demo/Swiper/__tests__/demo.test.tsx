import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import SwiperDemo from '..';

describe('SwiperDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<SwiperDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
