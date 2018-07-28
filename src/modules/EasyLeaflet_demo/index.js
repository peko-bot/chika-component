/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-28 08:09:28
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 23:06:11
 */
import React from 'react';

import k from '../../component/EasyLeaflet';

import Popup from '../../component/EasyLeaflet/Custom/Popup';

import Detail from './popup';

export default class maptest extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			layoutState: false,
			layoutIndex: 1,
			visible: false,
			info: { lat: -1, lng: -1 },
		};
	}

    map = null;
    pageH = document.documentElement.clientHeight || document.body.clientHeight;
    pageW = document.documentElement.clientWidth || document.body.clientWidth;;

    componentDidMount () {
    	this.map = k.init('mapBox', 'dxt', {
    		center: [39.90123456789, 116.2987654321],
    		crs: L.CRS.EPSG3857,
    		zoom: 15,
    		dragging: true,
    		zoomControl: false,
    		attributionControl: false,
    		latlngControl: false,
    		zoomSnap: 0
    	});

    	this.map.on('moveend', e => {
    		const { lat, lng } = this.map.getCenter();

    		this.setState({ visible: true, info: { lat, lng } });
    	});

    	// k.e.zoomIn();
    }

    handleBack = () => this.setState({ visible: false });

    render () {
    	const { info, visible } = this.state;

    	return (
    		<div id='mapBox' style={{ height: this.pageH }}>
    			<Popup>
    				<img src='../../assets/easyLeaflet/defaultIcon.png' style={{ position: 'absolute', top: this.pageH / 2 - 48, left: this.pageW / 2 - 24 }} />

    				<Detail visible={ visible } info={ info } onBack={ this.handleBack } />
    			</Popup>
    		</div>
    	);
    }
}