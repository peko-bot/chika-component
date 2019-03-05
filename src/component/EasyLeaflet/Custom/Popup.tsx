/**自定义内容弹框
 * config 传入的配置
 * lat : 纬度
 * lng : 经度
 * direction : 方向 top/bottom/left/right
 * height : 高度
 * width : 宽度
 * x : x轴偏移
 * y : y轴偏移
 */
import React from 'react';
import '../css/style';

export interface PopupProps {
  config?: any;
}

export default class Popup extends React.Component<PopupProps> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {};
  }
  moveFun = (_: Event) => {
    this.setState({});
  };
  render() {
    // let { config } = this.props;
    // let dx, dy;
    // if (map) {
    //   switch (config.direction) {
    //     case 'top':
    //       dx = -(parseFloat(config.width) / 2) + config.x;
    //       dy = -parseFloat(config.height) + config.y;
    //       break;
    //     case 'bottom':
    //       dx = -(parseFloat(config.width) / 2) + config.x;
    //       dy = config.y;
    //       break;
    //     case 'left':
    //       dx = -parseFloat(config.width) + config.x;
    //       dy = -(parseFloat(config.height) / 2) + config.y;
    //       break;
    //     case 'right':
    //       dx = config.x;
    //       dy = -(parseFloat(config.height) / 2) + config.y;
    //       break;
    //     default:
    //       dx = config.x;
    //       dy = config.y;
    //       break;
    //   }
    // }
    return (
      <div
        style={{
          position: 'absolute',
          zIndex: 9997,
          width: '100%',
          height: '80%',
        }}
      >
        {React.Children.map(this.props.children, child => {
          return <div>{child}</div>;
        })}
      </div>
    );
  }
}
