import React from 'react';
import './css/Tabs.css';

export interface TabsProps {
  currentSelect: number;
  children: any;
  config?: any;
  onClick?: (item: any, currentSelect: number) => void;
}
export interface TabsState {
  currentSelect: number;
  underlineItem: { width: number; underlineWidth: number; left: number };
  dataSource: Array<any>;
  rippleConfig: {
    scale: number;
    offsetLeft: number;
    offsetTop: number;
    opacity: number;
    displayFlag: boolean;
  };
}

export default class Tabs extends React.Component<TabsProps, TabsState> {
  constructor(props: TabsProps) {
    super(props);
    this.state = {
      currentSelect: 0,
      underlineItem: {
        // 下划线参数
        width: 0,
        underlineWidth: 0,
        left: 0,
      },
      dataSource: [], // 页签项数据，比如除了字符串还传了其他东西
      rippleConfig: {
        scale: 0, // 点击波纹缩放
        offsetLeft: 0, // 偏移量
        offsetTop: 0,
        opacity: 1, // 透明度
        displayFlag: false, // 用于判断二次点击时是否产生波纹
      },
    };
  }

  componentWillMount = () => {
    this.handleChildrenDatas();
  };

  // 用于label动态更新
  componentWillReceiveProps = (nextProps: TabsProps) => {
    const { children } = nextProps;

    this.handleChildrenDatas(children);
  };

  componentDidMount = () => {
    this.resetUnderline();
  };

  /*
    预处理页签项数据
    一种情况是传入字符串，这直接显示出来就好
    另一种是除了字符串还传了其他东西，也就是一个对象。
    这种在里面加上label字段，其他参数在点击页签项的时候抛出
    除了这两种情况，其他传入都是报错
  */
  handleChildrenDatas = (children = this.props.children) => {
    const dataSource: Array<any> = [];
    React.Children.map(children, child => {
      let obj: any = {};
      if (typeof child.props.label === 'string') {
        obj.label = child.props.label;
      } else {
        obj = child.props.label;
      }
      dataSource.push(obj);
    });
    this.setState({ dataSource });
  };

  /*
        重置下划线宽度
        根据span被字撑开的宽度计算下划线起始位置及宽度
        有挺多无用渲染的 mark
    */
  resetUnderline = () => {
    setTimeout(() => {
      const { currentSelect } = this.props;
      // 页签项下划线宽度
      const coefficient = [];

      for (let i = 0; i < this.state.dataSource.length; i++) {
        const spanWidth = (this as any)[`panel_span_${i}`].offsetWidth;
        const itemWidth = (this as any)[`panel_item_${i}`].offsetWidth;
        const itemHeight = (this as any)[`panel_item_${i}`].offsetHeight;

        (this as any)[`panel_item_${i}`].addEventListener(
          'transitionend',
          () => {
            this.state.rippleConfig.displayFlag = false;
            this.setState({});
          },
        );
        coefficient.push({
          underlineWidth: spanWidth + 20,
          left: (itemWidth - spanWidth) / 2 - 12 + currentSelect * itemWidth,
          width: itemWidth,
          height: itemHeight,
        });
      }
      this.setState({ underlineItem: coefficient[currentSelect] });
    }, 0);
  };

  handleClick = (item: any, currentSelect: number, event: any) => {
    const { rippleConfig, underlineItem } = this.state;
    const { pageX, pageY } = event;
    this.resetUnderline();
    this.setState(
      {
        rippleConfig: {
          scale: +underlineItem.width,
          offsetLeft: pageX as number,
          offsetTop: pageY as number,
          opacity: 1,
          displayFlag: true,
        },
      },
      () => {
        rippleConfig.opacity = 0;
        this.setState({ rippleConfig });
      },
    );

    if (this.props.onClick) this.props.onClick(item, currentSelect);
  };

  render() {
    const { config = {}, currentSelect, children } = this.props;
    /* 当传width时，页签项定宽，
    超出宽度时可滑动，惯性弹回，
    未超出屏幕时就当没传 plan
    不传时按页签项数量平分父容器的宽度 */
    const { containerStyle, undelineStyle, fontStyle } = config;
    const { dataSource, underlineItem, rippleConfig } = this.state;
    const { scale, offsetLeft, offsetTop, opacity, displayFlag } = rippleConfig;

    // 波纹
    const rippleStyle = Object.assign(
      {},
      {
        top: offsetTop,
        left: offsetLeft - currentSelect * underlineItem.width,
      },
      {
        width: 2,
        height: 2,
        background: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        transform: `scale(${scale})`,
        transition:
          'transform .7s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .7s cubic-bezier(0.250, 0.460, 0.450, 0.940)',
        borderRadius: '50%',
        opacity,
      },
    );

    const tabs = [];

    tabs.push(
      <ul key="container_ul" className="container" style={containerStyle}>
        {dataSource.map((item, i) => {
          return (
            <li
              key={`dataSource_${i}`}
              className="item"
              style={Object.assign(
                { width: 100 / dataSource.length + '%' },
                fontStyle,
              )}
              onClick={e => this.handleClick(item, i, e)}
              ref={ref => ((this as any)[`panel_item_${i}`] = ref)}
            >
              <span
                className={currentSelect === i ? 'active' : ''}
                ref={ref => ((this as any)[`panel_span_${i}`] = ref)}
              >
                {item.label}
              </span>
              <div
                style={currentSelect === i && displayFlag ? rippleStyle : {}}
              />
            </li>
          );
        })}
      </ul>,
    );

    const underline = [];
    const { underlineWidth, left } = underlineItem;

    underline.push(
      <div
        key="underline"
        className="underline-container"
        style={containerStyle}
      >
        <div
          className="underline"
          style={Object.assign(
            {
              width: underlineWidth,
              transform: `translate3d(${left}px, 0, 0)`,
            },
            undelineStyle,
          )}
        />
      </div>,
    );

    return (
      <div className="Tabs">
        {tabs}
        {underline}
        {React.Children.map(children, (child, i) => {
          return (
            <div
              key={`child_${i}`}
              className="child-content"
              style={{
                transform: `translate3d(${(i - currentSelect) * 100}%, 0, 0)`,
              }}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }
}
