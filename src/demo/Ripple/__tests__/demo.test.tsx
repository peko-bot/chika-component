import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import RippleDemo from '..';

describe('RippleDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<RippleDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
