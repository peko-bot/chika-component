import MultilateralDraw from '../Parent/MultilateralDraw';

const CLICK = 'MAP_CLICK';

export default class ControlLine extends MultilateralDraw {
  constructor(props) {
    super(props);
    this.initialize();
  }
  initialize = () => {
    eHelper.on(controlLine, _CLICK, this.click);
    eHelper.on(controlLine, _MOUSEMOVE, this.move);
    eHelper.setCursor('crosshair');
    map.doubleClickZoom.disable();
  };
  click = e => {
    if (!this.options.draw) {
      this.firstClick(e, 'polyline', {
        draw: defaultLineStyle,
        moveDraw: defaultLineStyle,
        pointStyle: measureRangePoint,
      });
    } else {
      let time = new Date().getTime();

      if (time - this.options.time < 330) {
        this.options.moveDraw.remove();
        this.options.moveDraw = null;
        setTimeout(() => {
          controlLine[CLICK] = null;
          delete controlLine[CLICK];
          eHelper.setCursor(null);
          map.doubleClickZoom.enable();
          eHelper.on(controlLine, _ZOOMEND, this.buildControlPoint);
          this.buildControlPoint();
        }, 0);
      } else if (this.judgeDistence(e)) {
        this.nextClick(e, measureRangePoint);
      }
      this.options.time = time;
    }
  };
  move = e => {
    if (this.options.drawState === 0) {
      !!this.options.moveDraw &&
        !!this.options.thisPoint &&
        this.options.moveDraw.setLatLngs([
          this.options.thisPoint.latlng,
          e.latlng,
        ]);
    } else if (this.options.drawState === 1) {
    }
  };
  addPointEvent = () => {
    this.options.drawState = 1;
  };
  buildControlPoint = () => {
    let points = this.calcLineCenterPoint(),
      i = 0;

    points.map((item, j) => {
      if (item.length > 40 && !!this.options['_points'][i]) {
        this.options['_points'][i].setLatLng(item.center);
        i++;
      } else if (item.length > 40 && !this.options['_points'][i]) {
        this.options['_points'][i] = L.marker(item.center, {
          icon: L.icon(controlLinePoint),
          index: j,
        }).addTo(map);
        i++;
      }
    });
    this.options['_points'].map((child, c) => {
      if (c >= i) {
        !!child && child.remove();
        this.options['_points'][c] = null;
      }
    });
  };
}
