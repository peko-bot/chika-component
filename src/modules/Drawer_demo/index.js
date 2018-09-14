/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-14 13:55:48
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-14 13:58:47
 */
import React, { Component } from 'react';

import Drawer from '../../component/Drawer';

export default class DrawerDemo extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    render = () => {
    	return (
    		<div className='Drawer_demo'>
    			<Drawer>
                    test
    			</Drawer>
    		</div>
    	);
    }
}