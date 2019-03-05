// import Control from '../Parent/Control';

// /**可控点 */
// export default class ControlPoint extends Control {
//   constructor(props) {
//     super(props);
//     this.initialize();
//     eHelper.setCursor('crosshair');
//   }
//   initialize = () => {
//     eHelper.on(controlPoint, _CLICK, this.click);
//     eHelper.on(controlPoint, _MOUSEUP, this.dragEnd);
//     eHelper.on(controlPoint, _MOUSEMOVE, this.move);
//   };
//   click = e => {
//     if (!this.options.point) {
//       this.options.point = L.marker(e.latlng, {
//         icon: L.icon(defaultIconStyle),
//       }).addTo(map);
//       eHelper.setCursor(null);
//       this.options.point.on('mousedown', e => this.dragBegin(e));
//       this.options.point.on('contextmenu', e => this.rightMenu(e));
//     } else {
//       !!this.options.menuState && this.options.menu.remove();
//       this.options.menuState = false;
//     }
//   };
//   dragBegin = e => {
//     this.readyChange(e);
//     this.options.state = true;
//   };
//   move = e => {
//     this.options.mLatLng = e.latlng;
//     if (this.options.state) {
//       this.options.point.setLatLng([
//         e.latlng.lat - this.options.Dlat,
//         e.latlng.lng - this.options.Dlng,
//       ]);
//     }
//   };
//   dragEnd = e => {
//     if (this.options.state) {
//       map.dragging.enable();
//       this.options.state = false;
//     }
//   };
//   rightMenu = e => {
//     let clickCallBack = () => {
//       for (let p in controlPoint) {
//         controlPoint[p] = null;
//         delete controlPoint[p];
//       }
//       this.options.point.remove();
//       this.options.menu.remove();
//     };

//     this.menuBuild([{ name: '删除', func: clickCallBack }]);
//   };
// }
