import React from 'react';
import { shallow, mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import { originConfig } from '../../../mock/config';
import { originDataSource } from '../../../mock/dataSource';
import { formatControls, formatConfig } from '../utils';
let Core;
switch (process.env.LIB_DIR) {
  case 'lib':
    Core = require('../../../../lib/component/Container/core').default;
    break;
  case 'dist':
    Core = require('../../../../dist/lib/Container').Core;
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
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('onSearch should be called when SearchBar submit', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Core
        dataSource={originDataSource}
        formatControls={formatControls}
        onSearch={onSearch}
        config={formatConfig(originConfig)}
      >
        <>
          <div data-key="pjnm">1</div>
          <div data-key="dam_cd">2</div>
        </>
      </Core>,
    );
    wrapper.setState({ showSearchBar: true });
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledWith({
      calendar: '',
      checkbox: '',
      dam_cd: '', // eslint-disable-line
      datePicker: '',
      mapPicker: '',
      pjnm: '',
      select: '',
      upload: '',
    });
  });
});
