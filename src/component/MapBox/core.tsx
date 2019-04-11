import React, { Component, createRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './css/MapBox.css';
import * as Tiles from './tiles';

export enum TileType {
  'gdTrafficTile',
  'gdSatelliteTile',
  'googleTile',
  'googleRsTile',
  'googleTrafficTile',
}
export type MoveEvent = (latlng: leaflet.LatLng) => void;
export interface MapBoxProps {
  /** when init, set center to map
   * { lng: string, lat: string }
   */
  center?: { lng: string; lat: string };
  /** it's an enum, includes
   * gdTrafficTile, gdSatelliteTile,
   * googleTile, googleRsTile, googleTrafficTile
   */
  type?: TileType;
  /** pass { lat, lng } back */
  onMoveStart?: MoveEvent;
  /** pass { lat, lng } back */
  onMove?: MoveEvent;
  /** pass { lat, lng } back */
  onMoveEnd?: MoveEvent;
  /** pass { lat, lng } back */
  onDragStart?: MoveEvent;
  /** pass { lat, lng } back */
  onDrag?: MoveEvent;
  /** pass { lat, lng } back */
  onDragEnd?: MoveEvent;
  /** whether to show Marker */
  markerVisible?: boolean;
  /** whether Marker can be dragged */
  markerDraggable?: boolean;
  /** pass { lat, lng } back */
  onMarkerMove?: MoveEvent;
  /** pass { lat, lng } back */
  onMarkerMoveStart?: MoveEvent;
  /** pass { lat, lng } back */
  onMarkerMoveEnd?: MoveEvent;
  /** pass { lat, lng } back */
  onMarkerDragStart?: MoveEvent;
  /** pass { lat, lng } back */
  onMarkerDrag?: MoveEvent;
  /** pass { lat, lng } back */
  onMarkerDragEnd?: MoveEvent;
}
export interface MapBoxState {
  center: { lng: string; lat: string };
}

const defaultMapOptions: leaflet.MapOptions = {
  center: [31.8, 121.66],
  crs: leaflet.CRS.EPSG3857,
  zoom: 15,
  maxZoom: 18,
  minZoom: 1,
  dragging: true,
  zoomControl: true,
  attributionControl: false,
};

export default class MapBox extends Component<MapBoxProps, MapBoxState> {
  static getDerivedStateFromProps(
    nextProps: MapBoxProps,
    nextState: MapBoxState,
  ) {
    if (nextProps.center) {
      if (
        nextProps.center.lat !== nextState.center.lat ||
        nextProps.center.lng !== nextState.center.lng
      ) {
        return {
          center: nextProps.center,
        };
      }
    }
    return null;
  }
  container: React.RefObject<HTMLDivElement>;
  map: leaflet.Map;
  marker: leaflet.Marker;

  constructor(props: MapBoxProps) {
    super(props);

    this.state = {
      center: props.center || { lng: '121.66', lat: '31.8' },
    };
    this.container = createRef();
  }

  componentDidMount = () => {
    this.init();
  };

  init = () => {
    const { type = 'gdTrafficTile' } = this.props;
    const map = leaflet
      .map(this.container.current || document.body, defaultMapOptions)
      .locate({ setView: true, maxZoom: 16 });

    this.bindMapEvent(map);
    (Tiles as any)[type].addTo(map);

    const icon = leaflet.icon({
      iconUrl: './assets/defaultIcon.png',
    });
    const marker = leaflet
      .marker([31.8, 121.66], { icon, draggable: true, autoPan: true })
      .addTo(map);
    this.bindMarkerEvent(marker);

    this.map = map;
    this.marker = marker;
  };

  bindMapEvent = (map: leaflet.Map) => {
    const {
      onDrag,
      onDragEnd,
      onDragStart,
      onMove,
      onMoveEnd,
      onMoveStart,
    } = this.props;

    if (onDrag) {
      map.on('drag', e => onDrag(this.getCenter(e)));
    }
    if (onDragStart) {
      map.on('dragstart', e => onDragStart(this.getCenter(e)));
    }
    if (onDragEnd) {
      map.on('dragend', e => onDragEnd(this.getCenter(e)));
    }
    if (onMove) {
      map.on('move', e => onMove(this.getCenter(e)));
    }
    if (onMoveEnd) {
      map.on('moveend', e => onMoveEnd(this.getCenter(e)));
    }
    if (onMoveStart) {
      map.on('movestart', e => onMoveStart(this.getCenter(e)));
    }
  };

  bindMarkerEvent = (marker: leaflet.Marker) => {
    const {
      onMarkerDrag,
      onMarkerDragEnd,
      onMarkerDragStart,
      onMarkerMove,
      onMarkerMoveEnd,
      onMarkerMoveStart,
    } = this.props;
    if (onMarkerDrag) {
      marker.on('drag', e => onMarkerDrag(this.getMarkCenter(e)));
    }
    if (onMarkerDragEnd) {
      marker.on('dragend', e => onMarkerDragEnd(this.getMarkCenter(e)));
    }
    if (onMarkerDragStart) {
      marker.on('dragstart', e => onMarkerDragStart(this.getMarkCenter(e)));
    }
    if (onMarkerMove) {
      marker.on('move', e => onMarkerMove(this.getMarkCenter(e)));
    }
    if (onMarkerMoveEnd) {
      marker.on('moveend', e => onMarkerMoveEnd(this.getMarkCenter(e)));
    }
    if (onMarkerMoveStart) {
      marker.on('movestart', e => onMarkerMoveStart(this.getMarkCenter(e)));
    }
  };

  render = () => {
    return <div className="MapBox" ref={this.container} />;
  };

  private getCenter = (e: leaflet.LeafletEvent) => e.target.getCenter();

  private getMarkCenter = (e: leaflet.LeafletEvent) => e.target.getLatLng();
}
