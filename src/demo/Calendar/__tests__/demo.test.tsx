import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import CalendarDemo from '..';

describe('CalendarDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<CalendarDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
