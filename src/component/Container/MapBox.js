import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/MapBox.css';
import { Button, List } from 'antd-mobile';
import leaflet from '../EasyLeaflet';
import Popup from '../EasyLeaflet/Custom/Popup';

function noop() {}
export default class MapBox extends Component {
  static propTypes = {
    lng: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    lat: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    address: PropTypes.string,
    onBack: PropTypes.func,
  };

  static defaultProps = {
    lng: -1,
    lat: -1,
    address: '',
    onBack: noop,
  };

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.lng === -1 && nextState.lat === -1) {
      return {
        lng: nextProps.lng,
        lat: nextProps.lat,
        address: nextProps.address,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      lng: -1,
      lat: -1,
      address: '',
    };

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
      this.map.on('move', e => {
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
    const { onBack } = this.props;
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
            <Button onClick={() => onBack(this.state)}>返回</Button>
          </List.Item>
        </List>
      </div>
    );
  };
}
