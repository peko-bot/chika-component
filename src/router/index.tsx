import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Calendar from '../demo/Calendar';
import Container from '../demo/Container';
import Swiper from '../demo/Swiper';
import Ripple from '../demo/Ripple';
import Tabs from '../demo/Tabs';
import Progress from '../demo/Progress';
import Upload from '../demo/Upload';
import Drawer from '../demo/Drawer';
import TransformManager from '../demo/TransformManager';
import MapBox from '../demo/MapBox';
import Template from '../demo/Template';

export default class Entry extends Component {
  render = () => (
    <HashRouter>
      <Switch>
        <Route
          path="/calendar"
          component={(props: any) => <Calendar {...props} />}
        />
        <Route
          path="/container"
          component={(props: any) => <Container {...props} />}
        />
        <Route
          path="/swiper"
          component={(props: any) => <Swiper {...props} />}
        />
        <Route path="/tabs" component={(props: any) => <Tabs {...props} />} />
        <Route
          path="/progress"
          component={(props: any) => <Progress {...props} />}
        />
        <Route
          path="/ripple"
          component={(props: any) => <Ripple {...props} />}
        />
        <Route
          path="/upload"
          component={(props: any) => <Upload {...props} />}
        />
        <Route
          path="/drawer"
          component={(props: any) => <Drawer {...props} />}
        />
        <Route
          path="/transform"
          component={(props: any) => <TransformManager {...props} />}
        />
        <Route
          path="/mapbox"
          component={(props: any) => <MapBox {...props} />}
        />
        <Route
          path="/template"
          component={(props: any) => <Template {...props} />}
        />
      </Switch>
    </HashRouter>
  );
}
