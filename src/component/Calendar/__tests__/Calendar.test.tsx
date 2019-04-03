import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';

let Calendar;
switch (process.env.LIB_DIR) {
  case 'lib':
    Calendar = require('../../../../lib/component/Calendar').default;
    break;
  default:
    Calendar = require('..').default;
    break;
}

describe('Calendar', () => {
  it('render correctly', () => {
    const wrapper = mount(<Calendar />);
    expect(wrapper).toMatchSnapshot();
  });
});
