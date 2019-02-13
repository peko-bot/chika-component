import MultilateralDraw from '../Parent/MultilateralDraw';

export default class MeasureArea extends MultilateralDraw {
  constructor(props) {
    super(props);
    this.initialize();
  }
  initialize = () => {
    eHelper.on(area, _CLICK, this.click);
    eHelper.on(area, _MOUSEMOVE, this.move);
    eHelper.setCursor('crosshair');
    map.doubleClickZoom.disable();
  };
  click = e => {
    if (!this.options.draw) {
      this.firstClick(e, 'polygon', {
        draw: defaultAreaStyle,
        moveDraw: moveAreaStyle,
        pointStyle: measureAreaPoint,
      });
      let qd = L.marker(e.latlng, {
        icon: L.divIcon({
          className: 'leaflet_measureArea_qd',
          html: '<span>起点</span>',
        }),
      }).addTo(map);

      this.options.icon.push(qd);
    } else {
      let time = new Date().getTime();

      if (time - this.options.time < 330) {
        let length = eHelper.calcArea(this.options.points);

        length = eHelper.areaFormat(length);
        this.enterClick(e, 'measureArea', length);
        setTimeout(() => {
          for (let p in area) {
            area[p] = null;
            delete area[p];
          }
          eHelper.setCursor(null);
          map.doubleClickZoom.enable();
        }, 0);
      } else if (this.judgeDistence(e)) {
        this.nextClick(e, measureAreaPoint);
      }
      this.options.time = time;
    }
  };
  move = e => {
    !!this.options.moveDraw &&
      !!this.options.prePoint &&
      !!this.options.thisPoint &&
      this.options.moveDraw.setLatLngs([
        this.options.prePoint.latlng,
        this.options.thisPoint.latlng,
        e.latlng,
      ]);
  };
}
