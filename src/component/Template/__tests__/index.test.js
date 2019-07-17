import React from 'react';
import { mount } from 'enzyme';
let Template;
switch (process.env.LIB_DIR) {
  case 'lib':
    Template = require('../../../../lib/component/Template').default;
    break;
  case 'dist':
    Template = require('../../../../dist/lib/Template').default;
    break;
  default:
    Template = require('..').default;
    break;
}

const dataSource = [
  { test1: 'test1', test2: 'test2' },
  { test1: 'test11', test2: 'test22' },
];

describe('Template', () => {
  it('render correctly', () => {
    const wrapper = mount(
      <Template dataSource={dataSource}>
        <>
          <div data-key="test1">1</div>
          <div data-key="test2">2</div>
        </>
      </Template>,
    );
    const instances = wrapper.find('[data-key]');
    expect(instances.length).toBe(4);
    expect(instances.at(0).text()).toBe('test1');
    expect(instances.at(1).text()).toBe('test2');
    expect(instances.at(2).text()).toBe('test11');
    expect(instances.at(3).text()).toBe('test22');
  });

  it('template should work correctly', () => {
    const wrapper = mount(
      <Template
        dataSource={dataSource}
        template={
          <>
            <div data-key="test1">1</div>
            <div data-key="test2">2</div>
          </>
        }
      />,
    );
    const instances = wrapper.find('[data-key]');
    expect(instances.length).toBe(4);
    expect(instances.at(0).text()).toBe('test1');
    expect(instances.at(1).text()).toBe('test2');
    expect(instances.at(2).text()).toBe('test11');
    expect(instances.at(3).text()).toBe('test22');
  });

  it('renderEmpty should work correctly', () => {
    const wrapper = mount(
      <Template dataSource={[]}>
        <>
          <div data-key="test1">1</div>
          <div data-key="test2">2</div>
        </>
      </Template>,
    );
    expect(wrapper.find('img').length).toBe(1);
    wrapper.setProps({ dataSource });
    expect(wrapper.find('img').length).toBe(0);
  });

  it('bindKey should work correctly', () => {
    const wrapper = mount(
      <Template
        dataSource={dataSource}
        bindKey="data-test"
        template={
          <>
            <div data-test="test1">1</div>
            <div data-test="test2">2</div>
          </>
        }
      />,
    );
    const instances = wrapper.find('[data-test]');
    expect(instances.length).toBe(4);
    expect(instances.at(0).text()).toBe('test1');
    expect(instances.at(1).text()).toBe('test2');
    expect(instances.at(2).text()).toBe('test11');
    expect(instances.at(3).text()).toBe('test22');
  });

  it('onClick should work correctly', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Template dataSource={dataSource}>
        <>
          <div data-key="test1" onClick={onClick}>
            1
          </div>
          <div data-key="test2">2</div>
        </>
      </Template>,
    );
    wrapper
      .find('[data-key]')
      .at(0)
      .simulate('click');
    expect(onClick).toBeCalled();
  });
});
