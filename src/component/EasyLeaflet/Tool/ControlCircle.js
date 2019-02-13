import Control from '../Parent/Control';

export class ControlCircle extends Control {
  constructor(props) {
    super(props);
    this.initialize();
    eHelper.setCursor('crosshair');
  }
  initialize = () => {
    eHelper.on(controlCircle, _MOUSEDOWN, this.drawBegin);
    eHelper.on(controlCircle, _MOUSEUP, this.dragEnd);
    eHelper.on(controlCircle, _MOUSEMOVE, this.move);
    eHelper.on(controlCircle, _CLICK, this.removeMenu);
  };
  drawBegin = e => {
    if (!this.options.circle) {
      this.options.circle = L.circle(e.latlng, {
        radius: this.options.r,
      }).addTo(map);
      this.options.center = L.circleMarker(e.latlng, markerControlPoint).addTo(
        map,
      );
      this.options.cLatLng = map.layerPointToLatLng([
        this.options.circle['_point'].x + this.options.circle['_radius'],
        this.options.circle['_point'].y,
      ]);
      this.options.point = L.circleMarker(
        this.options.cLatLng,
        markerControlPoint,
      ).addTo(map);
      eHelper.setCursor(null);
      this.options.state = 1;
      map.dragging.disable();

      this.options.center.on('mousedown', e => this.startMove(e));
      this.options.point.on('mousedown', e => this.startChange(e));
      this.options.circle.on('contextmenu', e => this.rightMenu(e));
    }
  };
  startChange = e => {
    this.readyChange(e);
    this.options.state = 1;
  };
  startMove = e => {
    this.readyChange(e);
    this.options.state = 2;
  };
  dragEnd = e => {
    this.options.state = 0;
    map.dragging.enable();
  };
  move = e => {
    this.options.mLatLng = e.latlng;
    if (this.options.state === 1) {
      this.options.point.setLatLng([
        e.latlng.lat - this.options.Dlat,
        e.latlng.lng - this.options.Dlng,
      ]);
      this.options.r = eHelper.getFlatternDistance(
        this.options.circle['_latlng'].lat,
        this.options.circle['_latlng'].lng,
        e.latlng.lat - this.options.Dlat,
        e.latlng.lng - this.options.Dlng,
      );
      this.options.circle.setRadius(this.options.r);
    } else if (this.options.state === 2) {
      let plat =
          e.latlng.lat - this.options.Dlat - this.options.circle['_latlng'].lat,
        plng =
          e.latlng.lng - this.options.Dlng - this.options.circle['_latlng'].lng;

      this.options.circle.setLatLng([
        e.latlng.lat - this.options.Dlat,
        e.latlng.lng - this.options.Dlng,
      ]);
      this.options.center.setLatLng([
        e.latlng.lat - this.options.Dlat,
        e.latlng.lng - this.options.Dlng,
      ]);
      this.options.point.setLatLng([
        this.options.point['_latlng'].lat + plat,
        this.options.point['_latlng'].lng + plng,
      ]);
    }
  };
  rightMenu = e => {
    let clickCallBack = () => {
      for (let p in controlCircle) {
        controlCircle[p] = null;
        delete controlCircle[p];
      }
      this.options.point.remove();
      this.options.menu.remove();
      this.options.center.remove();
      this.options.circle.remove();
    };

    this.menuBuild([{ name: '删除', func: clickCallBack }]);
  };
  removeMenu = () => {
    !!this.options.menuState && this.options.menu.remove();
    this.options.menuState = false;
  };
}
