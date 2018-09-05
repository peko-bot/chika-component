/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-05 11:09:38
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-05 20:40:10
 */
import React, { Component } from 'react';

import './css/UploadView.css';

const imageTypes = ['image', 'webp', 'png', 'svg', 'gif', 'jpg', 'jpeg', 'bmp'];

export default class UploadView extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

	extname = url => {
		if (!url) {
			return '';
		}
		const temp = url.split('/');
		const filename = temp[temp.length - 1];
		const filenameWithoutSuffix = filename.split(/#|\?/)[0];

		return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
	};

	isImageUrl = file => {
		if (imageTypes.includes(file.type)) {
			return true;
		}

		const url = (file.thumbUrl || file.url);
		const extension = this.extname(url);

		if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
			return true;
		} else if (/^data:/.test(url)) { // other file types of base64
			return false;
		} else if (extension) { // other file types which have extension
			return false;
		}

		return true;
	};

	previewFile = (file, callback) => {
		const reader = new FileReader();

		reader.onloadend = () => callback(reader.result);

		reader.readAsDataURL(file);
	};

	render = () => {
		const { fileList = [], style, loading } = this.props;
		let view = [];
		const loadingView = (
			<div className='img-list' key={ 'loadingView' }>
				<div className='img-wrapper'>
					loading
				</div>
			</div>
		);

		fileList.map((item, i) => {
			const { url } = item;

			let flag = this.isImageUrl(url);

			if(flag) {
				view.push(
					<div className='img-list' key={ 'imgList' + i }>
						<div className='img-wrapper'>
							<img src={ url } />
						</div>
					</div>
				);
			} else {
				view = (
					<span>test</span>
				);
			}
		});

		return (
			<div className='UploadView' style={ Object.assign({}, style) }>
				{ loading ? loadingView : view }
			</div>
		);
	}
}