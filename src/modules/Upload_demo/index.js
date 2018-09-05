/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-04 13:46:42
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 14:42:57
 */
import React, { Component } from 'react';

import Upload from '../../component/Upload';

export default class index extends Component {
	constructor (props) {
		super(props);

		this.state = {
			fileList: [],
		};
	}

	componentDidMount = () => {

	}

	onChange = file => {
		const { name } = file;

		console.log(file);

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

				this.setState({ fileList });
			});
	}

	render = () => {
		const { fileList } = this.state;

		console.log(fileList);
		return (
			<div className='index'>
				<Upload fileList={ fileList } onChange={ this.onChange } />
			</div>
		);
	}
}