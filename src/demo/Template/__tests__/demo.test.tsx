import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import TemplateDemo from '..';

describe('TemplateDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<TemplateDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
