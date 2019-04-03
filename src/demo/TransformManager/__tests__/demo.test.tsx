import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import TransformManagerDemo from '..';

describe('TransformManagerDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<TransformManagerDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
