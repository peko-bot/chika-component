# Upload

[English](./README.md) | 简体中文

文件选择上传控件

## 实例

https://zy410419243.github.io/chika-component/#/upload

## 用法

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

|   参数   | 说明                                                                                                                           |         类型         | 默认值 |
| :------: | ------------------------------------------------------------------------------------------------------------------------------ | :------------------: | :----: |
| fileList | 已经上传的文件列表（受控）                                                                                                     |  Array<UploadFile>   |   []   |
| onPress  | 长按附件项时触发，传出长按项文件参数                                                                                           | (file: File) => void |  noop  |
| onClick  | 点击附件项时触发，传出长按项文件参数                                                                                           | (file: File) => void |  noop  |
| onChange | 文件状态改变时触发，传出长按项文件参数                                                                                         | (file: File) => void |  noop  |
|  accept  | 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |        string        |   -    |
| multiple | 是否支持多选文件，`ie10+` 支持                                                                                                 |       boolean        | false  |
