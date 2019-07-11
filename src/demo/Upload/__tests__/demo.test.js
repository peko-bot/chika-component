import React from 'react';
import { mount } from 'enzyme';
import 'nino-cli/scripts/setup';
import UploadDemo from '..';

describe('UploadDemo', () => {
  it('render correctly', () => {
    const wrapper = mount(<UploadDemo />);
    expect(wrapper).toMatchSnapshot();
  });

  it('check events', () => {
    const wrapper = mount(<UploadDemo />);
    wrapper
      .find('Upload')
      .props()
      .onChange({ url: 'testurl', id: 'testid' });
    expect(wrapper.state().fileList).toEqual([
      { url: 'testurl', id: 'testid' },
    ]);

    wrapper
      .find('Upload')
      .props()
      .onClick({ url: 'testurl', id: 'testid' });
    expect(wrapper.state().fileList).toEqual([
      { url: 'testurl', id: 'testid', error: true },
    ]);

    wrapper
      .find('Upload')
      .props()
      .onPress({ url: 'testurl', id: 'testid' });
    expect(wrapper.state().fileList).toEqual([]);
  });
});
