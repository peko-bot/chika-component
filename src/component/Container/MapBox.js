import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './css/MapBox.css';
import { Button } from 'antd-mobile';
import leaflet from '../EasyLeaflet';
import Popup from '../EasyLeaflet/Custom/Popup';

function noop() {}
export default class MaxBox extends Component {
  static propTypes = {
    lng: PropTypes.number,
    lat: PropTypes.number,
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

    this.state = {};

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
      this.map.on('moveend', e => {
        let { lat, lng, address = '暂不支持地址显示' } = this.map.getCenter();

        // eslint-disable-next-line
        console.log(lat, lng, address);
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
