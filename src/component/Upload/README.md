# Upload

English | [简体中文](./README-zh_CN.md)

Upload file by selecting

## Demo

https://zy410419243.github.io/chika-component/#/upload

## Usage

```js
import React from 'react';
import { Upload } from 'chika-component';

export default class UploadDemo extends Component {
  state = {
    fileList: [],
    loading: false,
  };

  componentDidMount = () => {
    ajax({
      url: './assets/uploadFiles.json',
      success: ({ data }) => {
        const fileList: any = [];
        for (const item of data) {
          fileList.push({
            url: item.filepath,
            id: item.id,
          });
        }
        this.setState({ fileList });
      },
    });
    this.setState({
      fileList: [
        {
          filepath: './assets/d19f18a8ly1g0akzu7cq5j20u016gnpe.jpg',
          filetile: 'name0',
          filename: 'xls',
          id: 1,
        },
        {
          filepath: './assets/d19f18a8ly1g0akzu7cq5j20u016gnpe.jpg',
          filetile: 'name1',
          filename: 'doc',
          id: 2,
        },
      ],
    });
  };

  onChange = file => {
    const { fileList } = this.state;
    fileList.push(file);
    this.setState({ fileList });
  };

  handleClick = file => {
    const { fileList } = this.state;
    const index = fileList.findIndex(f => f.id === file.id);
    fileList[index].error = !fileList[index].error;
    this.setState({ fileList });
  };

  handlePress = file => {
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
```

## API

### Upload props

|   name   | description                                                                                                                                |         type         | default |
| :------: | ------------------------------------------------------------------------------------------------------------------------------------------ | :------------------: | :-----: |
| fileList | list of files that have been uploaded (controlled)                                                                                         |  Array<UploadFile>   |   []    |
| onPress  | called with file item when upload view item is on long press                                                                               | (file: File) => void |  noop   |
| onClick  | called with file item when upload view item clicked                                                                                        | (file: File) => void |  noop   |
| onChange | called with file item when uploading state changed                                                                                         | (file: File) => void |  noop   |
|  accept  | file types that can be accepted. See [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |        string        |    -    |
| multiple | whether to support selected multiple file. `IE10+` supported                                                                               |       boolean        |  false  |
