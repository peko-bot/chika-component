import React, { Component, createRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './assets/MapBox.css';
import { googleTrafficTile } from './tiles';

export interface MapBoxProps {
  center?: { lng: number; lat: number };
  tileType?: string;
}
export interface MapBoxState {}

const defaultMapOptions = {
  center: [31.8, 121.66] as [number, number],
  crs: leaflet.CRS.EPSG3857,
  zoom: 15,
  maxZoom: 18,
  minZoom: 1,
  dragging: true,
  zoomControl: true,
  attributionControl: false,
  latlngControl: false,
};

export default class MapBox extends Component<MapBoxProps, MapBoxState> {
  container: React.RefObject<HTMLDivElement>;

  constructor(props: MapBoxProps) {
    super(props);

    this.state = {};
    this.container = createRef();
  }

  componentDidMount = () => {
    this.init();
  };

  init = () => {
    if (this.container.current) {
      const map = leaflet.map(this.container.current, defaultMapOptions);
      googleTrafficTile.addTo(map);
    }
  };

  render = () => {
    return <div className="MapBox" ref={this.container} />;
  };
}
