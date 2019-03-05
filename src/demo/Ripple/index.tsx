import React from 'react';

import Ripple from '../../component/Ripple';
import './css/Ripple_demo.css';

export default class RippleDemo extends React.Component {
  dataSource = [{ label: 'test1' }, { label: 'test2' }];
  render() {
    return (
      <div className="Ripple_demo">
        {this.dataSource.map((item, i) => {
          return (
            <div className="item" key={'item' + i}>
              <div
                ref={(ref: any) => ((this as any)[`item_${i}`] = ref)}
                className="item-label"
              >
                {item.label}
              </div>
              <Ripple
                ref={ref => ref && ref.init((this as any)[`item_${i}`])}
                wrapWidth={document.body.clientWidth}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
