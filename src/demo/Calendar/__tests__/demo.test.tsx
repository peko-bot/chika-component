import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import CalendarDemo from '..';

describe('CalendarDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<CalendarDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
