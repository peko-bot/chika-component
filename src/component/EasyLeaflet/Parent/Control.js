/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-28 08:47:36 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 09:15:59
 */

/**可控要素通用 */
export default class Control {
    options = {
        circle: null,
        point: null,
        center: null,
        cLatLng: null,
        r: 0,
        state: 0,
        Dlat: 0,
        Dlng: 0,
        mLatLng: {},
        menu: null,
        menuState: false
    }
    readyChange = (e) => {
        this.options.Dlat = this.options.mLatLng.lat - e.latlng.lat;
        this.options.Dlng = this.options.mLatLng.lng - e.latlng.lng;
        map.dragging.disable();
    }
    menuBuild = (obj) => {
        if (!this.options.menuState) {
            let dom = '';
            obj.map(item => dom += "<div class = 'pointRightMenuDiv''>" + item.name + "</div>")
            this.options.menuState = true;
            let rightClickIcon = L.divIcon({
                className: "pointRightMenu",
                html: dom
            })
            this.options.menu = L.marker(this.options.mLatLng, { icon: rightClickIcon }).addTo(map);
            this.options.menu._icon.style.zIndex = 9999;
            obj.map((item, i) => this.options.menu._icon.childNodes[i].addEventListener('click', e => eHelper.isFunction(item.func) && item.func()));
        }
    }
}