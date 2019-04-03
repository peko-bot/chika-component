import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import UploadDemo from '..';

describe('UploadDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<UploadDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
