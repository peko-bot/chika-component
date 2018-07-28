import React from 'react';

import Ripple from '../../component/Ripple/Ripple';
import './css/Ripple_demo.css';

export default class RippleDemo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {};
	}

    dataSource = [
    	{ label: 'test1' },
    	{ label: 'test2' },
    ];

    render () {
    	return (
    		<div className='Ripple_demo'>
    			{
    				this.dataSource.map((item, i) => {
    					return (
    						<div className='item' key={ 'item' + i }>
    							<div ref={ref => this[`item_${i}`] = ref} className='item-label'>{item.label}</div>
    							<Ripple ref={ref => ref.init(this[`item_${i}`])} wrapWidth={document.body.clientWidth} />
    						</div>
    					);
    				})
    			}
    		</div>
    	);
    }
}