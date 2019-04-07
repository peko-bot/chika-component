import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
let Tabs;
switch (process.env.LIB_DIR) {
  case 'lib':
    Tabs = require('../../../../lib/component/Tabs').default;
    break;
  case 'dist':
    Tabs = require('../../../../dist/lib/Tabs').default;
    break;
  default:
    Tabs = require('..').default;
    break;
}

describe('Tabs', () => {
  it('render correctly', () => {
    const wrapper = mount(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });
});
