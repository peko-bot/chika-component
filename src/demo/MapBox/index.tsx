import React from 'react';
import MapBox from '../../component/MapBox';

export default () => (
  // tslint:disable-next-line
  <MapBox onMarkerMove={({ lat, lng }) => console.log(lat, lng)} />
);
