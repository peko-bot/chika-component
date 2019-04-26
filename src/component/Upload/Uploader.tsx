import React, { Component, createRef } from 'react';
import './css/Uploader.css';
import { isImageUrl } from './utils';

export interface UploadFile extends File {
  id: string;
  url: string;
  error: boolean;
}
export interface UploaderProps {
  onChange?: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  renderPlusItem?: () => void;
  fileList?: Array<UploadFile>;
}

export default class Uploader extends Component<UploaderProps> {
  uploadInput: React.RefObject<HTMLInputElement>;

  constructor(props: UploaderProps) {
    super(props);
    this.uploadInput = createRef();
  }

  triggerInputUpload = () => {
    const element = this.uploadInput.current;
    if (!element) {
      return;
    }
    element.click();
    element.value = '';
  };

  onChange = (e: any) => {
    const { onChange } = this.props;
    const file = e.target.files.length ? e.target.files[0] : null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = { url: reader.result };
      file.url = null;
      if (isImageUrl(result)) {
        file.url = reader.result;
      }
      file.id = file.size.toString() + new Date().getTime();
      if (onChange) {
        onChange(file);
      }
    };
  };

  render = () => {
    const { renderPlusItem, multiple } = this.props;
    const plusItem = <i className="plus-icon">+</i>;
    return (
      <div className="uploader">
        <div onClick={this.triggerInputUpload} className="upload-item">
          <span className="upload-button">
            <input
              type="file"
              ref={this.uploadInput}
              style={{ display: 'none' }}
              onChange={this.onChange}
              multiple={multiple}
            />
            {renderPlusItem ? renderPlusItem() : plusItem}
          </span>
        </div>
      </div>
    );
  };
}
