import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
let DataController;
switch (process.env.LIB_DIR) {
  case 'lib':
    DataController = require('../../../../lib/component/Container/DataController')
      .default;
    break;
  default:
    DataController = require('../DataController').default;
    break;
}

describe('DataController', () => {
  it('render correctly', () => {
    const wrapper = shallow(
      <DataController tableId={-2} menuId={-2}>
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </DataController>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
