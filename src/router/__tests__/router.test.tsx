import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import Router from '..';

describe('Router', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper).toMatchSnapshot();
  });
});
