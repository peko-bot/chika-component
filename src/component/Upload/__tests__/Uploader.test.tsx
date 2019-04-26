import React from 'react';
import { mount, shallow } from 'enzyme';
import 'nino-cli/scripts/setup';
let Uploader;
switch (process.env.LIB_DIR) {
  case 'lib':
    Uploader = require('../../../../lib/component/Upload/Uploader').default;
    break;
  default:
    Uploader = require('../Uploader').default;
    break;
}

describe('Uploader', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const fileList = [
    { id: 1, url: 'test1', error: false },
    { id: 2, url: 'test2', error: false },
  ];

  it('triggerInputUpload', () => {
    const wrapper = mount(<Uploader fileList={fileList} />);
    wrapper
      .find('.upload-item')
      .props()
      .onClick();
    expect(wrapper.instance().uploadInput.current.value).toBe('');
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(
      <Uploader fileList={fileList} onChange={onChange} />,
    );
    const blob = new Blob(['This is my firt trip to an island'], {
      type: 'text/plain',
    });
    const file = new File([blob], 'test');
    wrapper
      .find('input')
      .props()
      .onChange({ target: { files: [file] } }, () => {
        expect(onChange).toHaveBeenCalled();
      });
  });
});
