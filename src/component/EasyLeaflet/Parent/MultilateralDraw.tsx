export default class MultilateralDraw {
  options = {
    drawState: 0,
    draw: null,
    moveDraw: null,
    time: 0,
    prePoint: null,
    thisPoint: null,
    points: [],
    _points: [],
    icon: [],
    closeL: 0,
    lengthT: 0,
  };
  firstClick = (e, type, { draw, moveDraw, pointStyle }) => {
    this.options.prePoint = this.options.thisPoint = {
      latlng: e.latlng,
      layerPoint: e.layerPoint,
    };
    this.options.time = new Date().getTime();
    this.options.draw = L[type]([e.latlng], draw).addTo(map);
    this.options.moveDraw = L[type]([], moveDraw).addTo(map);
    let point = L.marker(e.latlng, { icon: L.icon(pointStyle) }).addTo(map);

    this.options.points.push(point);
  };
  nextClick = (e, style) => {
    this.options.closeL =
      e.latlng.lng > this.options.thisPoint.latlng.lng ? '20px' : '-20px';
    this.options.lengthT =
      e.latlng.lat > this.options.thisPoint.latlng.lat ? '-25px' : '18px';
    this.options.thisPoint = { latlng: e.latlng, layerPoint: e.layerPoint };
    eHelper.addLatLng(this.options.draw, [e.latlng]);
    let point = L.marker(e.latlng, { icon: L.icon(style) }).addTo(map);

    this.options.points.push(point);
  };
  enterClick = (e, className, length, callBack) => {
    let btn = L.marker(e.latlng, {
      icon: L.divIcon({
        className: 'leaflet_' + className + '_close',
        // eslint-disable-next-line
        html: "<span style = 'left : " + this.options.closeL + "'></span>",
      }),
    }).addTo(map);

    btn.on('click', e => {
      this.options.draw.remove();
      this.options.points.map(item => item.remove());
      this.options.icon.map(item => item.remove());
    });
    this.options.icon.push(btn);
    let measureName = className === 'measureRange' ? '总长' : '总面积';

    if (length) {
      let lengthIcon = L.marker(e.latlng, {
        icon: L.divIcon({
          className: 'leaflet_' + className + '_length',
          html: `<span style="top: ${this.options.lengthT};">
              ${measureName}
              <span>${length.num}</span>
              <span>${length.unit}</span>
            </span>`,
        }),
      }).addTo(map);

      this.options.icon.push(lengthIcon);
    }
    this.options.moveDraw.remove();
    this.options.moveDraw = null;
    !!callBack && callBack();
  };
  judgeDistence = e => {
    return (
      Math.pow(this.options.thisPoint.layerPoint.x - e.layerPoint.x, 2) +
        Math.pow(this.options.thisPoint.layerPoint.y - e.layerPoint.y, 2) >
      16
    );
  };
  calcLineCenterPoint = (endPoint = false) => {
    let points = [],
      p = this.options.points;

    p.map((item, i) => {
      //latLngToLayerPoint
      if (endPoint || (!endPoint && i + 1 < p.length)) {
        let j = i + 1 < p.length ? i + 1 : 0,
          iP = map.latLngToLayerPoint(p[i]['_latlng']),
          jP = map.latLngToLayerPoint(p[j]['_latlng']),
          point = {
            center: {
              lat: (p[i]['_latlng'].lat + p[j]['_latlng'].lat) / 2,
              lng: (p[i]['_latlng'].lng + p[j]['_latlng'].lng) / 2,
            },
            length: Math.sqrt(
              Math.pow(iP.x - jP.x, 2) + Math.pow(iP.y - jP.y, 2),
            ),
          };

        points.push(point);
      }
    });
    return points;
  };
}
