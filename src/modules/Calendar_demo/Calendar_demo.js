import React from 'react'

import Calendar from '../../component/Calendar/Calendar'
import './css/Calendar_demo.css'

export default class Calendar_demo extends React.Component {
    constructor(props) {
        super(props);

        this.format = 'YYYY/MM/DD';

        let date = new Date();

        let end_time = new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 86400);
        let end = `${end_time.getFullYear()}/${end_time.getMonth() + 1}/${end_time.getDate()}`;

        let start_time = new Date(new Date(date.setDate(1)).getTime());
        let start = `${start_time.getFullYear()}/${start_time.getMonth() + 1}/${start_time.getDate()}`;

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
            success: select => {
                this.setState({select});
            }
        });
    }

    handle_date_change = type => {
        let {start, end, position} = this.state;
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
        let {select} = this.state;
        let {dateStr, changeable} = item;
        // console.log(item)

        /* 
        当dateStr出现重复项时，移除后一个
            用来实现选中项恢复原样 */
        select.pop();
        !changeable ? select.push(Object.assign(item, {date: dateStr, style: {background: '#F96', color: '#FFF', changeable: true}})) : null;
        
        this.setState({select, position: ''});
    }

    handle_touch = position => {
        const {start, end} = this.handle_date_change(position);
        this.setState({position, start, end});
    }

    render() {
        const {select, start, end, position} = this.state;

        return (
            <div className='Calendar_demo'>
                <div onClick={() => this.date_onChange('left')} style={{float: 'left'}}>上个月</div>
                <div onClick={() => this.date_onChange('right')} style={{float: 'right'}}>下个月</div>
                <div style={{clear:'both'}}></div>
                <div>{`${start} ${end}`}</div>
                <Calendar onChange={this.onChange} start={start} end={end} select={select} position={position} touch={this.handle_touch} />
            </div>
        )
    }
}