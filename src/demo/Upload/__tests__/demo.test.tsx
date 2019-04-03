import React from 'react';
import { shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
import UploadDemo from '..';

describe('UploadDemo', () => {
  it('render correctly', () => {
    const wrapper = shallow(<UploadDemo />);
    expect(wrapper).toMatchSnapshot();
  });
});
