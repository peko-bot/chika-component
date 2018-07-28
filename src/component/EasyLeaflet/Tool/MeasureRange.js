/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-27 20:34:50 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 08:42:46
 * @Description: 测距
 */
import MultilateralDraw from '../Parent/MultilateralDraw'

export class MeasureRange extends MultilateralDraw {
    constructor(props) {
        super(props);
        this.initialize();
    }
    initialize = () => {
        eHelper.on(range, _CLICK, this.click);
        eHelper.on(range, _MOUSEMOVE, this.move);
        eHelper.setCursor('crosshair');
        map.doubleClickZoom.disable();
    }
    click = (e) => {
        if (!this.options.draw) {
            this.firstClick(e, 'polyline', { draw: defaultLineStyle, moveDraw: defaultLineStyle, pointStyle: measureRangePoint });
            let qd = L.marker(e.latlng, { icon: L.divIcon({ className: 'leaflet_measureArea_qd', html: "<span>起点</span>" }) }).addTo(map);
            this.options.icon.push(qd);
        } else {
            let time = new Date().getTime();
            if (time - this.options.time < 330) {
                this.options.icon[this.options.icon.length - 1].remove();
                let length = eHelper.calcLength(this.options.points);
                length = eHelper.lengthFormat(length);
                this.enterClick(e, 'measureRange', length)
                setTimeout(() => {
                    for (let p in range) { range[p] = null; delete range[p]; }
                    eHelper.setCursor(null);
                    map.doubleClickZoom.enable();
                }, 0)
            } else if (this.judgeDistence(e)) {
                this.nextClick(e, measureRangePoint);
                let length = eHelper.calcLength(this.options.points);
                length = eHelper.lengthFormat(length);
                let partL = L.marker(e.latlng, { icon: L.divIcon({ className: 'leaflet_measureRange_partL', html: "<span>" + length.num + length.unit + "</span>" }) }).addTo(map);
                this.options.icon.push(partL);
            }
            this.options.time = time;
        }
    }
    move = (e) => {
        !!this.options.moveDraw && !!this.options.thisPoint && this.options.moveDraw.setLatLngs([this.options.thisPoint.latlng, e.latlng]);
    }
}