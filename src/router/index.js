/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-21 21:02:49 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-13 15:59:18
 */
import React, { Component } from 'react'
import { Route, NavLink, HashRouter } from 'react-router-dom'

import Bundle from '../util/Bundle'

const Calendar = props => (
    <Bundle load={ () => import('../modules/Calendar_demo/Calendar_demo') }>
        { Calendar => <Calendar {...props}/> }
    </Bundle>
)

const Button = props => (
    <Bundle load={ () => import('../modules/Button_demo/Button_demo') }>
        { Button => <Button {...props}/> }
    </Bundle>
)

const List_Container = props => (
    <Bundle load={ () => import('../modules/List_Container_demo/List_Container_demo') }>
        { List_Container => <List_Container {...props}/> }
    </Bundle>
)

const Swiper = props => (
    <Bundle load={ () => import('../modules/Swiper_demo/Swiper_demo') }>
        { Swiper => <Swiper {...props}/> }
    </Bundle>
)

const Tabs = props => (
    <Bundle load={ () => import('../modules/Tabs_demo/Tabs_demo') }>
        { Tabs => <Tabs {...props}/> }
    </Bundle>
)

const Progress = props => (
    <Bundle load={ () => import('../modules/Progress_demo') }>
        { Progress => <Progress {...props}/> }
    </Bundle>
)

export default class Router extends Component {
    render = () => (
        <HashRouter>
            <div>
                <Route path='/button' component={ Button } />
                <Route path='/calendar' component={ Calendar } />
                <Route path='/list_container' component={ List_Container } />
                <Route path='/swiper' component={ Swiper } />
                <Route path='/tabs' component={ Tabs } />
                <Route path='/progress' component={ Progress } />
            </div>
        </HashRouter>
    )
}