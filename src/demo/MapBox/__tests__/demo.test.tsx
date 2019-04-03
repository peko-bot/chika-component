import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import MapBoxDemo from '..';

describe('MapBoxDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<MapBoxDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
