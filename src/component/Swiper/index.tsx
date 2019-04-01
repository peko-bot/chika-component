import React from 'react';
import './css/Swiper.css';
import classNames from 'classnames';

type SpinnerType = 'load' | 'refresh';
type SpinnerParam = {
  type: SpinnerType;
  relatedStyle: React.CSSProperties;
  relatedText: string;
  iconUrl: string;
  iconDeg: number;
  isFinished: boolean;
};
export interface SwiperProps {
  wrapperHeight: number;
  loading: boolean;
  sensibility?: number;
  duration?: number;
  onRefresh?: () => void;
  onLoad?: () => void;
}
export interface SwiperState {
  distance: number;
  iconDeg: number;
  refreshEnd: boolean;
  loadEnd: boolean;
  refreshText: string;
  refreshImg: string;
  loadText: string;
  loadImg: string;
}

export default class Swiper extends React.Component<SwiperProps, SwiperState> {
  wrapper: HTMLDivElement | null;
  scroller: HTMLDivElement;
  startY = 0;
  endY = 0;
  down = '../../assets/Swiper/down.png';
  loading = '../../assets/Swiper/loading.gif';
  complete = '../../assets/Swiper/complete.png';
  scrollerHeight = 10000;
  bottomHeight = 0;

  constructor(props: SwiperProps) {
    super(props);
    this.state = {
      distance: 0, // 从touchstart记，到touchend结束，容器滑过的距离
      iconDeg: 0, // 箭头变换角度
      refreshEnd: false, // 刷新是否完成
      loadEnd: false, // 加载是否完成
      refreshText: '下拉刷新',
      refreshImg: this.down,
      loadText: '加载更多',
      loadImg: this.down,
    };
  }

  componentDidMount = () => {
    this.bindEvent(this.wrapper);
  };

  getChildHeight = () => {
    const { wrapperHeight } = this.props;
    const { scrollHeight } = this.scroller;
    this.bottomHeight = scrollHeight - wrapperHeight + 44;
    this.scrollerHeight = scrollHeight;
  };

  bindEvent = (refs: any) => {
    const { sensibility = 1 } = this.props;

    refs.addEventListener('touchstart', (e: any) => {
      // record coordinate before touch start
      this.startY = e.touches[0].pageY;
      this.setState({ refreshEnd: false, loadEnd: false });
    });

    refs.addEventListener('touchmove', (e: any) => {
      e.preventDefault();
      // distance of wrapper moving
      const distance =
        (e.touches[0].pageY - this.startY) / sensibility + this.endY;
      let iconDeg;
      if (distance > 44) {
        // 44是刷新、加载div的高度，超过时箭头向上
        iconDeg = 180;
      } else if (distance >= 0 && distance <= 44) {
        // 刷新没超过上方div高度时，根据比例变换箭头方向
        iconDeg = (distance / 44) * 180;
      } else {
        // 下方的加载偷懒没写箭头变换以及未超过44的行为，mark
        iconDeg = 180;
      }
      this.setState({ distance, iconDeg });
    });

    refs.addEventListener('touchend', () => {
      const { onRefresh, onLoad } = this.props;
      const { distance } = this.state;
      if (distance > 44) {
        // 拖到顶部的情况
        if (onRefresh) {
          this.setState({
            refreshImg: this.loading,
            refreshText: '刷新中...',
            distance: 44,
          });
          onRefresh();
        }
      } else if (distance > 0 && distance <= 44) {
        // 上方div未超过44的情况
        this.setState({ distance: 0 });
      } else if (distance < 0) {
        // 拖动到底部的情况
        const { offsetHeight, scrollHeight } = this.scroller;
        const differHeight = scrollHeight - offsetHeight;
        // 超出边界回弹
        // 这里不能写等于，不然容器拖到底部时，touchstart会触发加载事件
        if (Math.abs(distance) > differHeight) {
          this.endY = -differHeight;
          // 下拉加载
          if (onLoad) {
            onLoad();
            this.setState({
              loadText: '加载中...',
              loadImg: this.loading,
              distance: -this.bottomHeight,
            });
          } else {
            this.setState({ distance: -differHeight });
          }
        } else {
          // 未超出边界就停在那儿
          this.endY = distance;
        }
      }

      this.setState({
        refreshEnd: true,
        loadEnd: true,
      });
    });
  };

  generateStyle = () => {
    const { wrapperHeight, duration = 1 } = this.props;
    const { distance, refreshEnd, loadEnd } = this.state;
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    const refreshStyle: React.CSSProperties = {};
    const loadStyle: React.CSSProperties = {};
    let wrapperStyle: React.CSSProperties = {};
    const transform = `translate3d(0px, ${distance}px, 0)`;
    const transition = `all ${duration}s ease`;

    refreshStyle.transform = transform;
    if (refreshEnd) refreshStyle.transition = transition;

    loadStyle.transform = transform;
    loadStyle.top = this.scrollerHeight;
    if (loadEnd) loadStyle.transition = transition;

    wrapperStyle = {
      ...refreshStyle,
      height: wrapperHeight || clientHeight,
    };

    return { wrapperStyle, loadStyle, refreshStyle };
  };

  renderSpinner = ({
    type,
    isFinished,
    relatedStyle,
    iconUrl,
    iconDeg,
    relatedText,
  }: SpinnerParam) => {
    return (
      <div
        className={classNames({
          [type]: true,
          [`${type}-end`]: isFinished,
        })}
        style={relatedStyle}
      >
        <span
          className={`${type}-icon`}
          style={{ transform: `rotateZ(${iconDeg}deg)` }}
        >
          <img src={iconUrl} />
        </span>
        <span className={`${type}-text`}>{relatedText}</span>
      </div>
    );
  };

  render() {
    const { onRefresh, onLoad, children } = this.props;
    const {
      iconDeg,
      refreshEnd,
      refreshText,
      refreshImg,
      loadEnd,
      loadText,
      loadImg,
    } = this.state;
    const { refreshStyle, wrapperStyle, loadStyle } = this.generateStyle();

    return (
      <div className="Swiper">
        <div ref={ref => (this.wrapper = ref)} className="wrapper">
          <div style={wrapperStyle} ref={ref => ref && (this.scroller = ref)}>
            {children}
          </div>
          {onRefresh &&
            this.renderSpinner({
              type: 'refresh',
              isFinished: refreshEnd,
              relatedStyle: refreshStyle,
              iconUrl: refreshImg,
              iconDeg,
              relatedText: refreshText,
            })}
          {onLoad &&
            this.renderSpinner({
              type: 'load',
              isFinished: loadEnd,
              relatedStyle: loadStyle,
              iconUrl: loadImg,
              iconDeg,
              relatedText: loadText,
            })}
        </div>
      </div>
    );
  }
}
