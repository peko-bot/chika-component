import React, { Component } from 'react';
import './css/index.css';

export interface ProgressProps {
  percent?: number;
  height?: number | string;
  start?: string;
  end?: string;
  active?: boolean;
  customImage?: string;
  innerStyle?: any;
}

export default class Progress extends Component<ProgressProps> {
  render = () => {
    const {
      percent = 50,
      height = 8,
      start,
      end,
      active = false,
      customImage,
      innerStyle,
    } = this.props;

    let backgroundImage;

    if (customImage) {
      backgroundImage = customImage;
    }

    if (start && end) {
      backgroundImage = `linear-gradient(to right, ${start}, ${end})`;
    }

    return (
      <div className="Progress">
        <div className="outer">
          <div className="inner" style={innerStyle}>
            <div
              className={`content ${active ? 'active' : ''}`}
              style={{ height, width: `${percent}%`, backgroundImage }}
            />
          </div>
        </div>
      </div>
    );
  };
}
