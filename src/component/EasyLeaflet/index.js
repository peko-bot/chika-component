import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './css/easyLeaflet.css';

import { defaultIconStyle, measureRangePoint, measureAreaPoint, markerControlPoint, defaultLineStyle, defaultAreaStyle, moveAreaStyle, defaultPopupStyle, defaultDivStyle, controlLinePoint } from './css/style';

import { eHelper } from './helper';

import MeasureRange from './Tool/MeasureRange';
import MeasureArea from './Tool/MeasureArea';
import ControlLine from './Tool/ControlLine';
import ControlPoint from './Tool/ControlPoint';
import ControlCircle from './Tool/ControlCircle';

/**地图对象 */
let map = null, layerObject = {}, event = {}, range = {}, area = {}, controlPoint = {}, controlCircle = {}, controlLine = {};
/**全局参数 */
const MOVE = 'MAP_MOVE';
const MOUSEMOVE = 'MAP_MOUSEMOVE';
const CLICK = 'MAP_CLICK';
const MOUSEDOWN = 'MAP_MOUSEDOWN';
const MOUSEUP = 'MAP_MOUSEUP';
const ZOOMEND = 'MAP_ZOOMEND';
const HOVERPOPUPID = 'leaflet_popup_hover_wrap';
const earthRadiusMeters = 6371000.0;
const metersPerDegree = 2.0 * Math.PI * earthRadiusMeters / 360.0;
const radiansPerDegree = Math.PI / 180.0;
const degreesPerRadian = 180.0 / Math.PI;
/**默认地图参数 */
let defaultMapArgument = {
	center: [31.800, 121.660],  // 中心点
	crs: L.CRS.EPSG3857,     // wkid
	zoom: 7,                  // 地图显示等级
	maxZoom: 18,                 // 最大显示等级
	minZoom: 1,                  // 最小显示等级
	dragging: true,               // 是否允许拖拽
	zoomControl: true,               // 放大缩小控件
	attributionControl: false,              // 地图描述控件
	latlngControl: true                // 鼠标位置经纬度显示控件
};
/**图层参数 */
const tile = {
	googleTile: L.tileLayer('http://{s}.google.cn/vt/lyrs=t@130,r@203000000&hl=zh-CN&gl=cn&src=app&x={x}&y={y}&z={z}&s=Gal', { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }),
	googleRsTile: L.tileLayer('http://mt{s}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}', { subdomains: ['1', '2', '3'] }),
	googleTrafficTile: L.tileLayer('http://mt{s}.google.cn/vt/lyrs=m@209000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galileo', { subdomains: ['1', '2', '3'] }),
	TDTurl: 'http://t{s}.tianditu.com/vec_c/wmts',
	NameUrl: 'http://t{s}.tianditu.com/cva_c/wmts',
	imgUrl: 'http://t{s}.tianditu.com/img_c/wmts',
	imgNameUrl: 'http://t{s}.tianditu.com/cia_c/wmts',
	Gjtt: L.tileLayer('http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', { subdomains: ['1', '2', '3', '4'] }),
	Gygt: L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', { subdomains: ['1', '2', '3', '4'] }),
	GygtName: L.tileLayer('http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}', { subdomains: ['1', '2', '3', '4'] }),
	test0: L.tileLayer('http://t{s}.tianditu.cn/dataSourceServer?T=img_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	Tdxt: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	TdxtName: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	Tygt: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	TygtName: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	Tjtt: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	TjttName: L.tileLayer('http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}', { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] }),
	'map_4490': L.tileLayer('http://218.94.6.92:6080/arcgis/rest/services/jspub_raster_L4_L20/MapServer'),
	'map_4490_name': L.tileLayer('http://218.94.6.92:6080/arcgis/rest/services/jspub_raster_anno_L3_L20/MapServer')
};
/**地图初始化
 * dxt   : 谷歌地形图
 * ygt   : 谷歌遥感图
 * jtt   : 谷歌交通图
 * Tdxt  : 天地图地形图
 * Tygt  : 天地图遥感图
 * Tjtt  : 天地图交通图
 * Gdxt  : 高德地形图
 * Gygt  : 高德遥感图
 * _Tjtt : 天地图交通图4326
 * _Tygt : 天地图遥感图4326
*/
const init = (dom, type, params) => {
	let mapArgument = (params) ? Object.assign({}, defaultMapArgument, params) : defaultMapArgument;

	mapArgument.crs = [mapArgument.crs, L.CRS.EPSG3857, L.CRS.EPSG4326][Math.ceil((['dxt', 'ygt', 'jtt', 'Gdxt', 'Gygt', 'Tdxt', 'Tygt', 'Tjtt', '_Tjtt', '_Tygt', 'map_4490'].indexOf(type) + 1) / 8)];
	map = L.map(dom, mapArgument);
	switch (type) {
		case 'dxt': tile.googleTile.addTo(map); break;
		case 'ygt': tile.googleRsTile.addTo(map); break;
		case 'jtt': tile.googleTrafficTile.addTo(map); break;
		case '_Tjtt': eHelper.init_4326(); eHelper.addTDT(tile.TDTurl, 'vec'); eHelper.addTDT(tile.NameUrl, 'cva'); break;
		case '_Tygt': eHelper.init_4326(); eHelper.addTDT(tile.imgUrl, 'img'); eHelper.addTDT(tile.imgNameUrl, 'cia'); break;
		case 'Gdxt': tile.Gjtt.addTo(map); break;
		case 'Gygt': tile.Gygt.addTo(map); tile.GygtName.addTo(map); break;
		case 'Tdxt': tile.Tdxt.addTo(map); tile.TdxtName.addTo(map); break;
		case 'Tygt': tile.Tygt.addTo(map); tile.TygtName.addTo(map); break;
		case 'Tjtt': tile.Tjtt.addTo(map); tile.TjttName.addTo(map); break;
		case 'map_4490': eHelper.init_4490(); eHelper.addSpecialLayer(tile.map_4490, 3); eHelper.addSpecialLayer(tile.map_4490_name, 2); eHelper.init_4326(); break;
		default: break;
	}
	if (mapArgument.latlngControl) {
		L.Control.LatLng = L.Control.extend({
			options: {
				position: 'bottomleft'
			},
			initialize: function (options) {
				L.Util.extend(this.options, options);
				eHelper.on(event, MOUSEMOVE, this.moveFun);
				eHelper.on(event, CLICK, this.moveFun);
			},
			onAdd: function (map) {
				this.container = L.DomUtil.create('div', 'leaflet-control-latlng');
				return this.container;
			},
			moveFun: function (e) {
				let lat = eHelper.latlngFormat(e.latlng.lat),
					lng = eHelper.latlngFormat(e.latlng.lng);

				document.getElementsByClassName('leaflet-control-latlng')[0].innerHTML = lng.value + ' ' + ['W', 'E'][lng.key] + '　' + lat.value + ' ' + ['S', 'N'][lat.key];
			}
		});
		let LatLng = new L.Control.LatLng({});

		LatLng.addTo(map);
	}
	let popupDom = document.createElement('div');

	popupDom.id = HOVERPOPUPID;
	document.getElementById(dom).appendChild(popupDom);
	return map;
};
/**打点
 * points : array
 * event : 事件绑定 为Object时 默认绑定为click事件  或者 为数据 自定义需要绑定的事件
 * iconSetting : 点样式 参照默认值 defaultIncoStyle
 * tooltipSetting.options {offset : [0,0] 偏移值,permanent : true/false,direction : top/right/bottom/left 方向}
 * tooltipSetting.content '@{key}'
 * popupSetting {title : 标题名称key , tBgColor : color , tColor : color, width : --px}
 * popupSetting.rows {name : '名称',key : '绑定字段',nWidth : '名称宽度 百分比',vWidth : '值宽度 百分比',bgColor : '背景颜色'}
 * groupName 点对象分组
*/
const addPoints = (points, event, { iconSetting = defaultIconStyle, tooltipSetting, popupSetting, hoverBoxSetting, groupName }) => {
	let markerGroup = new L.MarkerClusterGroup(), markers = [];

	points.map((point, i) => {
		let marker = L.marker([point.lat, point.lng], { icon: L.icon(iconSetting), data: point });

		if (tooltipSetting) {
			let tooltip = L.tooltip(tooltipSetting.options).setContent(eHelper.templateValue(tooltipSetting.content, point));

			marker.bindTooltip(tooltip).openTooltip();
		}
		if (popupSetting) {
			let popup = L.popup().setContent(eHelper.popupTemplate(popupSetting, point));

			marker.bindPopup(popup, popupSetting.options || {});
		}
		if (event) {
			if (eHelper.isFunction(event)) {
				marker.on('click', (e) => event(e, e.target.options.data));
			} else if (eHelper.isObject(event)) {
				for (let p in event) {
					marker.on(p, (e) => event[p](e, e.target.options.data));
				}
			}
		}
		!!hoverBoxSetting && marker.on('mouseover', (e) => mouseoverEvent(e, e.target.options.data));
		!!hoverBoxSetting && marker.on('mouseout', (e) => mouseoutEvent(e, e.target.options.data));
		markers.push(marker);
	});
	markerGroup.addLayers(markers);
	map.addLayer(markerGroup);
	if (groupName) { layerObject[groupName] = markerGroup; }
	let mouseoverEvent = (e, data) => {
		let PopupConfig = {
			lat: e.latlng.lat,
			lng: e.latlng.lng,
			direction: hoverBoxSetting.direction || 'top',
			height: hoverBoxSetting.rows.length * 36 + 40,
			width: hoverBoxSetting.width || 100,
			x: [0, 0, -15, 15][['top', 'bottom', 'left', 'right'].indexOf(hoverBoxSetting.direction || 'top')],
			y: [-15, 15, 0, 0][['top', 'bottom', 'left', 'right'].indexOf(hoverBoxSetting.direction || 'top')]
		};
		let Dom = document.getElementById(HOVERPOPUPID);

		!!Dom && ReactDOM.render(<Popup config={PopupConfig}><ValueKey config={hoverBoxSetting} dataSource={data} /></Popup>, Dom);
	};
	let mouseoutEvent = (e) => {
		let Dom = document.getElementById(HOVERPOPUPID);

		!!Dom && ReactDOM.render(<div></div>, Dom);
	};
};
/**画线
 * lines 线数据
 * event 事件绑定
 * lineSetting 线样式 参照 defaultLineStyle
 * groupName 线对象分组
*/
const addLines = (lines, event, { lineSetting, groupName }) => {
	let style = Object.assign({}, defaultLineStyle, lineSetting),
		polyline = L.polyline(lines, style).addTo(map);
	//eHelper.addLatLng(polyline,lines);

	if (event) {
		if (eHelper.isFunction(event)) {
			polyline.on('click', (e) => event(e, e.target.options.data));
		} else if (eHelper.isObject(event)) {
			for (let p in event) {
				polyline.on(p, (e) => event[p](e, e.target.options.data));
			}
		}
	}
	if (groupName) {
		if (layerObject[groupName]) {
			layerObject[groupName].push(polyline);
		} else {
			layerObject[groupName] = [polyline];
		}
	}
};
/**画面
 * areas 面数据
 * event 事件绑定
 * areaSetting 面样式 参照 defaultAreaStyle
 * groupName 面对象分组
*/
const addAreas = (areas, event, { areaSetting, groupName }) => {
	let style = Object.assign({}, defaultAreaStyle, areaSetting),
		polygon = L.polygon(areas, style).addTo(map);
	//eHelper.addLatLng(polygon,areas);

	if (event) {
		if (eHelper.isFunction(event)) {
			polygon.on('click', (e) => event(e, e.target.options.data));
		} else if (eHelper.isObject(event)) {
			for (let p in event) {
				polygon.on(p, (e) => event[p](e, e.target.options.data));
			}
		}
	}
	if (groupName) {
		if (layerObject[groupName]) {
			layerObject[groupName].push(polygon);
		} else {
			layerObject[groupName] = [polygon];
		}
	}
};
/**移除
 * groupName 绘制点线面时的groupName值 不传清空所有的要素
*/
const remove = (groupName) => {
	if (groupName) {
		if (layerObject[groupName]) {
			if (eHelper.isArray(layerObject[groupName])) {
				layerObject[groupName].map(item => item.remove());
				delete layerObject[groupName];
			} else {
				layerObject[groupName].remove() && delete layerObject[groupName];
			}
		}
	} else {
		for (let p in layerObject) {
			if (eHelper.isArray(layerObject[p])) {
				layerObject[p].map(item => item.remove());
				delete layerObject[p];
			} else {
				layerObject[p].remove() && delete layerObject[p];
			}
		}
	}
};
/**图层可用操作
 * zoomOut 缩小
 * zoomIn 放大
 * setZoom 设置视野等级
 * panto 定位  latlng : 经纬度 animate : 是否需要动画 z : 定位后显示等级
 * pantoArea 区域定位
*/
const e = {
	zoomOut: () => eHelper.zoom(-1),
	zoomIn: () => eHelper.zoom(1),
	setZoom: (z) => map.setZoom(z),
	panto: (latlng, animate, z = 11) => { map.setView(latlng, z); !!animate && eHelper.circleAnimate(latlng); },
	pantoArea: (arr) => {
		let p = eHelper.calcAreaExtent(arr);

		!!p && map.fitBounds([p.min, p.max]);
	}
};
/**地图工具
 * measureRange 测距
 * measureArea 测面
 * controlPoint 可控点
 * controlCircle 可控圆
*/
const tool = {
	measureRange: () => new MeasureRange(),
	measureArea: () => new MeasureArea(),
	controlPoint: () => new ControlPoint(),
	controlCircle: () => new ControlCircle(),
	controlLine: () => new ControlLine()
};
/**
 * init 地图初始化
 * e 图层操作
 * tool 地图工具
 * addPoints 打点
 * addLines 画线
 * addAreas 画面
 * remove 移除
 */

export default {
	init,
	e,
	tool,
	addPoints,
	addLines,
	addAreas,
	remove
};