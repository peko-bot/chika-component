import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import MarkerClusterGroup from 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './css/easyLeaflet.css';

import {
  defaultIconStyle,
  measureRangePoint,
  measureAreaPoint,
  markerControlPoint,
  defaultLineStyle,
  defaultAreaStyle,
  moveAreaStyle,
  defaultPopupStyle,
  defaultDivStyle,
  controlLinePoint,
} from './css/style';

// import { eHelper } from './helper';

import MeasureRange from './Tool/MeasureRange';
import MeasureArea from './Tool/MeasureArea';
import ControlLine from './Tool/ControlLine';
import ControlPoint from './Tool/ControlPoint';
import ControlCircle from './Tool/ControlCircle';

/**地图对象 */
let map = null,
  layerObject = {},
  event = {},
  range = {},
  area = {},
  controlPoint = {},
  controlCircle = {},
  controlLine = {};
/**全局参数 */
const MOVE = 'MAP_MOVE';
const MOUSEMOVE = 'MAP_MOUSEMOVE';
const CLICK = 'MAP_CLICK';
const MOUSEDOWN = 'MAP_MOUSEDOWN';
const MOUSEUP = 'MAP_MOUSEUP';
const ZOOMEND = 'MAP_ZOOMEND';
const HOVERPOPUPID = 'leaflet_popup_hover_wrap';
const earthRadiusMeters = 6371000.0;
const metersPerDegree = (2.0 * Math.PI * earthRadiusMeters) / 360.0;
const radiansPerDegree = Math.PI / 180.0;
const degreesPerRadian = 180.0 / Math.PI;
/**默认地图参数 */
let defaultMapArgument = {
  center: [31.8, 121.66], // 中心点
  crs: L.CRS.EPSG3857, // wkid
  zoom: 7, // 地图显示等级
  maxZoom: 18, // 最大显示等级
  minZoom: 1, // 最小显示等级
  dragging: true, // 是否允许拖拽
  zoomControl: true, // 放大缩小控件
  attributionControl: false, // 地图描述控件
  latlngControl: true, // 鼠标位置经纬度显示控件
};
/**图层参数 */
const tile = {
  googleTile: L.tileLayer(
    'http://{s}.google.cn/vt/lyrs=t@130,r@203000000&hl=zh-CN&gl=cn&src=app&x={x}&y={y}&z={z}&s=Gal',
    { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] },
  ),
  googleRsTile: L.tileLayer(
    'http://mt{s}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
    { subdomains: ['1', '2', '3'] },
  ),
  googleTrafficTile: L.tileLayer(
    'http://mt{s}.google.cn/vt/lyrs=m@209000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galileo',
    { subdomains: ['1', '2', '3'] },
  ),
  TDTurl: 'http://t{s}.tianditu.com/vec_c/wmts',
  NameUrl: 'http://t{s}.tianditu.com/cva_c/wmts',
  imgUrl: 'http://t{s}.tianditu.com/img_c/wmts',
  imgNameUrl: 'http://t{s}.tianditu.com/cia_c/wmts',
  Gjtt: L.tileLayer(
    'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    { subdomains: ['1', '2', '3', '4'] },
  ),
  Gygt: L.tileLayer(
    'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
    { subdomains: ['1', '2', '3', '4'] },
  ),
  GygtName: L.tileLayer(
    'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
    { subdomains: ['1', '2', '3', '4'] },
  ),
  test0: L.tileLayer(
    'http://t{s}.tianditu.cn/dataSourceServer?T=img_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  Tdxt: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  TdxtName: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  Tygt: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  TygtName: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  Tjtt: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  TjttName: L.tileLayer(
    'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}',
    { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
  ),
  // eslint-disable-next-line
  map_4490: L.tileLayer(
    'http://218.94.6.92:6080/arcgis/rest/services/jspub_raster_L4_L20/MapServer',
  ),
  // eslint-disable-next-line
  map_4490_name: L.tileLayer(
    'http://218.94.6.92:6080/arcgis/rest/services/jspub_raster_anno_L3_L20/MapServer',
  ),
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
  let mapArgument = params
    ? Object.assign({}, defaultMapArgument, params)
    : defaultMapArgument;

  mapArgument.crs = [mapArgument.crs, L.CRS.EPSG3857, L.CRS.EPSG4326][
    Math.ceil(
      ([
        'dxt',
        'ygt',
        'jtt',
        'Gdxt',
        'Gygt',
        'Tdxt',
        'Tygt',
        'Tjtt',
        '_Tjtt',
        '_Tygt',
        'map_4490',
      ].indexOf(type) +
        1) /
        8,
    )
  ];
  map = L.map(dom, mapArgument);
  switch (type) {
    case 'dxt':
      tile.googleTile.addTo(map);
      break;
    case 'ygt':
      tile.googleRsTile.addTo(map);
      break;
    case 'jtt':
      tile.googleTrafficTile.addTo(map);
      break;
    case '_Tjtt':
      eHelper.init_4326();
      eHelper.addTDT(tile.TDTurl, 'vec');
      eHelper.addTDT(tile.NameUrl, 'cva');
      break;
    case '_Tygt':
      eHelper.init_4326();
      eHelper.addTDT(tile.imgUrl, 'img');
      eHelper.addTDT(tile.imgNameUrl, 'cia');
      break;
    case 'Gdxt':
      tile.Gjtt.addTo(map);
      break;
    case 'Gygt':
      tile.Gygt.addTo(map);
      tile.GygtName.addTo(map);
      break;
    case 'Tdxt':
      tile.Tdxt.addTo(map);
      tile.TdxtName.addTo(map);
      break;
    case 'Tygt':
      tile.Tygt.addTo(map);
      tile.TygtName.addTo(map);
      break;
    case 'Tjtt':
      tile.Tjtt.addTo(map);
      tile.TjttName.addTo(map);
      break;
    case 'map_4490':
      eHelper.init_4490();
      eHelper.addSpecialLayer(tile.map_4490, 3);
      eHelper.addSpecialLayer(tile.map_4490_name, 2);
      eHelper.init_4326();
      break;
    default:
      break;
  }
  if (mapArgument.latlngControl) {
    L.Control.LatLng = L.Control.extend({
      options: {
        position: 'bottomleft',
      },
      initialize: function(options) {
        L.Util.extend(this.options, options);
        eHelper.on(event, MOUSEMOVE, this.moveFun);
        eHelper.on(event, CLICK, this.moveFun);
      },
      onAdd: function(map) {
        this.container = L.DomUtil.create('div', 'leaflet-control-latlng');
        return this.container;
      },
      moveFun: function(e) {
        let lat = eHelper.latlngFormat(e.latlng.lat),
          lng = eHelper.latlngFormat(e.latlng.lng);

        document.getElementsByClassName('leaflet-control-latlng')[0].innerHTML =
          lng.value +
          ' ' +
          ['W', 'E'][lng.key] +
          '　' +
          lat.value +
          ' ' +
          ['S', 'N'][lat.key];
      },
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
const addPoints = (
  points,
  event,
  {
    iconSetting = defaultIconStyle,
    tooltipSetting,
    popupSetting,
    hoverBoxSetting,
    groupName,
  },
) => {
  let markerGroup = new L.MarkerClusterGroup(),
    markers = [];

  points.map((point, i) => {
    let marker = L.marker([point.lat, point.lng], {
      icon: L.icon(iconSetting),
      data: point,
    });

    if (tooltipSetting) {
      let tooltip = L.tooltip(tooltipSetting.options).setContent(
        eHelper.templateValue(tooltipSetting.content, point),
      );

      marker.bindTooltip(tooltip).openTooltip();
    }
    if (popupSetting) {
      let popup = L.popup().setContent(
        eHelper.popupTemplate(popupSetting, point),
      );

      marker.bindPopup(popup, popupSetting.options || {});
    }
    if (event) {
      if (eHelper.isFunction(event)) {
        marker.on('click', e => event(e, e.target.options.data));
      } else if (eHelper.isObject(event)) {
        for (let p in event) {
          marker.on(p, e => event[p](e, e.target.options.data));
        }
      }
    }
    !!hoverBoxSetting &&
      marker.on('mouseover', e => mouseoverEvent(e, e.target.options.data));
    !!hoverBoxSetting &&
      marker.on('mouseout', e => mouseoutEvent(e, e.target.options.data));
    markers.push(marker);
  });
  markerGroup.addLayers(markers);
  map.addLayer(markerGroup);
  if (groupName) {
    layerObject[groupName] = markerGroup;
  }
  let mouseoverEvent = (e, data) => {
    let PopupConfig = {
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      direction: hoverBoxSetting.direction || 'top',
      height: hoverBoxSetting.rows.length * 36 + 40,
      width: hoverBoxSetting.width || 100,
      x: [0, 0, -15, 15][
        ['top', 'bottom', 'left', 'right'].indexOf(
          hoverBoxSetting.direction || 'top',
        )
      ],
      y: [-15, 15, 0, 0][
        ['top', 'bottom', 'left', 'right'].indexOf(
          hoverBoxSetting.direction || 'top',
        )
      ],
    };
    let Dom = document.getElementById(HOVERPOPUPID);

    !!Dom &&
      ReactDOM.render(
        <Popup config={PopupConfig}>
          <ValueKey config={hoverBoxSetting} dataSource={data} />
        </Popup>,
        Dom,
      );
  };
  let mouseoutEvent = e => {
    let Dom = document.getElementById(HOVERPOPUPID);

    !!Dom && ReactDOM.render(<div />, Dom);
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
      polyline.on('click', e => event(e, e.target.options.data));
    } else if (eHelper.isObject(event)) {
      for (let p in event) {
        polyline.on(p, e => event[p](e, e.target.options.data));
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
      polygon.on('click', e => event(e, e.target.options.data));
    } else if (eHelper.isObject(event)) {
      for (let p in event) {
        polygon.on(p, e => event[p](e, e.target.options.data));
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
const remove = groupName => {
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
  setZoom: z => map.setZoom(z),
  panto: (latlng, animate, z = 11) => {
    map.setView(latlng, z);
    !!animate && eHelper.circleAnimate(latlng);
  },
  pantoArea: arr => {
    let p = eHelper.calcAreaExtent(arr);

    !!p && map.fitBounds([p.min, p.max]);
  },
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
  controlLine: () => new ControlLine(),
};

const eHelper = {
  // eslint-disable-next-line
  init_4490: function(url) {
    L.TileLayer.WebDogTileLayer = L.TileLayer.extend({
      getTileUrl: function(tilePoint) {
        let urlArgs,
          getUrlArgs = this.options.getUrlArgs;

        if (getUrlArgs) {
          urlArgs = getUrlArgs(tilePoint);
        } else {
          urlArgs = {
            z: tilePoint.z,
            x: tilePoint.x,
            y: tilePoint.y,
          };
        }
        return (
          this['_url']['_url'] +
          '/tile/' +
          urlArgs.z +
          '/' +
          urlArgs.x +
          '/' +
          urlArgs.y
        );
      },
    });

    L.tileLayer.webdogTileLayer = function(url, options) {
      return new L.TileLayer.WebDogTileLayer(url, options);
    };
  },
  addSpecialLayer: function(url, i) {
    let options = {
      getUrlArgs: function(tilePoint) {
        let z = tilePoint.z - i;
        let x = tilePoint.y;
        let y = tilePoint.x;

        return {
          z: z,
          x: x,
          y: y,
        };
      },
    };

    let lay = L.tileLayer.webdogTileLayer(url, options);

    lay.addTo(map);
  },
  // eslint-disable-next-line
  init_4326: () => {
    L.TileLayer.WMTS = L.TileLayer.extend({
      defaultWmtsParams: {
        service: 'WMTS',
        request: 'GetTile',
        version: '1.0.0',
        layer: '',
        style: '',
        tilematrixSet: '',
        format: 'image/jpeg',
      },
      initialize: function(e, t) {
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
      onAdd: function(e) {
        L.TileLayer.prototype.onAdd.call(this, e);
      },
      getTileUrl: function(e, t) {
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
        let tilecol = Math.floor((nw.x - X0) / tilewidth);
        let tilerow = -Math.floor((nw.y - Y0) / tilewidth);
        let url = L.Util.template(this['_url'], {
          s: Math.floor(
            Math.abs(
              parseInt(ident) +
                parseInt(tilerow) +
                parseInt(tilecol) +
                Math.random() * 7,
            ) % 7,
          ).toString(),
        });

        return (
          url +
          L.Util.getParamString(this.wmtsParams, url) +
          '&tilematrix=' +
          ident +
          '&tilerow=' +
          tilerow +
          '&tilecol=' +
          tilecol
        );
      },
      setParams: function(e, t) {
        L.extend(this.wmtsParams, e);
        if (!t) {
          this.redraw();
        }
        return this;
      },
      getDefaultMatrix: function() {
        let e = new Array(22);

        for (let t = 0; t < 22; t++) {
          e[t] = {
            identifier: '' + t,
            topLeftCorner: new L.LatLng(90, -180),
          };
        }
        return e;
      },
    });
  },
  addTDT: (url, layer) => {
    let Targument = {
      tileSize: 256,
      layer: layer,
      style: 'default',
      tilematrixSet: 'c',
      format: 'tile',
    };
    let lay = new L.TileLayer.WMTS(url, Targument);

    lay.addTo(map);
  },
  zoom: z => {
    let zoom = map.getZoom();

    zoom += z;
    map.setZoom(zoom);
  },
  isArray: v => {
    return Object.prototype.toString.call(v) === '[object Array]';
  },
  isFunction: v => {
    return Object.prototype.toString.call(v) === '[object Function]';
  },
  isObject: v => {
    return Object.prototype.toString.call(v) === '[object Object]';
  },
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
    let bindDatas = Object.assign({}, defaultPopupStyle, popupConfig),
      lineTrs = [];

    bindDatas.rows.map((item, i) => {
      let name = item.name,
        value = data[item.key] || '-';

      lineTrs.push(`<tr class = "item">
                            <td class = "label-name" style = "width:${item.nWidth ||
                              ''}">${name}</td>
                            <td class = "label-value" style = "width:${item.vWidth ||
                              ''}">${value}</td>
                        </tr>`);
    });
    let lineTrsStr = lineTrs.join(' ');
    let title = data[bindDatas.title] || '';
    let popPanle = `<div class = "leafletTempContent" style = "text-align:center;width:${bindDatas.width ||
      ''}">
                            <div class = "title"
                                style = "display:${
                                  !title ? 'none' : 'block'
                                };background-color:${
      bindDatas.tBgColor
    };color:${bindDatas.tColor}">
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
        obj.addLatLng(L.latLng(point[0], point[1]));
      } else {
        obj.addLatLng(L.latLng(point.lat, point.lng));
      }
    });
  },
  circleAnimateTimer: null,
  circleAnimateMarker: null,
  circleAnimate: latlng => {
    clearTimeout(eHelper.circleAnimateTimer);
    !!eHelper.circleAnimateMarker && eHelper.circleAnimateMarker.remove();
    let icon = L.divIcon({
      className: 'pantoPointDiv',
      iconSize: [100, 100],
      iconAnchor: [50, 50],
      // eslint-disable-next-line
      html: "<div class = 'animateWrap'><div class = 'animate'></div></div>",
    });

    eHelper.circleAnimateMarker = L.marker(latlng, { icon: icon }).addTo(map);
    eHelper.circleAnimateTimer = setTimeout(() => {
      eHelper.circleAnimateMarker.remove();
      eHelper.circleAnimateMarker = null;
    }, 1500);
  },
  latlngFormat: n => {
    let d = n < 0 ? 0 : 1;
    let v = Math.abs(n);
    let v1 = Math.floor(v);
    let v2 = Math.floor((v - v1) * 60);
    let v3 = Math.round(((v - v1) * 3600) % 60);

    // eslint-disable-next-line
    return { value: v1 + '°' + v2 + "'" + v3 + '"', key: d };
  },
  calcAreaExtent: arr => {
    if (!!arr && eHelper.isArray(arr) && arr.length > 1) {
      let min = { lat: 180, lng: 180 },
        max = { lat: -180, lng: -180 };

      arr.map(item => {
        let p = eHelper.isArray(item) ? { lat: item[0], lng: item[1] } : item;

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
    if (key[event]) {
      key[event].push(e);
    } else {
      key[event] = [e];
    }
  },
  do: (eventKey, e) => {
    [event, range, area, controlPoint, controlCircle, controlLine].map(
      key =>
        !!key[eventKey] &&
        key[eventKey].map(item => eHelper.isFunction(item) && item(e)),
    );
  },
  calcLength: points => {
    let length = 0;

    if (points.length < 2) {
      return 0;
    }

    points.map((item, i) => {
      if (i < points.length - 1) {
        let partLength = eHelper.getFlatternDistance(
          item['_latlng'].lat,
          item['_latlng'].lng,
          points[i + 1]['_latlng'].lat,
          points[i + 1]['_latlng'].lng,
        );

        length += partLength;
      }
    });

    return length;
  },
  getFlatternDistance: function(lat1, lng1, lat2, lng2) {
    var EARTH_RADIUS = 6378137.0;
    var PI = Math.PI;
    var f = (((lat1 + lat2) / 2) * PI) / 180.0;
    var g = (((lat1 - lat2) / 2) * PI) / 180.0;
    var l = (((lng1 - lng2) / 2) * PI) / 180.0;

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

    if (lat1 == lat2 && lng1 == lng2) {
      atk = 0;
    }
    return atk;
  },
  lengthFormat: n => {
    let l = n > 1000 ? { num: n / 1000, unit: '公里' } : { num: n, unit: '米' };

    l.num = l.num.toFixed(2);
    return l;
  },
  areaFormat: n => {
    let l =
      n > 1000000
        ? { num: n / 1000000, unit: '平方公里' }
        : { num: n, unit: '平方米' };

    l.num = l.num.toFixed(2);
    return l;
  },
  calcArea: points => {
    if (points.length > 2) {
      let areaMeters = eHelper.PlanarPolygonAreaMeters(points);

      if (areaMeters > 1000000.0) {
        areaMeters = eHelper.SphericalPolygonAreaMeters(points);
      }
      return areaMeters;
    }
  },
  PlanarPolygonAreaMeters: points => {
    let a = 0;

    for (let i = 0; i < points.length; ++i) {
      let j = (i + 1) % points.length,
        xi =
          points[i]['_latlng'].lng *
          metersPerDegree *
          Math.cos(points[i]['_latlng'].lat * radiansPerDegree),
        yi = points[i]['_latlng'].lat * metersPerDegree,
        xj =
          points[j]['_latlng'].lng *
          metersPerDegree *
          Math.cos(points[j]['_latlng'].lat * radiansPerDegree),
        yj = points[j]['_latlng'].lat * metersPerDegree;

      a += xi * yj - xj * yi;
    }
    return Math.abs(a / 2);
  },
  SphericalPolygonAreaMeters: points => {
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
    return (
      sphericalExcess * radiansPerDegree * earthRadiusMeters * earthRadiusMeters
    );
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
      angle = -Math.atan2(
        Math.sin(lon1 - lon2) * Math.cos(lat2),
        Math.cos(lat1) * Math.sin(lat2) -
          Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2),
      );

    if (angle < 0) {
      angle += Math.PI * 2.0;
    }
    angle = angle * degreesPerRadian;
    return angle;
  },
  setCursor: type => {
    document.getElementsByClassName('leaflet-container')[0].style.cursor = type;
  },
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
  remove,
};
