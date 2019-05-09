import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const Container = lazy(() => import('../demo/Container'));
const Swiper = lazy(() => import('../demo/Swiper'));
const Upload = lazy(() => import('../demo/Upload'));
const TransformManager = lazy(() => import('../demo/TransformManager'));
const MapBox = lazy(() => import('../demo/MapBox'));
const Template = lazy(() => import('../demo/Template'));

export default () => (
  <HashRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Container} />
        <Route path="/container" component={Container} />
        <Route path="/swiper" component={Swiper} />
        <Route path="/upload" component={Upload} />
        <Route path="/transform" component={TransformManager} />
        <Route path="/mapbox" component={MapBox} />
        <Route path="/template" component={Template} />
      </Switch>
    </Suspense>
  </HashRouter>
);
