import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Upload from '../Upload';
import { ajax, isDev } from '../../util/urlHelper';

function noop() {}

export default class UploadWrapper extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {
    onChange: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
    };
    this.uploadIds = [];
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
    const update = (file, result) => {
      const { onChange } = this.props;
      let { fileList } = this.state;
      const fileId = result.split('|')[0];

      file.url = this.getObjectURL(file);
      file.id = fileId;

      fileList.push(file);
      this.setState({ fileList }, () => {
        this.uploadIds.push(fileId);
        this.uploadIds = Array.from(new Set(this.uploadIds));
        onChange(this.uploadIds.toString());
      });
    };

    if (isDev) {
      update(file, ~~(Math.random() * 100) + '|');
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
          update(file, result);
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

  handleLongPress = ({ name, id }, e) => {
    const { onChange } = this.props;
    let { fileList } = this.state;

    fileList = fileList.filter(item => item.name != name);

    this.uploadIds = this.uploadIds.filter(fileId => fileId != id);
    onChange(this.uploadIds.toString());

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
