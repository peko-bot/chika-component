import React, { Component } from 'react';

import Upload from '../../component/Upload';

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileList: [],
      loading: false,
    };
  }

  componentDidMount = () => {};

  onChange = file => {
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
    // fetch('//jsonplaceholder.typicode.com/posts/', {
    fetch('../../data/uploadFiles.json', {
      // method: 'POST',
      // body: formData,
      // credentials: 'include',
    })
      .then(result => result.text())
      .then(url => {
        let { fileList } = this.state;

        fileList.push({ id: ~~(Math.random() * 10000), url });

        this.setState({ fileList, loading: false });
      });
  };

  onLongPress = () => {};

  onPress = () => {};

  render = () => {
    const { fileList, loading } = this.state;
    const config = {
      fileList,
      onChange: this.onChange,
      onLongPress: this.onLongPress,
      onPress: this.onPress,
      // loading: false,
      // isShowPlus: false,
      // plusText: '添加',
      style: { padding: 6 },
    };

    return <Upload {...config} />;
  };
}
