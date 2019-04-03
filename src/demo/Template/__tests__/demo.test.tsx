import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import TemplateDemo from '..';

describe('TemplateDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<TemplateDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
