import React, { Component, createRef } from 'react';
import './css/Uploader.css';

export interface UploaderProps {
  onChange?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  renderPlusItem?: () => void;
}

export default class Uploader extends Component<UploaderProps> {
  uploadInput: React.RefObject<HTMLInputElement>;

  constructor(props: UploaderProps) {
    super(props);
    this.uploadInput = createRef();
  }

  handleInputWrapperClick = () => {
    const element = this.uploadInput.current;
    if (!element) {
      return;
    }
    element.click();
    element.value = '';
  };

  onChange = (e: any) => {
    let files = e.target.files;

    if (files.length > 0) {
      for (let file of files) {
        this.upload(file);
      }
    }
  };

  upload = (file: File) => {
    const { onChange } = this.props;
    onChange && onChange(file);
  };

  render = () => {
    const { renderPlusItem } = this.props;
    const plusItem = (
      <React.Fragment>
        <i className="plus-icon">+</i>
      </React.Fragment>
    );
    return (
      <div className="Uploader">
        <div
          onClick={this.handleInputWrapperClick}
          className="uploader-wrapper"
        >
          <span className="upload-button">
            <input
              type="file"
              ref={this.uploadInput}
              style={{ display: 'none' }}
              onChange={this.onChange}
              multiple
            />
            {renderPlusItem ? renderPlusItem() : plusItem}
          </span>
        </div>
      </div>
    );
  };
}
