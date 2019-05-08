import * as leaflet from 'leaflet';

const googleTile = leaflet.tileLayer(
  'http://{s}.google.cn/vt/lyrs=t@130,r@203000000&hl=zh-CN&gl=cn&src=app&x={x}&y={y}&z={z}&s=Gal',
  { subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] },
);

const googleRsTile = leaflet.tileLayer(
  'http://mt{s}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
  { subdomains: ['1', '2', '3'] },
);

const googleTrafficTile = leaflet.tileLayer(
  'http://mt{s}.google.cn/vt/lyrs=m@209000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}&s=Galileo',
  { subdomains: ['1', '2', '3'] },
);

const gdTrafficTile = leaflet.tileLayer(
  'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
  { subdomains: ['1', '2', '3', '4'] },
);
const gdSatelliteTile = leaflet.tileLayer(
  'http://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
  { subdomains: ['1', '2', '3', '4'] },
);

export {
  googleTile,
  googleRsTile,
  googleTrafficTile,
  gdTrafficTile,
  gdSatelliteTile,
};

// export const tiles = {
//   GygtName: leaflet.tileLayer(
//     'http://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
//     { subdomains: ['1', '2', '3', '4'] },
//   ),
//   test0: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/dataSourceServer?T=img_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   Tdxt: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=ter_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   TdxtName: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=cta_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   Tygt: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   TygtName: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   Tjtt: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
//   TjttName: leaflet.tileLayer(
//     'http://t{s}.tianditu.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}',
//     { subdomains: ['0', '1', '2', '3', '4', '5', '6', '7'] },
//   ),
// };

// export const tdtVecTile = 'http://t{s}.tianditu.com/vec_c/wmts';
// export const tdtCvaTile = 'http://t{s}.tianditu.com/cva_c/wmts';
// export const tdtCTile = 'http://t{s}.tianditu.com/img_c/wmts';
// export const tdtCiaTile = 'http://t{s}.tianditu.com/cia_c/wmts';
