import React from 'react';
import MapBox from '../../component/MapBox';

export default () => (
  <MapBox onMarkerMove={({ lat, lng }) => console.log(lat, lng)} />
);
