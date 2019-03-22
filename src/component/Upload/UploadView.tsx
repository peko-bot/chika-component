import React, { Component } from 'react';
import './css/UploadView.css';
import { isImageUrl } from './utils';
import { UploadFile } from './Uploader';
import Uploader, { UploaderProps } from './Uploader';

export interface UploadViewProps extends UploaderProps {
  fileList?: Array<UploadFile>;
  onPress?: () => void;
  onClick?: () => void;
}

export default class UploadView extends Component<UploadViewProps> {
  timer: any;

  componentWillUnmount = () => {
    this.clearTimer();
  };

  handleViewTouchStart = () => {
    this.timer = setTimeout(() => {
      if (this.props.onPress) {
        this.props.onPress();
      }
    }, 800);
  };

  clearTimer = () => {
    clearTimeout(this.timer);
  };

  render = () => {
    const { fileList = [], onChange, accept, multiple } = this.props;
    const uploader = (
      <Uploader
        fileList={fileList}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
      />
    );
    const list = fileList.length ? (
      <div
        className="upload-view-list"
        onTouchStart={this.handleViewTouchStart}
        onTouchMove={this.clearTimer}
        onTouchEnd={this.clearTimer}
      >
        {fileList.map(item => {
          const { url, id, name } = item;
          if (isImageUrl(url)) {
            return (
              <div className="upload-item" key={`upload-item-${id}`}>
                <img src={url} />
              </div>
            );
          } else {
            return (
              <div className="upload-item" key={`upload-item-${id}`}>
                {name}
              </div>
            );
          }
        })}
        {uploader}
      </div>
    ) : (
      uploader
    );
    return <div className="uploadView">{list}</div>;
  };
}
