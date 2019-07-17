import React from 'react';
import { shallow } from 'enzyme';
import TemplateDemo from '..';

describe('TemplateDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<TemplateDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
