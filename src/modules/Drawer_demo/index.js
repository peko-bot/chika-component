/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-14 13:55:48
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-14 14:47:01
 */
import React, { Component } from 'react';

import Drawer from '../../component/Drawer';

const defaultWidth = 400;

export default class DrawerDemo extends Component {
	constructor (props) {
		super(props);

		this.state = {
			position: -defaultWidth,
		};
	}

    componentDidMount = () => {
    	setTimeout(() => {
    		this.setState({ position: 0 });
    	}, 500);
    }

    render = () => {
    	const { position } = this.state;

    	return (
    		<div className='Drawer_demo'>
    			<Drawer position={ position }>
                    test
    			</Drawer>
    		</div>
    	);
    }
}