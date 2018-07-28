/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-04 17:16:57
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 13:49:35
 */
import React from 'react';

import Tabs from '../../component/Tabs';
// import Tabs from '../../../dist/Tabs'

export default class TabsDemo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: [],
			currentSelect: 1,
			labelText1: 9,
			labelText2: 8,
		};
	}

    componentDidMount = () => {
    	setTimeout(() => {
    		this.setState({
    			labelText1: '测试1',
    			labelText2: '测试2',
    		});
    	}, 1000);
    }

    onClick = (item, currentSelect) => {
    	this.setState({ currentSelect });
    }

    config = {
    	// containerStyle: {background: '#F96'}
    }

    render () {
    	const { result, currentSelect, labelText1, labelText2 } = this.state;

    	return (
    		<div className='Tabs_demo'>
    			<Tabs currentSelect={currentSelect} onClick={this.onClick} config={this.config}>
    				<div label={`test1${labelText1}`}>test1</div>
    				<div label={`test2${labelText2}`}>test2</div>
    			</Tabs>
    		</div>
    	);
    }
}