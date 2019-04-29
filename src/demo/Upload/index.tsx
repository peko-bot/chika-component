import React, { Component } from 'react';
import Upload from '../../component/Upload';

interface UploadFile extends File {
  id: string;
  url: string;
  error: boolean;
}

export default class UploadDemo extends Component {
  state: { fileList: Array<UploadFile>; loading: boolean } = {
    fileList: [],
    loading: false,
  };

  componentDidMount = async () => {
    const response = await fetch('./assets/uploadFiles.json');
    const { data } = await response.json();
    const fileList: any = [];
    for (const item of data) {
      fileList.push({
        url: item.filepath,
        id: item.id,
      });
    }
    this.setState({ fileList });
  };

  onChange = (file: UploadFile) => {
    const { fileList } = this.state;
    fileList.push(file);
    this.setState({ fileList });
  };

  handleClick = (file: UploadFile) => {
    const { fileList } = this.state;
    const index = fileList.findIndex(f => f.id === file.id);
    fileList[index].error = !fileList[index].error;
    this.setState({ fileList });
  };

  handlePress = (file: UploadFile) => {
    const { fileList } = this.state;
    const index = fileList.findIndex(f => f.id === file.id);
    fileList.splice(index, 1);
    this.setState({ fileList });
  };

  render = () => {
    const { fileList } = this.state;
    return (
      <Upload
        fileList={fileList}
        onChange={this.onChange}
        style={{ padding: 6 }}
        onClick={this.handleClick}
        onPress={this.handlePress}
      />
    );
  };
}
