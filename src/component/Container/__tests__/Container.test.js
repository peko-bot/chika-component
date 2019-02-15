import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import 'whatwg-fetch';
import getConfig from '../../../mock/getConfig.json';
import search from '../../../mock/search.json';

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

describe('Container', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <Container config={config} sortBy={sortBy} height={900}>
        <div className="container" bind="true">
          <ul>
            <li>
              <div className="left">
                <label>名称：</label>
                <label data-key="pjnm" />
              </div>
              <div className="right">
                <label>坝高：</label>
                <label data-key="dam_width" unit="m" decimalcount={2} />
              </div>
            </li>
          </ul>
        </div>
      </Container>,
    );

    const { power, tablefieldconfig } = getConfig.data;
    const { list, recordcount } = search.data;
    wrapper.setState(
      {
        power,
        config: tablefieldconfig,
        recordCount: recordcount,
        listDatas: list,
        loading: false,
        searchLoading: false,
        pullLoad: false,
      },
      () => {
        // expect(wrapper).toMatchSnapshot();
      },
    );
  });
});
