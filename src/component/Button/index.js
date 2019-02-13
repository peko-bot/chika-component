import React from 'react';

import './css/Button.css';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    type: 'primary',
    text: 'test',
    width: 60,
    height: 28,
  };

  handleClick = e => {
    const { onChange } = this.props;

    onChange && onChange(e);
  };

  render = () => {
    const { text, type, children, style, width, height } = this.props;

    return (
      <div className="Button">
        <button
          className={`common ${type}`}
          onClick={this.handleClick}
          style={style ? style : { width, height }}
        >
          <span>{children === undefined ? text : children}</span>
        </button>
      </div>
    );
  };
}
