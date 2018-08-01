/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-28 08:09:28
 * @Last Modified by: zy9
 * @Last Modified time: 2018-08-01 11:27:32
 */
import React from 'react';

import k from '../../component/EasyLeaflet';

import Popup from '../../component/EasyLeaflet/Custom/Popup';
import Detail from './popup';

import { GetParams } from '../../util/GetParams';

export default class maptest extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			layoutState: false,
			layoutIndex: 1,
			info: { lat: '', lng: '', address: '' },
		};
	}

    map = null;
    pageH = document.documentElement.clientHeight || document.body.clientHeight;
    pageW = document.documentElement.clientWidth || document.body.clientWidth;;

    componentDidMount = () => {
    	const center = [GetParams('lat') || 29.9502, GetParams('lng') || 121.4839];

    	// 重画
    	const mapInit = () => {
    		this.map = k.init('mapBox', 'dxt', {
    			center,
    			crs: L.CRS.EPSG3857,
    			zoom: 15,
    			dragging: true,
    			zoomControl: false,
    			attributionControl: false,
    			latlngControl: false,
    			zoomSnap: 0
    		});
    	};

    	mapInit();

    	// 避免第二次跳转到地图时，地图会变灰
    	setTimeout(() => {
    		this.map.remove();

    		mapInit();

    		// 获得默认坐标
    		k.e.zoomIn();

    		this.map.on('moveend', e => {
    			let { lat, lng, address = '暂不支持地址显示' } = this.map.getCenter();

    			window.parent.leafletLatng = `${ lng }|${ lat }|${ address }`;

    			this.setState({ info: { lat, lng, address } });
    		});
    	}, 0);
    }

    render = () => {
    	const { info } = this.state;

    	return (
    		<div id='mapBox' style={{ height: this.pageH }}>
    			<Popup>
    				<img src='../../assets/easyLeaflet/defaultIcon.png' style={{ position: 'absolute', top: this.pageH / 2 - 48, left: this.pageW / 2 - 24 }} />

    				<Detail info={ info } />
    			</Popup>
    		</div>
    	);
    }
}