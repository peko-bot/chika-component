import React from 'react';
import { mount } from 'enzyme';
import TransformManagerDemo from '..';

describe('TransformManagerDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<TransformManagerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
