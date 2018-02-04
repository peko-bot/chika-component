import React from 'react'

import Calendar from '../../component/Calendar/Calendar'
import './css/Calendar_demo.css'

export default class Calendar_demo extends React.Component {
    constructor(props) {
        super(props);

        this.format = 'YYYY-MM-DD';
        let date = new Date();
        let end = T.clock(date).fmt(this.format);
        let start = T.clock(new Date(date.setMonth(date.getMonth() - 1))).fmt(this.format);
        this.state = {
            select: [],
            start,
            end,
            position: '',
        }
    }

    componentDidMount = () => {
        T.ajax({
            key: 'calendar_demo',
            f: 'json',
            success: (select) => {
                this.setState({select, position: ''});
            }
        });
    }

    handle_date_change = type => {
        let {start,end, position} = this.state;
        let start_time = new Date(start);
        let end_time = new Date(end);

        switch(type){
            case 'left':
                start = T.clock(new Date(start_time.setMonth(start_time.getMonth() - 1))).fmt(this.format);
                end = T.clock(new Date(end_time.setMonth(end_time.getMonth() - 1))).fmt(this.format);
                position = 'left';
            break;

            case 'right':
                start = T.clock(new Date(start_time.setMonth(start_time.getMonth() + 1))).fmt(this.format);
                end = T.clock(new Date(end_time.setMonth(end_time.getMonth() + 1))).fmt(this.format);
                position = 'right';
            break;
        }

        return {start, end, position};
    }

    date_onChange = (type) => {
        this.setState(this.handle_date_change(type));
    }

    onChange = item => {
        console.log(item)
        let {select} = this.state;
        let {dateStr, color} = item;
        
        select.push({date: dateStr, color: '#F96'});

        this.setState({select});
    }

    handle_touch = position => {
        console.log(position)
        const {start, end} = this.handle_date_change(position);
        this.setState({position, start, end});
    }

    render() {
        const {select,start,end, position} = this.state;

        return (
            <div className='Calendar_demo'>
                <div onClick={()=>this.date_onChange('left')} style={{float:'left'}}>上个月</div>
                <div onClick={()=>this.date_onChange('right')} style={{float:'right'}}>下个月</div>
                <div style={{clear:'both'}}></div>
                <div>{`${start} ${end}`}</div>
                <Calendar onChange={this.onChange} start={start} end={end} select={select} position={position} touch={this.handle_touch} />
            </div>
        )
    }
}