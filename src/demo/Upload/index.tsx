import React, { Component } from 'react';
import { Upload } from '../../component/Upload';

export default class UploadDemo extends Component {
  state: { fileList: Array<any>; loading: boolean } = {
    fileList: [],
    loading: false,
  };

  onChange = (file: any) => {
    const { name } = file;

    let formData = new FormData();
    let nameSplit = name.split('.');
    let type = nameSplit[nameSplit.length - 1];

    formData.append('Filedata', file);
    formData.append('Filename', name);
    formData.append('fileext', '*.' + type);
    formData.append('DataType', 'UploadFile');
    formData.append('UploadFolder', '/CommonReport/');
    formData.append('IsConvertOffice', '');
    formData.append('GetFileName', 'y');
    formData.append('TCID', '');
    formData.append('UploadTargetKey', 'n');
    formData.append('GetFileInfo', 'y');

    this.setState({ loading: true });
    fetch('../../mock/uploadFiles.json')
      .then(result => result.text())
      .then(url => {
        const { fileList } = this.state;
        const file = { id: ~~(Math.random() * 10000), url };
        fileList.push(file);

        this.setState({ fileList, loading: false });
      });
  };

  render = () => {
    const { fileList } = this.state;
    return (
      <Upload
        fileList={fileList}
        onChange={this.onChange}
        style={{ padding: 6 }}
      />
    );
  };
}
