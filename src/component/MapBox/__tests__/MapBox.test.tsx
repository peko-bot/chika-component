import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
let MapBox;
switch (process.env.LIB_DIR) {
  case 'lib':
    MapBox = require('../../../../lib/component/MapBox').default;
    break;
  default:
    MapBox = require('..').default;
    break;
}

describe('MapBox', () => {
  it('render correctly', () => {
    const wrapper = shallow(<MapBox />);
    expect(wrapper).toMatchSnapshot();
  });
});
