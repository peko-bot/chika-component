import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { fetch } from 'whatwg-fetch';
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

const config = {
  tcid: 10874,
  menuid: 1392,
};

const sortBy = [
  {
    key: 'dam_width',
    text: '坝高',
  },
  {
    key: 'crest_length',
    text: '坝长',
  },
];

const createWrapper = (...props) =>
  mount(<Container config={config} sortBy={sortBy} {...props} />);

describe('Container', () => {
  beforeAll = () => {
    global.fetch = fetch;
  };

  afterAll = () => {
    global.fetch = null;
  };

  it('render correctly', () => {
    const wrapper = createWrapper();
  });
});
