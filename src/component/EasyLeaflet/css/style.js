/**默认点样式 */
export const defaultIconStyle = {
    className    : "leaflet_point",                         // dom className
    iconUrl      : "../../../assets/easyLeaflet/defaultIcon.png",  // 点图片路径
    iconSize     : [40, 40],                                // 点大小
    iconAnchor   : [20, 40],                            // 点偏移 1/2 iconSize 为居中
    popupAnchor  : [0, -20],                                // popup偏移
    shadowUrl    : "",                                      // 点阴影图片路径
    shadowSize   : [68, 95],                                // 阴影图片大小
    shadowAnchor : [22, 94]                                 // 阴影图片偏移
}
/**测距点样式 */
export const measureRangePoint = {
    iconUrl    : '../../../assets/easyLeaflet/rang.png',
    iconSize   : [12,12],
    iconAnchor : [6,6]
}
/**可控制线控制点样式 */
export const controlLinePoint = {
    iconUrl    : '../../../assets/easyLeaflet/_rang.png',
    iconSize   : [12,12],
    iconAnchor : [6,6]
}
/**测面点样式 */
export const measureAreaPoint = {
    iconUrl    : '../../../assets/easyLeaflet/areaPoint.png',
    iconSize   : [12,12],
    iconAnchor : [6,6]
}
/**控制点样式 */
export const markerControlPoint = {
    weight      : 1,
    radius      : 7,
    fillColor   : '#e55',
    fillOpacity : 0.8,
    stroke      : false
}
/**默认线样式 */
export const defaultLineStyle = {
    color     : "#fd8045",         // 线颜色
    weight    : 3,              // 线宽度
    opacity   : 1,              // 线透明度 
    className : "leaflet_line"  // dom className
}
/**默认面样式 */
export const defaultAreaStyle = {
    color       : "#257bd3",         // 边框颜色
    weight      : 1,              // 边线宽度
    opacity     : 0.8,              // 边线透明度
    fillColor   : "#a8cfee",         // 填充色
    fillOpacity : 0.6,              // 填充透明度
    className   : "leaflet_area"  // dom className
}
/**测面移动面样式 */
export const moveAreaStyle = {
    color       : '#257bd3',
    weight      : 1,
    opacity     : 0.5,
    fillColor   : '#a8cfee',
    fillOpacity : 0.4
}
/**默认popup样式 */
export const defaultPopupStyle = {
    tBgColor  : "#56B7EA",    // 标题背景色
    tColor    : "#ffffff",    // 内容行背景色
    width     : "250px"       // 宽度
}
/**默认弹框参数 */
export const defaultDivStyle = {
    direction : 'top',    // 朝向 top/bottom/left/right
    height    : 100,      // 弹框高度
    width     : 100,      // 弹框宽度
    lat       : 0,        // 经度
    lng       : 0,        // 纬度
    x         : 0,        // x轴偏移
    y         : -15       // y轴偏移
}