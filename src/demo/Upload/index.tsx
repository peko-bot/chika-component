import React, { Component } from 'react';
import { Upload } from '../../component/Upload';

interface UploadFile extends File {
  id: string;
  url: string;
}

export default class UploadDemo extends Component {
  state: { fileList: Array<any>; loading: boolean } = {
    fileList: [],
    loading: false,
  };

  onChange = (file: UploadFile) => {
    const { fileList } = this.state;
    fileList.push(file);
    this.setState({ fileList });
  };

  render = () => {
    const { fileList } = this.state;
    return (
      <Upload
        fileList={fileList}
        onChange={this.onChange}
        style={{ padding: 6 }}
        onPress={() => console.log(11)}
      />
    );
  };
}
