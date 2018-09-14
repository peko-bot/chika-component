/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-21 21:02:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-14 13:55:26
 */
import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import Bundle from '../util/Bundle';

const Calendar = props => (
	<Bundle load={ () => import('../modules/Calendar_demo/Calendar_demo') }>
		{ Calendar => <Calendar {...props}/> }
	</Bundle>
);

const Button = props => (
	<Bundle load={ () => import('../modules/Button_demo/Button_demo') }>
		{ Button => <Button {...props}/> }
	</Bundle>
);

const ListContainer = props => (
	<Bundle load={ () => import('../modules/ListContainer_demo') }>
		{ ListContainer => <ListContainer {...props}/> }
	</Bundle>
);

const Swiper = props => (
	<Bundle load={ () => import('../modules/Swiper_demo/Swiper_demo') }>
		{ Swiper => <Swiper {...props}/> }
	</Bundle>
);

const Ripple = props => (
	<Bundle load={ () => import('../modules/Ripple_demo/Ripple_demo') }>
		{ Ripple => <Ripple {...props}/> }
	</Bundle>
);

const Tabs = props => (
	<Bundle load={ () => import('../modules/Tabs_demo/Tabs_demo') }>
		{ Tabs => <Tabs {...props}/> }
	</Bundle>
);

const Progress = props => (
	<Bundle load={ () => import('../modules/Progress_demo') }>
		{ Progress => <Progress {...props}/> }
	</Bundle>
);

const EasyLeaflet = props => (
	<Bundle load={ () => import('../modules/EasyLeaflet_demo') }>
		{ EasyLeaflet => <EasyLeaflet {...props}/> }
	</Bundle>
);

const Upload = props => (
	<Bundle load={ () => import('../modules/Upload_demo') }>
		{ Upload => <Upload {...props}/> }
	</Bundle>
);

const Drawer = props => (
	<Bundle load={ () => import('../modules/Drawer_demo') }>
		{ Drawer => <Drawer {...props}/> }
	</Bundle>
);

const Test = props => (
	<Bundle load={ () => import('../modules/Test_demo') }>
		{ Test => <Test {...props}/> }
	</Bundle>
);

export default class Router extends Component {
    render = () => (
    	<HashRouter>
    		<div>
    			<Route path='/button' component={ Button } />
    			<Route path='/calendar' component={ Calendar } />
    			<Route path='/list_container' component={ ListContainer } />
    			<Route path='/swiper' component={ Swiper } />
    			<Route path='/tabs' component={ Tabs } />
    			<Route path='/progress' component={ Progress } />
    			<Route path='/ripple' component={ Ripple } />
    			<Route path='/easyLeaflet' component={ EasyLeaflet } />
    			<Route path='/upload' component={ Upload } />
    			<Route path='/drawer' component={ Drawer } />
    			<Route path='/test' component={ Test } />
    		</div>
    	</HashRouter>
    )
}