import React, { Component, Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const Calendar = lazy(() => import('../demo/Calendar'));
const Button = lazy(() => import('../demo/Button'));
const Container = lazy(() => import('../demo/Container'));
const Swiper = lazy(() => import('../demo/Swiper'));
const Ripple = lazy(() => import('../demo/Ripple'));
const Tabs = lazy(() => import('../demo/Tabs'));
const Progress = lazy(() => import('../demo/Progress'));
const EasyLeaflet = lazy(() => import('../demo/EasyLeaflet'));
const Upload = lazy(() => import('../demo/Upload'));
const Drawer = lazy(() => import('../demo/Drawer'));

export default class Entry extends Component {
  render = () => (
    <HashRouter>
      <Suspense fallback={<div>加载中...</div>}>
        <Switch>
          <Route path="/button" component={props => <Button {...props} />} />
          <Route
            path="/calendar"
            component={props => <Calendar {...props} />}
          />
          <Route
            path="/container"
            component={props => <Container {...props} />}
          />
          <Route path="/swiper" component={props => <Swiper {...props} />} />
          <Route path="/tabs" component={props => <Tabs {...props} />} />
          <Route
            path="/progress"
            component={props => <Progress {...props} />}
          />
          <Route path="/ripple" component={props => <Ripple {...props} />} />
          <Route
            path="/easyLeaflet"
            component={props => <EasyLeaflet {...props} />}
          />
          <Route path="/upload" component={props => <Upload {...props} />} />
          <Route path="/drawer" component={props => <Drawer {...props} />} />
        </Switch>
      </Suspense>
    </HashRouter>
  );
}
