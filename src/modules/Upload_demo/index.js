/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:46:42
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 20:54:53
 */
import React, { Component } from 'react';

import Upload from '../../component/Upload';

export default class index extends Component {
	constructor (props) {
		super(props);

		this.state = {
			fileList: [],
			loading: false,
		};
	}

	componentDidMount = () => {

	}

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

				setTimeout(() => {
					this.setState({ fileList, loading: false });
				}, 2000);
			});
	}

	onLongPress = () => {

	}

	onPress = () => {

	}

	render = () => {
		const { fileList, loading } = this.state;

		return (
			<div className='index' style={{ padding: 6 }}>
				<Upload fileList={ fileList } onChange={ this.onChange } onLongPress={ this.onLongPress } onPress={ this.onPress } loading={ false } />
			</div>
		);
	}
}