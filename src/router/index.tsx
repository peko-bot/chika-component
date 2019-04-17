import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Container from '../demo/Container';
import Swiper from '../demo/Swiper';
import Upload from '../demo/Upload';
import TransformManager from '../demo/TransformManager';
import MapBox from '../demo/MapBox';
import Template from '../demo/Template';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Container} />
      <Route path="/container" component={Container} />
      <Route path="/swiper" component={Swiper} />
      <Route path="/upload" component={Upload} />
      <Route path="/transform" component={TransformManager} />
      <Route path="/mapbox" component={MapBox} />
      <Route path="/template" component={Template} />
    </Switch>
  </HashRouter>
);
