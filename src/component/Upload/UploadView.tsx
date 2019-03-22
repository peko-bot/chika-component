import React, { Component } from 'react';
import './css/UploadView.css';
import { isImageUrl } from './utils';

export interface UploadViewProps {
  fileList?: Array<any>;
  loading?: boolean;
  onPress?: () => void;
  onClick?: () => void;
}

export default class UploadView extends Component<UploadViewProps> {
  timer: any;

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  };

  previewFile = (file: any, callback: (result: any) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => callback(reader.result);
    reader.readAsDataURL(file);
  };

  handleViewTouchStart = () => {
    this.timer = setTimeout(() => {
      if (this.props.onPress) {
        this.props.onPress();
      }
    }, 800);
  };

  handleTouchEnd = () => {
    clearTimeout(this.timer);
  };

  render = () => {
    const { fileList = [], loading } = this.props;
    let view: any = [];
    const loadingView = (
      <div className="img-list" key={'loadingView'}>
        <div className="img-wrapper">loading</div>
      </div>
    );

    fileList.map((item, i) => {
      const { url } = item;
      if (isImageUrl(url)) {
        view.push(
          <div
            className="img-list"
            key={'imgList' + i}
            onTouchStart={this.handleViewTouchStart}
            onTouchMove={this.handleTouchEnd}
            onTouchEnd={this.handleTouchEnd}
          >
            <div className="img-wrapper">
              <img src={url} />
            </div>
          </div>,
        );
      } else {
        view = <span>test</span>;
      }
    });

    return <div className="UploadView">{loading ? loadingView : view}</div>;
  };
}
