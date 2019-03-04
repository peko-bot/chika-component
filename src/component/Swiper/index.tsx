import React from 'react';
import './css/Swiper.css';

export interface SwiperProps {
  config: {
    wrapperHeight: number;
    sensibility: number;
    duration: number;
    refresh?: any;
    load?: any;
  };
  refresh?: () => void;
  load?: () => void;
}
export interface SwiperState {
  distance: number;
  iconDeg: number;
  refreshEnd: boolean;
  loadEnd: boolean;
  duration: number | string;
  refreshText: string;
  refreshImg: string;
  loadText: string;
  loadImg: string;
}

/* 基于translate3d的滑动分页组件
    尚未实现惯性缓动
*/
export default class Swiper extends React.Component<SwiperProps, SwiperState> {
  startY = 0;
  endY = 0;
  down = '../../assets/Swiper/down.png';
  loading = '../../assets/Swiper/loading.gif';
  complete = '../../assets/Swiper/complete.png';
  scrollerHeight = 1000;
  bottomHeight = 0;
  wrapper: any;
  scroller: any;
  timer: any;

  constructor(props: SwiperProps) {
    super(props);
    this.state = {
      distance: 0, // 从touchstart记，到touchend结束，容器滑过的距离
      iconDeg: 0, // 箭头变换角度
      refreshEnd: false, // 刷新是否完成
      loadEnd: false, // 加载是否完成
      duration: 0, // 滑动持续时间，如果config中传了这个参数则默认失效
      refreshText: '下拉刷新',
      refreshImg: this.down,
      loadText: '加载更多',
      loadImg: this.down,
    };
  }

  componentDidMount = () => {
    this.eventBind(this.wrapper);
  };

  reset = () => {
    this.getChildHeight();
  };

  /* 获得childeren元素加载的高度
        这里算法是用 屏幕可视高度-传进来容器高度,
        得到底部div该放到什么地方 */
  getChildHeight = () => {
    const { wrapperHeight } = this.props.config;
    const { scrollHeight } = this.scroller;
    // let height = document.documentElement.clientHeight || document.body.clientHeight;
    // 父页面中非容器元素的高度
    // this.n_differHeight = height - wrapperHeight;
    // 触发加载时要停在底部显示加载中

    this.bottomHeight = scrollHeight - wrapperHeight + 44;
    this.scrollerHeight = scrollHeight;

    // this.setState({});
  };

  // 上下两div行为相似，于是放到一块去绑定事件了
  eventBind = (refs: any) => {
    const { config } = this.props;

    refs.addEventListener('touchstart', (e: any) => {
      // 计时
      this.timer = new Date().getTime();
      // 记录开始滑动时的坐标
      this.startY = e.touches[0].pageY;

      this.setState({ refreshEnd: false, loadEnd: false });
    });

    refs.addEventListener('touchmove', (e: any) => {
      // 放在touchstart里会覆盖children里的click事件
      e.preventDefault();

      // 计算容器滑过的距离
      let distance =
        (e.touches[0].pageY - this.startY) / config.sensibility + this.endY;
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
      /*
        配置里有duration的话就用配置里的
        默认的duration是从touchstart到end的时间
        也就是说滑动时间越长，弹回的越慢
      */
      let duration = config.duration
        ? config.duration
        : (new Date().getTime() - this.timer) / 1000;
      let { distance } = this.state;

      if (distance > 44) {
        // 拖到顶部的情况
        if (this.props.refresh) {
          this.setState({
            refreshImg: this.loading,
            refreshText: '刷新中...',
            distance: 44,
          });
          this.props.refresh();
        }
      } else if (distance > 0 && distance <= 44) {
        // 上方div未超过44的情况
        this.setState({ distance: 0 });
      } else if (distance < 0) {
        // 拖动到底部的情况
        const { offsetHeight, scrollHeight } = this.scroller;
        const differHeight = scrollHeight - offsetHeight;

        // 超出边界回弹
        if (Math.abs(distance) > differHeight) {
          // 这里不能写等于，不然容器拖到底部时，touchstart会触发加载事件
          this.endY = -differHeight;
          // 下拉加载
          if (this.props.load) {
            this.props.load();
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

      this.setState(
        {
          refreshEnd: true,
          loadEnd: true,
          duration,
        },
        () => {
          this.timer = null;
        },
      );
    });
  };

  cancelRefresh = () => {
    // 上方div在加载完后显示更新成功
    this.setState(
      {
        refreshImg: this.complete,
        refreshText: '刷新成功',
        iconDeg: 0,
      },
      () => {
        // 滑回去
        setTimeout(() => {
          this.reset();
          this.setState({
            refreshImg: this.down,
            distance: 0,
            refreshText: '下拉刷新',
          });
        }, 1000);
      },
    );
  };

  cancelLoad = (finishText = '加载完成') => {
    // 下方div在加载完后显示加载成功
    this.setState(
      {
        loadImg: this.complete,
        loadText: finishText,
        iconDeg: 0,
      },
      () => {
        // 滑回去
        setTimeout(() => {
          this.reset();
          this.setState({
            loadImg: this.down,
            distance: this.endY,
            loadText: '加载更多',
          });
        }, 1000);
      },
    );
  };

  render() {
    const { config } = this.props,
      { wrapperHeight } = config;
    const {
      distance,
      iconDeg,
      refreshEnd,
      duration,
      refreshText,
      refreshImg,
      loadEnd,
      loadText,
      loadImg,
    } = this.state;
    const defaultHeight =
      document.documentElement.clientHeight || document.body.clientHeight;

    let refreshStyle = {
      transform: `translate3d(0px, ${distance}px, 0)`,
    };

    if (refreshEnd)
      refreshStyle = Object.assign(refreshStyle, {
        transition: `all ${duration}s ease`,
      });

    let loadStyle = {
      transform: `translate3d(0px, ${distance}px, 0)`,
      top: this.scrollerHeight,
    };

    if (loadEnd)
      loadStyle = Object.assign(loadStyle, {
        top: this.scrollerHeight,
        transition: `all ${duration}s ease`,
      });

    let wrapStyle = Object.assign(
      {},
      { height: wrapperHeight || defaultHeight },
      refreshStyle,
    );

    let refresh: Array<any> = [];

    if (config.refresh === true || config.refresh === undefined) {
      refresh.push(
        <div
          key="refresh_wrapper"
          className={refreshEnd ? 'refresh refresh-end' : 'refresh'}
          style={refreshStyle}
        >
          <span
            className="refresh-icon"
            style={{ transform: `rotateZ(${iconDeg}deg)` }}
          >
            <img src={refreshImg} />
          </span>
          <span className="refresh-text">{refreshText}</span>
        </div>,
      );
    }

    let load: Array<any> = [];

    if (config.load === true || config.load === undefined) {
      load.push(
        <div
          key="load_wrapper"
          className={loadEnd ? 'load load-end' : 'load'}
          style={loadStyle}
        >
          <span
            className="load-icon"
            style={{ transform: `rotateZ(${iconDeg}deg)` }}
          >
            <img src={loadImg} />
          </span>
          <span className="load-text">{loadText}</span>
        </div>,
      );
    }

    return (
      <div className="Swiper">
        <div ref={(ref: any) => (this.wrapper = ref)} className="wrapper">
          {React.Children.map(this.props.children, (child: any) => {
            child = React.cloneElement(child, { className: 'child-z-index-8' });

            return (
              <div>
                <div
                  style={wrapStyle}
                  ref={(ref: any) => (this.scroller = ref)}
                >
                  {child}
                </div>

                {/* 上拉刷新 */}
                {refresh}

                {/* 下拉加载 */}
                {load}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
