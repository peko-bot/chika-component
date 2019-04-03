import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
let Tabs;
switch (process.env.LIB_DIR) {
  case 'lib':
    Tabs = require('../../../../lib/component/Tabs').default;
    break;
  default:
    Tabs = require('..').default;
    break;
}

describe('Tabs', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Tabs />);
    expect(wrapper).toMatchSnapshot();
  });
});
