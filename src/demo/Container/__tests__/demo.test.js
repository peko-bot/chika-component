import React from 'react';
import { shallow } from 'enzyme';
import ContainerDemo from '..';

describe('ContainerDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<ContainerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
