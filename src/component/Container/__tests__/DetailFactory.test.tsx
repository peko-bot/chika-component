import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
const DataItem = originDataSource[0];
import { formatControls, formatConfig } from '../utils';
const dataItem = formatControls(DataItem, formatConfig(originConfig), 'dam_cd');
let DetailFactory;
switch (process.env.LIB_DIR) {
  case 'lib':
    DetailFactory = require('../../../../lib/component/Container/DetailFactory')
      .default;
    break;
  default:
    DetailFactory = require('../DetailFactory').default;
    break;
}

describe('DetailFactory', () => {
  it('render correctly', () => {
    const wrapper = mount(<DetailFactory dataItem={dataItem} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onMapBoxChange should work correctly', () => {
    const onMapBoxChange = jest.fn();
    const wrapper = mount(
      <DetailFactory dataItem={dataItem} onMapBoxChange={onMapBoxChange} />,
    );
    wrapper
      .find('ListItem')
      .at(5)
      .simulate('click');
    expect(onMapBoxChange).toBeCalled();
  });
});
