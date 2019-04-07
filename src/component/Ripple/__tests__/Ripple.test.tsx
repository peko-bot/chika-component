import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
let Ripple;
switch (process.env.LIB_DIR) {
  case 'lib':
    Ripple = require('../../../../lib/component/Ripple').default;
    break;
  case 'dist':
    Ripple = require('../../../../dist/lib/Ripple').default;
    break;
  default:
    Ripple = require('..').default;
    break;
}

describe('Ripple', () => {
  it('render correctly', () => {
    const wrapper = mount(<Ripple />);
    expect(wrapper).toMatchSnapshot();
  });
});
