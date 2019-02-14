import React, { Component } from 'react';
import Upload from '../Upload';
import { ajax, isDev } from '../../util/urlHelper';

export default class UploadWrapper extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
    };
  }

  componentDidMount = () => {};

  getObjectURL = file => {
    let url = null;
    if (window.createObjectURL != undefined) {
      // basic
      url = window.createObjectURL(file);
    } else if (window.URL != undefined) {
      // mozilla(firefox)
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      // webkit or chrome
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  };

  handleChange = file => {
    file.url = this.getObjectURL(file);
    const update = file => {
      let { fileList } = this.state;
      fileList.push(file);
      this.setState({ fileList });
    };
    if (isDev) {
      update(file);
    } else {
      ajax({
        key: 'upload',
        params: {
          method: 'POST',
          body: this.getUploadParam(file),
          mode: 'cors',
        },
        type: 'text',
        success: result => {
          update(file);
        },
      });
    }
  };

  getUploadParam = file => {
    let param = new FormData();

    param.append('Filedata', file);
    param.append('Filename', file.name);
    param.append(
      'fileext',
      '*.' + file.name.split('.')[file.name.split('.').length - 1],
    );
    param.append('DataType', 'UploadFile');
    param.append('UploadFolder', '/Attachement/');
    param.append('IsConvertOffice', '');
    param.append('GetFileName', 'y');
    param.append('TCID', '');
    param.append('UploadTargetKey', 'n');
    param.append('GetFileInfo', 'y');

    return param;
  };

  handleLongPress = ({ name }, e) => {
    let { fileList } = this.state;

    fileList = fileList.filter(item => item.name != name);

    this.setState({ fileList });
  };

  render = () => {
    const { fileList } = this.state;
    return (
      <div className="UploadWrapper">
        <Upload
          fileList={fileList}
          onChange={this.handleChange}
          longPress={this.handleLongPress}
        />
      </div>
    );
  };
}
