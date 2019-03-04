import React, { Component } from 'react';

import './css/Uploader.css';

export default class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  wrapperOnClick = () => {
    let el = this.uploadInput;

    if (!el) {
      return;
    }

    el.click();
    el.value = '';
  };

  onChange = e => {
    let files = e.target.files;

    if (files.length > 0) {
      for (let file of files) {
        this.upload(file);
      }
    }
  };

  upload = file => {
    const { onChange } = this.props;

    onChange && onChange(file);
  };

  render = () => {
    const { isShowPlus = true, plusText } = this.props;

    return (
      <div className="Uploader" style={{ display: isShowPlus ? '' : 'none' }}>
        <div onClick={this.wrapperOnClick} className="wrapper">
          <span className="upload-button">
            <input
              type="file"
              ref={ref => (this.uploadInput = ref)}
              style={{ display: 'none' }}
              onChange={this.onChange}
            />

            <div>
              <i className="plus-icon">+</i>
              <div>{plusText}</div>
            </div>
          </span>
        </div>
      </div>
    );
  };
}
