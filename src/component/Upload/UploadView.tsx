import React, { Component } from 'react';

import './css/UploadView.css';
const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];

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

  extname = (url?: string) => {
    if (!url) {
      return '';
    }
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];

    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
  };

  isImageUrl = (file: any) => {
    if (imageTypes.includes(file.type)) {
      return true;
    }

    const url = file.thumbUrl || file.url;
    const extension = this.extname(url);

    if (
      /^data:image\//.test(url) ||
      /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)
    ) {
      return true;
    } else if (/^data:/.test(url)) {
      // other file types of base64
      return false;
    } else if (extension) {
      // other file types which have extension
      return false;
    }

    return true;
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
      if (this.isImageUrl(url)) {
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
