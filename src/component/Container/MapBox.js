import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/MapBox.css';
import { Button } from 'antd-mobile';
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
        <Button
          onClick={onBack}
          className="back-to-list"
          style={{ position: 'absolute' }}
        >
          返回
        </Button>
      </div>
    );
  };
}
