import React, { Component } from 'react';
import Progress from '../../component/Progress';
import './css/index.css';

export default class ProgressDemo extends Component {
  render = () => {
    const customImage = `linear-gradient(90deg,
            #feda3d 0%,
            #80b99e 0%,
            #0298ff 0%,
            #02ccff 39%,
            #01fefc 100%)`;

    return (
      <div
        className="Progress_demo"
        style={{
          background: '#ccc',
          height: document.documentElement.clientHeight,
        }}
      >
        <div style={{ width: '70%', float: 'left', marginRight: 15 }}>
          <Progress
            percent={70}
            height={20}
            customImage={customImage}
            innerStyle={{ background: 'rgba(255, 255, 255, 0.4)' }}
            active
          />
        </div>
        <span>70</span>
      </div>
    );
  };
}
