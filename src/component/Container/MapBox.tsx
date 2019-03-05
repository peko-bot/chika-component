import React, { Component } from 'react';
import './css/MapBox.css';
import { Button, List } from 'antd-mobile';
import leaflet from '../EasyLeaflet';
import Popup from '../EasyLeaflet/Custom/Popup';
import L from 'leaflet';

function noop() {}

export interface MapBoxProps {
  lng: number | string;
  lat: number | string;
  address?: string;
  onBack: (item: any) => void;
  primaryValue?: number | string;
}
export interface MapBoxState {
  lng: number;
  lat: number;
  address: string;
}

export default class MapBox extends Component<MapBoxProps, MapBoxState> {
  mapContainer: any;
  map: any;

  static defaultProps = {
    lng: -1,
    lat: -1,
    address: '',
    onBack: noop,
    primaryValue: '',
  };

  static getDerivedStateFromProps(
    nextProps: MapBoxProps,
    nextState: MapBoxState,
  ) {
    if (nextState.lng === -1 && nextState.lat === -1) {
      return {
        lng: nextProps.lng,
        lat: nextProps.lat,
        address: nextProps.address,
      };
    }
    return null;
  }

  constructor(props: MapBoxProps) {
    super(props);

    this.state = {
      lng: -1,
      lat: -1,
      address: '',
    } as MapBoxState;

    this.mapContainer = React.createRef();
    this.map = null;
  }

  componentDidMount = () => {
    this.map = this.initMap();
    // hack: avoid show gray tiles if loading twice
    setTimeout(() => {
      this.map.remove();
      this.map = this.initMap();
      // get default coordinate
      leaflet.e.zoomIn();
      this.map.on('move', () => {
        this.setState({ ...this.map.getCenter() });
      });
    }, 0);
  };

  initMap = () => {
    const { lng, lat } = this.props;
    return leaflet.init(this.mapContainer.current, 'dxt', {
      center: [lat, lng],
      crs: L.CRS.EPSG3857,
      zoom: 15,
      dragging: true,
      zoomControl: false,
      attributionControl: false,
      latlngControl: false,
      zoomSnap: 0,
    });
  };

  render = () => {
    const { onBack, primaryValue } = this.props;
    const { lng, lat, address } = this.state;
    return (
      <div
        className="MapBox"
        ref={this.mapContainer}
        style={{ height: document.body.clientHeight }}
      >
        <Popup>
          <img
            src="../../assets/easyLeaflet/defaultIcon.png"
            style={{
              top: document.body.clientHeight / 2 - 48,
              left: document.body.clientWidth / 2 - 24,
            }}
          />
        </Popup>
        <List key="map-box-0" className="picker-info">
          <List.Item extra={lng}>经度</List.Item>
          <List.Item extra={lat}>纬度</List.Item>
          <List.Item extra={address}>地址</List.Item>
          <List.Item>
            <Button
              onClick={() =>
                onBack(Object.assign(this.state, { primaryValue }))
              }
            >
              返回
            </Button>
          </List.Item>
        </List>
      </div>
    );
  };
}
