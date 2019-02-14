import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
let Container;
switch (process.env.LIB_DIR) {
  case 'dist':
    Container = require('../../../../dist/lib/Container').default;
    break;
  case 'lib':
    Container = require('../../../../lib/component/Container').default;
    break;
  default:
    Container = require('..').default;
    break;
}

describe('Container', () => {
  it('render correctly', () => {
    expect(mount(<Container />)).toMatchSnapshot();
  });
});
