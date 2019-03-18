import React, { Component } from 'react';
import { MapBox } from '../../component/MapBox';

export default class MapBoxDemo extends Component {
  render = () => {
    return (
      <div className="MapBoxDemo">
        <MapBox onMove={({ lat, lng }) => console.log(lat, lng)} />
      </div>
    );
  };
}
