import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import ContainerDemo from '..';

describe('ContainerDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<ContainerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
