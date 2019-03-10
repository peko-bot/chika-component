import React, { Component } from 'react';

import Uploader from './Uploader';
import UploadView from './UploadView';

export interface UploadProps {
  fileList?: Array<any>;
  onChange?: (file: any) => void;
  loading?: boolean;
  style?: any;
  isShowPlus?: boolean;
  plusText?: string;
  longPress?: (item: any, e: any) => void;
}

export default class Upload extends Component<UploadProps> {
  render = () => {
    const {
      fileList,
      onChange,
      loading,
      style,
      isShowPlus,
      plusText,
      longPress,
    } = this.props;
    return (
      <div className="Upload" style={Object.assign({}, style)}>
        <UploadView
          fileList={fileList}
          loading={loading}
          longPress={longPress}
        />
        <Uploader
          onChange={onChange}
          visible={isShowPlus}
          plusText={plusText}
        />
      </div>
    );
  };
}
