import React, { Component, createRef } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './assets/MapBox.css';
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
   * { lng: number, lat: number }
   */
  center?: { lng: number; lat: number };
  /** it's an enum, includes
   * gdTrafficTile, gdSatelliteTile,
   * googleTile, googleRsTile, googleTrafficTile
   */
  type?: TileType;
  /** when move start, it will pass { lat, lng } back */
  onMoveStart?: MoveEvent;
  /** when moving, it will pass { lat, lng } back */
  onMove?: MoveEvent;
  /** when move end, it will pass { lat, lng } back */
  onMoveEnd?: MoveEvent;
  /** when drag start, it will pass { lat, lng } back */
  onDragStart?: MoveEvent;
  /** when dragging, it will pass { lat, lng } back */
  onDrag?: MoveEvent;
  /** when drag end, it will pass { lat, lng } back */
  onDragEnd?: MoveEvent;
}
export interface MapBoxState {}

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
  container: React.RefObject<HTMLDivElement>;
  map: leaflet.Map;

  constructor(props: MapBoxProps) {
    super(props);

    this.state = {};
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

    this.bindEvent(map);
    (Tiles as any)[type].addTo(map);

    this.map = map;
  };

  bindEvent = (map: leaflet.Map) => {
    const {
      onDrag,
      onDragEnd,
      onDragStart,
      onMove,
      onMoveEnd,
      onMoveStart,
    } = this.props;

    const getCenter = (e: leaflet.LeafletEvent) => e.target.getCenter();

    if (onDrag) {
      map.on('drag', e => onDrag(getCenter(e)));
    }
    if (onDragStart) {
      map.on('dragstart', e => onDragStart(getCenter(e)));
    }
    if (onDragEnd) {
      map.on('dragend', e => onDragEnd(getCenter(e)));
    }
    if (onMove) {
      map.on('move', e => onMove(getCenter(e)));
    }
    if (onMoveEnd) {
      map.on('moveend', e => onMoveEnd(getCenter(e)));
    }
    if (onMoveStart) {
      map.on('movestart', e => onMoveStart(getCenter(e)));
    }
  };

  render = () => {
    return <div className="MapBox" ref={this.container} />;
  };
}
