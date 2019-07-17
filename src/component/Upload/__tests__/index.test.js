import React from 'react';
import { mount } from 'enzyme';
let Upload;
switch (process.env.LIB_DIR) {
  case 'lib':
    Upload = require('../../../../lib/component/Upload').default;
    break;
  case 'dist':
    Upload = require('../../../../dist/lib/Upload').default;
    break;
  default:
    Upload = require('..').default;
    break;
}

const fileList = [
  { id: 1, url: 'test1', error: false },
  { id: 2, url: 'test2', error: false },
];

describe('Upload', () => {
  it('render correctly', () => {
    const wrapper = mount(<Upload fileList={fileList} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should work correctly', () => {
    const onClick = jest.fn();
    const wrapper = mount(<Upload fileList={fileList} onClick={onClick} />);
    wrapper
      .find('.upload-item')
      .at(0)
      .simulate('click');
    expect(onClick).toBeCalledWith({ id: 1, url: 'test1', error: false });
  });

  it('status error should work correctly', () => {
    fileList[0].error = true;
    const wrapper = mount(<Upload fileList={fileList} />);
    expect(wrapper.find('.upload-item-error').length).toBe(1);
  });

  it('fileList should work correctly', () => {
    const wrapper = mount(<Upload fileList={fileList} />);
    wrapper.setProps({ fileList: [fileList[0]] });
    expect(wrapper.find('.upload-item').length).toBe(2);
  });
});
