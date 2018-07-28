/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-07-28 08:13:25
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 21:49:09
 */
/**帮助项
 * init_4326 天地图4326瓦片构建初始化
 * addTDT 添加4326天地图图层
 * zoom 设置视野等级
 * isArray 判断是否为数组
 * isFunction 判断是否为函数
 * isObject 判断是否为对象
 * templateValue tootip内容构建
 * popupTemplate popup内容构建
 * addLatLng 为线面对象添加经纬度点
 * circleAnimate 定位动画
 * latlngFormat 小数转度分秒格式
 * calcAreaExtent 计算经纬度范围
 * do 事件触发
 * calcLength 长度计算
 * getFlatternDistance 两点间距离计算
 * lengthFormat 长度格式化
 * areaFormat 面积格式化
 * calcArea 面积计算
 * PlanarPolygonAreaMeters 平面面积计算
 * SphericalPolygonAreaMeters 曲面面积计算
 * Angle 角度计算
 * Bearing 方向计算
 * setCursor 设置鼠标样式
*/
import L from 'leaflet';

export const eHelper = {
	'init_4490': function (url) {
		L.TileLayer.WebDogTileLayer = L.TileLayer.extend({
			getTileUrl: function (tilePoint) {
				let urlArgs,
					getUrlArgs = this.options.getUrlArgs;

				if (getUrlArgs) {
					urlArgs = getUrlArgs(tilePoint);
				} else {
					urlArgs = {
						z: tilePoint.z,
						x: tilePoint.x,
						y: tilePoint.y
					};
				}
				return this['_url']['_url'] + '/tile/' + urlArgs.z + '/' + urlArgs.x + '/' + urlArgs.y;
			}
		});

		L.tileLayer.webdogTileLayer = function (url, options) {
			return new L.TileLayer.WebDogTileLayer(url, options);
		};
	},
	addSpecialLayer: function (url, i) {
		let options = {
			getUrlArgs: function (tilePoint) {
				let z = tilePoint.z - i;
				let x = tilePoint.y;
				let y = tilePoint.x;

				return {
					z: z,
					x: x,
					y: y
				};
			}
		};

		let lay = L.tileLayer.webdogTileLayer(url, options);

		lay.addTo(map);
	},
	'init_4326': () => {
		L.TileLayer.WMTS = L.TileLayer.extend({
			defaultWmtsParams: {
				service: 'WMTS',
				request: 'GetTile',
				version: '1.0.0',
				layer: '',
				style: '',
				tilematrixSet: '',
				format: 'image/jpeg'
			},
			initialize: function (e, t) {
				this['_url'] = e;
				let n = L.extend({}, this.defaultWmtsParams),
					r = t.tileSize || this.options.tileSize;

				if (t.detectRetina && L.Browser.retina) {
					n.width = n.height = r * 2;
				} else {
					n.width = n.height = r;
				}
				for (let i in t) {
					if (!this.options.hasOwnProperty(i) && i != 'matrixIds') {
						n[i] = t[i];
					}
				}
				this.wmtsParams = n;
				this.matrixIds = t.matrixIds || this.getDefaultMatrix();
				L.setOptions(this, t);
			},
			onAdd: function (e) {
				L.TileLayer.prototype.onAdd.call(this, e);
			},
			getTileUrl: function (e, t) {
				let n = this['_map'];
				let crs = n.options.crs;
				let tileSize = this.options.tileSize;
				let nwPoint = e.multiplyBy(tileSize);

				nwPoint.x += 1;
				nwPoint.y -= 1;
				let sePoint = nwPoint.add(new L.Point(tileSize, tileSize));

				t = n.getZoom();
				let nw = crs.project(n.unproject(nwPoint, t));
				let se = crs.project(n.unproject(sePoint, t));
				let tilewidth = se.x - nw.x;
				let ident = e.z + 1;
				let X0 = this.matrixIds[t].topLeftCorner.lng;
				let Y0 = this.matrixIds[t].topLeftCorner.lat;
				let tilecol = Math.floor((nw.x - X0) / (tilewidth));
				let tilerow = -Math.floor((nw.y - Y0) / tilewidth);
				let url = L.Util.template(this['_url'], {
					s: Math.floor(Math.abs(parseInt(ident) + parseInt(tilerow) + parseInt(tilecol) + Math.random() * 7) % 7).toString()
				});

				return url + L.Util.getParamString(this.wmtsParams, url) + '&tilematrix=' + ident + '&tilerow=' + tilerow + '&tilecol=' + tilecol;
			},
			setParams: function (e, t) {
				L.extend(this.wmtsParams, e);
				if (!t) {
					this.redraw();
				}
				return this;
			},
			getDefaultMatrix: function () {
				let e = new Array(22);

				for (let t = 0; t < 22; t++) {
					e[t] = {
						identifier: '' + t,
						topLeftCorner: new L.LatLng(90, -180)
					};
				}
				return e;
			}
		});
	},
	addTDT: (url, layer) => {
		let Targument = {
			tileSize: 256,
			layer: layer,
			style: 'default',
			tilematrixSet: 'c',
			format: 'tile'
		};
		let lay = new L.TileLayer.WMTS(url, Targument);

		lay.addTo(map);
	},
	zoom: (z) => {
		let zoom = map.getZoom();

		zoom += z;
		map.setZoom(zoom);
	},
	isArray: (v) => { return Object.prototype.toString.call(v) === '[object Array]'; },
	isFunction: (v) => { return Object.prototype.toString.call(v) === '[object Function]'; },
	isObject: (v) => { return Object.prototype.toString.call(v) === '[object Object]'; },
	templateValue: (str, data) => {
		let targetStr = '',
			targetKey = '';

		while (str.indexOf('@{') >= 0) {
			let fIndex = str.indexOf('@{'),
				lIndex = str.indexOf('}');

			targetStr = str.substring(fIndex, lIndex + 1);
			targetKey = str.substring(fIndex + 2, lIndex);
			str = str.replace(targetStr, data[targetKey]);
		}
		return str;
	},
	popupTemplate: (popupConfig, data) => {
		let bindDatas = Object.assign({}, defaultPopupStyle, popupConfig), lineTrs = [];

		bindDatas.rows.map((item, i) => {
			let name = item.name, value = data[item.key] || '-';

			lineTrs.push(`<tr class = "item">
                            <td class = "label-name" style = "width:${item.nWidth || ''}">${name}</td>
                            <td class = "label-value" style = "width:${item.vWidth || ''}">${value}</td>
                        </tr>`);
		});
		let lineTrsStr = lineTrs.join(' ');
		let title = data[bindDatas.title] || '';
		let popPanle = `<div class = "leafletTempContent" style = "text-align:center;width:${bindDatas.width || ''}">
                            <div class = "title" 
                                style = "display:${!title ? 'none' : 'block'};background-color:${bindDatas.tBgColor};color:${bindDatas.tColor}">
                                ${title}
                            </div>
                            <table style = "width : 100%">
                                ${lineTrsStr}
                            </table>
                        </div>`;

		return popPanle;
	},
	addLatLng: (obj, data) => {
		data.map((point, i) => {
			if (eHelper.isArray(point)) {
				obj.addLatLng(
					L.latLng(point[0], point[1])
				);
			} else {
				obj.addLatLng(
					L.latLng(point.lat, point.lng)
				);
			}
		});
	},
	circleAnimateTimer: null,
	circleAnimateMarker: null,
	circleAnimate: (latlng) => {
		clearTimeout(eHelper.circleAnimateTimer);
		!!eHelper.circleAnimateMarker && eHelper.circleAnimateMarker.remove();
		let icon = L.divIcon({
			className: 'pantoPointDiv',
			iconSize: [100, 100],
			iconAnchor: [50, 50],
			html: '<div class = \'animateWrap\'><div class = \'animate\'></div></div>'
		});

		eHelper.circleAnimateMarker = L.marker(latlng, { icon: icon }).addTo(map);
		eHelper.circleAnimateTimer = setTimeout(() => { eHelper.circleAnimateMarker.remove(); eHelper.circleAnimateMarker = null; }, 1500);
	},
	latlngFormat: (n) => {
		let d = (n < 0) ? 0 : 1;
		let v = Math.abs(n);
		let v1 = Math.floor(v);
		let v2 = Math.floor((v - v1) * 60);
		let v3 = Math.round((v - v1) * 3600 % 60);

		return { value: v1 + '°' + v2 + '\'' + v3 + '"', key: d };
	},
	calcAreaExtent: (arr) => {
		if (!!arr && eHelper.isArray(arr) && arr.length > 1) {
			let min = { lat: 180, lng: 180 }, max = { lat: -180, lng: -180 };

			arr.map(item => {
				let p = (eHelper.isArray(item)) ? { lat: item[0], lng: item[1] } : item;

				min.lat = Math.min(p.lat, min.lat);
				min.lng = Math.min(p.lng, min.lng);
				max.lat = Math.max(p.lat, max.lat);
				max.lng = Math.max(p.lng, max.lng);
			});
			return { min: min, max: max };
		}
		return false;

	},
	on: (key, event, e) => {
		if (key[event]) { key[event].push(e); } else { key[event] = [e]; }
	},
	do: (eventKey, e) => {
		[event, range, area, controlPoint, controlCircle, controlLine].map(key => !!key[eventKey] && key[eventKey].map(item => eHelper.isFunction(item) && item(e)));
	},
	calcLength: (points) => {
		let length = 0;

		if (points.length < 2) { return 0; }

		points.map((item, i) => {
			if (i < points.length - 1) {
				let partLength = eHelper.getFlatternDistance(item['_latlng'].lat, item['_latlng'].lng, points[i + 1]['_latlng'].lat, points[i + 1]['_latlng'].lng);

				length += partLength;
			}
		});

		return length;
	},
	getFlatternDistance: function (lat1, lng1, lat2, lng2) {
		var EARTH_RADIUS = 6378137.0;
		var PI = Math.PI;
		var f = ((lat1 + lat2) / 2) * PI / 180.0;
		var g = ((lat1 - lat2) / 2) * PI / 180.0;
		var l = ((lng1 - lng2) / 2) * PI / 180.0;

		var sg = Math.sin(g);
		var sl = Math.sin(l);
		var sf = Math.sin(f);

		var s, c, w, r, d, h1, h2;
		var a = EARTH_RADIUS;
		var fl = 1 / 298.257;

		sg = sg * sg;
		sl = sl * sl;
		sf = sf * sf;

		s = sg * (1 - sl) + (1 - sf) * sl;
		c = (1 - sg) * (1 - sl) + sf * sl;

		w = Math.atan(Math.sqrt(s / c));
		r = Math.sqrt(s * c) / w;
		d = 2 * w * a;
		h1 = (3 * r - 1) / 2 / c;
		h2 = (3 * r + 1) / 2 / s;

		var atk = d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));

		if (lat1 == lat2 && lng1 == lng2) { atk = 0; }
		return atk;
	},
	lengthFormat: (n) => {
		let l = (n > 1000) ? { num: n / 1000, unit: '公里' } : { num: n, unit: '米' };

		l.num = l.num.toFixed(2);
		return l;
	},
	areaFormat: (n) => {
		let l = (n > 1000000) ? { num: n / 1000000, unit: '平方公里' } : { num: n, unit: '平方米' };

		l.num = l.num.toFixed(2);
		return l;
	},
	calcArea: (points) => {
		if (points.length > 2) {
			let areaMeters = eHelper.PlanarPolygonAreaMeters(points);

			if (areaMeters > 1000000.0) {
				areaMeters = eHelper.SphericalPolygonAreaMeters(points);
			}
			return areaMeters;
		}
	},
	PlanarPolygonAreaMeters: (points) => {
		let a = 0;

		for (let i = 0; i < points.length; ++i) {
			let j = (i + 1) % points.length,
				xi = points[i]['_latlng'].lng * metersPerDegree * Math.cos(points[i]['_latlng'].lat * radiansPerDegree),
				yi = points[i]['_latlng'].lat * metersPerDegree,
				xj = points[j]['_latlng'].lng * metersPerDegree * Math.cos(points[j]['_latlng'].lat * radiansPerDegree),
				yj = points[j]['_latlng'].lat * metersPerDegree;

			a += xi * yj - xj * yi;
		}
		return Math.abs(a / 2);
	},
	SphericalPolygonAreaMeters: (points) => {
		let totalAngle = 0;

		for (let i = 0; i < points.length; i++) {
			let j = (i + 1) % points.length;
			let k = (i + 2) % points.length;

			totalAngle += eHelper.Angle(points[i], points[j], points[k]);
		}
		let planarTotalAngle = (points.length - 2) * 180.0;
		let sphericalExcess = totalAngle - planarTotalAngle;

		if (sphericalExcess > 420.0) {
			totalAngle = points.length * 360.0 - totalAngle;
			sphericalExcess = totalAngle - planarTotalAngle;
		} else if (sphericalExcess > 300.0 && sphericalExcess < 420.0) {
			sphericalExcess = Math.abs(360.0 - sphericalExcess);
		}
		while (sphericalExcess < 0) {
			sphericalExcess += 180.0;
		}
		return sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters;
	},
	Angle: (p1, p2, p3) => {
		let bearing21 = eHelper.Bearing(p2, p1),
			bearing23 = eHelper.Bearing(p2, p3),
			angle = bearing21 - bearing23;

		if (angle < 0) {
			angle += 360;
		}
		return angle;
	},
	Bearing: (from, to) => {
		let lat1 = from['_latlng'].lat * radiansPerDegree,
			lon1 = from['_latlng'].lng * radiansPerDegree,
			lat2 = to['_latlng'].lat * radiansPerDegree,
			lon2 = to['_latlng'].lng * radiansPerDegree,
			angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));

		if (angle < 0) {
			angle += Math.PI * 2.0;
		}
		angle = angle * degreesPerRadian;
		return angle;
	},
	setCursor: (type) => {
		document.getElementsByClassName('leaflet-container')[0].style.cursor = type;
	}
};