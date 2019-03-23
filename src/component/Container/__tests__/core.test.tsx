import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
import { formatControls, formatConfig } from '../utils';
import { defaultDataFormatEnum } from '../utils';
let Core;
switch (process.env.LIB_DIR) {
  case 'lib':
    Core = require('../../../../lib/component/Container/core').default;
    break;
  default:
    Core = require('../core').default;
    break;
}

describe('core', () => {
  it('render correctly', () => {
    const wrapper = shallow(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        config={formatConfig(originConfig)}
        defaultDataFormatEnum={defaultDataFormatEnum}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
