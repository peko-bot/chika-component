import React from 'react';
import k from '../../component/EasyLeaflet';
import Detail from './popup';
import { GetParams } from '../../util/GetParams';
import L from 'leaflet';

export interface EasyLeafletDemoState {
  layoutState: boolean;
  layoutIndex: number;
  info: { lat: string; lng: string; address: string };
}

export default class EasyLeafletDemo extends React.Component<
  any,
  EasyLeafletDemoState
> {
  map: any = null;
  pageH = document.documentElement.clientHeight || document.body.clientHeight;
  pageW = document.documentElement.clientWidth || document.body.clientWidth;

  constructor(props: any) {
    super(props);
    this.state = {
      layoutState: false,
      layoutIndex: 1,
      info: { lat: '', lng: '', address: '' },
    };
  }
  componentDidMount = () => {
    const center = [GetParams('lat') || 29.9502, GetParams('lng') || 121.4839];

    // 重画
    const mapInit = () => {
      this.map = k.init('mapBox', 'dxt', {
        center,
        crs: L.CRS.EPSG3857,
        zoom: 15,
        dragging: true,
        zoomControl: false,
        attributionControl: false,
        latlngControl: false,
        zoomSnap: 0,
      });
    };

    mapInit();

    // 避免第二次跳转到地图时，地图会变灰
    setTimeout(() => {
      this.map.remove();

      mapInit();

      // 获得默认坐标
      k.e.zoomIn();

      this.map.on('moveend', () => {
        let { lat, lng, address = '暂不支持地址显示' } = this.map.getCenter();

        (window as any).parent.leafletLatng = `${lng}|${lat}|${address}`;

        this.setState({ info: { lat, lng, address } });
      });
    }, 0);
  };

  render = () => {
    const { info } = this.state;

    return (
      <div id="mapBox" style={{ height: this.pageH }}>
        <img
          src="../../assets/easyLeaflet/defaultIcon.png"
          style={{
            position: 'absolute',
            top: this.pageH / 2 - 48,
            left: this.pageW / 2 - 24,
            zIndex: 9997,
          }}
        />
        <Detail info={info} />
      </div>
    );
  };
}
