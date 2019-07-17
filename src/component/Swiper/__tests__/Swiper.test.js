import React from 'react';
import { mount } from 'enzyme';
let Swiper;
switch (process.env.LIB_DIR) {
  case 'lib':
    Swiper = require('../../../../lib/component/Swiper').default;
    break;
  case 'dist':
    Swiper = require('../../../../dist/lib/Swiper').default;
    break;
  default:
    Swiper = require('..').default;
    break;
}

describe('Swiper', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('render correctly', () => {
    const wrapper = mount(
      <Swiper wrapperHeight={500} duration={0.7} sensibility={1}>
        test
      </Swiper>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('getChildHeight should work correctly', () => {
    const wrapper = mount(
      <Swiper wrapperHeight={500} duration={0.7} sensibility={1}>
        test
      </Swiper>,
    ).instance();
    wrapper.getChildHeight();
    expect(wrapper.bottomHeight).toBe(-456);
    expect(wrapper.scrollerHeight).toBe(0);
  });

  it('status loading', () => {
    const wrapper = mount(
      <Swiper wrapperHeight={500} duration={0.7} sensibility={1} loading>
        test
      </Swiper>,
    );
    const spy = jest.spyOn(wrapper.instance(), 'getChildHeight');
    wrapper.setState({ status: 'loading', type: 'refresh' });
    wrapper.setProps({ loading: false });
    wrapper.update();
    expect(wrapper.state('refreshText')).toBe('刷新成功');
    jest.runAllTimers();
    expect(wrapper.state('refreshText')).toBe('下拉刷新');
    expect(spy).toHaveBeenCalled();

    wrapper.setProps({ loading: true });
    wrapper.setState({ status: 'loading', type: 'load' });
    wrapper.update();

    wrapper.setProps({ loading: false });
    wrapper.update();
    expect(wrapper.state('loadText')).toBe('加载完成');
    jest.runAllTimers();
    expect(wrapper.state('loadText')).toBe('加载更多');
    expect(spy).toHaveBeenCalled();
  });

  it('touch event', () => {
    const onRefresh = jest.fn();
    const onLoad = jest.fn();
    const wrapper = mount(
      <Swiper
        wrapperHeight={500}
        duration={0.7}
        sensibility={1}
        loading
        onRefresh={onRefresh}
        onLoad={onLoad}
      >
        test
      </Swiper>,
    );
    wrapper
      .find('.wrapper')
      .simulate('touchstart', { touches: [{ pageY: 100 }] });
    expect(wrapper.instance().startY).toBe(100);

    wrapper
      .find('.wrapper')
      .simulate('touchmove', { touches: [{ pageY: 150 }] });
    expect(wrapper.state().distance).toBe(50);
    expect(wrapper.state().iconDeg).toBe(180);
    wrapper
      .find('.wrapper')
      .simulate('touchmove', { touches: [{ pageY: 130 }] });
    expect(wrapper.state().distance).toBe(30);
    expect(wrapper.state().iconDeg).toBe(122.72727272727272);
    wrapper
      .find('.wrapper')
      .simulate('touchmove', { touches: [{ pageY: 80 }] });
    expect(wrapper.state().distance).toBe(-20);
    expect(wrapper.state().iconDeg).toBe(180);

    wrapper.setState({ distance: 50 });
    wrapper.find('.wrapper').simulate('touchend');
    expect(onRefresh).toHaveBeenCalled();
    wrapper.setState({ distance: -10 });
    wrapper.find('.wrapper').simulate('touchend');
    expect(onLoad).toHaveBeenCalled();
  });
});
