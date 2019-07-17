import React from 'react';
import { shallow } from 'enzyme';
import Router from '..';

describe('Router', () => {
  it('render correctly', () => {
    const wrapper = shallow(<Router />);
    expect(wrapper).toMatchSnapshot();
  });
});
