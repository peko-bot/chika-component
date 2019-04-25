import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originDataSource } from '../../../mock/dataSource';
let FunctionalButton;
switch (process.env.LIB_DIR) {
  case 'lib':
    FunctionalButton = require('../../../../lib/component/Container/FunctionalButton')
      .default;
    break;
  default:
    FunctionalButton = require('../FunctionalButton').default;
    break;
}
const sortBy = [
  { key: 'dam_cd', text: 'dam_cd' },
  { key: 'crest_length', text: 'crest_length' },
];

describe('FunctionalButton', () => {
  it('Modal.onClose', () => {
    const wrapper = mount(
      <FunctionalButton sortBy={sortBy} dataSource={originDataSource} />,
    );
    wrapper.setState({ modalVisible: true });
    wrapper
      .find('Modal')
      .props()
      .onClose();
    expect(wrapper.state().modalVisible).toBe(false);
    wrapper
      .find('.sc-extend-add')
      .props()
      .onClick();
    expect(wrapper.state().modalVisible).toBe(true);
  });

  it('handleOnClick', () => {
    const onSort = jest.fn();
    const wrapper = mount(
      <FunctionalButton
        sortBy={sortBy}
        dataSource={originDataSource}
        onSort={onSort}
      />,
    );
    wrapper.setState({ modalVisible: true });
    expect(wrapper.state().sorts[0]).toEqual({
      direction: 'horizontal',
      key: 'dam_cd',
      status: '无',
      text: 'dam_cd',
    });
    const sortItemProps = wrapper
      .find('ListItem')
      .first()
      .props();
    sortItemProps.onClick(sortBy[0]);
    expect(onSort).toHaveBeenCalled();
    expect(wrapper.state().sorts[0]).toEqual({
      direction: 'up',
      key: 'dam_cd',
      status: '升序',
      text: 'dam_cd',
    });
    sortItemProps.onClick(sortBy[0]);
    expect(wrapper.state().sorts[0]).toEqual({
      direction: 'down',
      key: 'dam_cd',
      status: '降序',
      text: 'dam_cd',
    });
    sortItemProps.onClick(sortBy[0]);
    expect(wrapper.state().sorts[0]).toEqual({
      direction: 'up',
      key: 'dam_cd',
      status: '升序',
      text: 'dam_cd',
    });
  });
});
