import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import Router from '..';

describe('Router', () => {
  it('render correctly', () => {
    const wrapper = mount(<Router />);
    expect(wrapper).toMatchSnapshot();
  });
});
