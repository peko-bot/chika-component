import React from 'react';

import Calendar from '../../component/Calendar/Calendar';
import './css/Calendar_demo.css';

import moment from 'moment';

const dataSourceUrl = '/data/calendar_demo.json';

export default class CalendarDemo extends React.Component {
	constructor (props) {
		super(props);

		this.format = 'YYYY/MM/DD';

		let date = new Date();

		let endTime = new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 86400);
		let end = `${endTime.getFullYear()}/${endTime.getMonth() + 1}/${endTime.getDate()}`;

		let startTime = new Date(new Date(date.setDate(1)).getTime());
		let start = `${startTime.getFullYear()}/${startTime.getMonth() + 1}/${startTime.getDate()}`;

		this.state = {
			select: [],
			start,
			end,
			position: '',
		};
	}

    componentDidMount = () => {
    	fetch(dataSourceUrl)
    		.then(result => result.json())
    		.then(select => this.setState({ select }))
    		.catch(error => console.log(error));
    }

    handleDateChange = type => {
    	let { start, end, position } = this.state;
    	let startTime = new Date(start);
    	let endTime = new Date(end);

    	switch(type) {
    		case 'toRight':
    			start = moment(new Date(startTime.setMonth(startTime.getMonth() - 1))).format(this.format);
    			end = moment(new Date(endTime.setMonth(endTime.getMonth() - 1))).format(this.format);
    			break;

    		case 'toLeft':
    			start = moment(new Date(startTime.setMonth(startTime.getMonth() + 1))).format(this.format);
    			end = moment(new Date(endTime.setMonth(endTime.getMonth() + 1))).format(this.format);
    			break;

    		default:

    			break;
    	}

    	position = type;

    	return { start, end, position };
    }

    dateOnChange = (type) => {
    	this.setState(this.handleDateChange(type));
    }

    onChange = item => {
    	let { select } = this.state;
    	let { dateStr, changeable } = item;

    	/*
        当dateStr出现重复项时，移除后一个
            用来实现选中项恢复原样 */
    	select.pop();
    	!changeable ? select.push(Object.assign(item, { date: dateStr, style: { background: '#F96', color: '#FFF', changeable: true } })) : null;

    	this.setState({ select, position: '' });
    }

    handleTouch = position => {
    	const { start, end } = this.handleDateChange(position);

    	this.setState({ position, start, end });
    }

    render () {
    	const { select, start, end, position } = this.state;

    	return (
    		<div className='Calendar_demo'>
    			<div onClick={ () => this.dateOnChange('toRight') } style={{ float: 'left' }}>上个月</div>
    			<div onClick={ () => this.dateOnChange('toLeft') } style={{ float: 'right' }}>下个月</div>
    			<div style={{ clear:'both' }}></div>
    			<div>{`${ start } ${ end }`}</div>
    			<Calendar onChange={ this.onChange } start={ start } end={ end } select={ select } position={ position } touch={ this.handleTouch } />
    		</div>
    	);
    }
}