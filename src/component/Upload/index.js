import React, { Component } from 'react';

import Uploader from './Uploader';
import UploadView from './UploadView';

export default class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = () => {
    const {
      fileList,
      onChange,
      loading,
      style,
      isShowPlus,
      plusText,
    } = this.props;

    return (
      <div className="Upload" style={Object.assign({}, style)}>
        <UploadView fileList={fileList} loading={loading} />
        <Uploader
          onChange={onChange}
          visible={isShowPlus}
          plusText={plusText}
        />
      </div>
    );
  };
}
