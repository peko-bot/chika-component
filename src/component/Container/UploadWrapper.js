import React, { Component } from 'react';
import Upload from '../Upload';
import { ajax } from '../../util/urlHelper';

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

  handleChange = file => {
    ajax({
      key: 'upload',
      params: {
        method: 'POST',
        body: this.getUploadParam(file),
        mode: 'cors',
      },
      type: 'text',
      success: result => {},
    });
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

  render = () => {
    const { fileList } = this.state;
    return (
      <div className="UploadWrapper">
        <Upload fileList={fileList} onChange={this.handleChange} />
      </div>
    );
  };
}
