import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Calendar from '../demo/Calendar';
import Container from '../demo/Container';
import Swiper from '../demo/Swiper';
import Ripple from '../demo/Ripple';
import Tabs from '../demo/Tabs';
import Upload from '../demo/Upload';
import Drawer from '../demo/Drawer';
import TransformManager from '../demo/TransformManager';
import MapBox from '../demo/MapBox';
import Template from '../demo/Template';

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Container} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/container" component={Container} />
      <Route path="/swiper" component={Swiper} />
      <Route path="/tabs" component={Tabs} />
      <Route path="/ripple" component={Ripple} />
      <Route path="/upload" component={Upload} />
      <Route path="/drawer" component={Drawer} />
      <Route path="/transform" component={TransformManager} />
      <Route path="/mapbox" component={MapBox} />
      <Route path="/template" component={Template} />
    </Switch>
  </HashRouter>
);
