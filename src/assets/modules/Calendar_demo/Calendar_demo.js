import React from 'react'

import Calendar from '../../component/Calendar/Calendar'
import './css/Calendar_demo.css'

class Calendar_demo extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date();
        let end = T.clock(date).fmt('YYYY-MM-DD');
        let start = T.clock(new Date(date.setMonth(date.getMonth() - 1))).fmt('YYYY-MM-DD');

        this.state = {
            start,
            end,
            select: [],
        }
    }

    componentDidMount = () => {
        T.ajax({
            key: 'calendar_demo',
            f: 'json',
            success: (select) => {
                this.setState({select}, () => {
                    this.calendar_ins.refresh();
                });
            }
        });
    }

    date_onChange = (type) => {
        const {start,end} = this.state;
        let start_time = new Date(start);
        let end_time = new Date(end);
        let position = '';

        switch(type){
            case 'last':
                this.state.start = T.clock(new Date(start_time.setMonth(start_time.getMonth() - 1))).fmt('YYYY-MM-DD');
                this.state.end = T.clock(new Date(end_time.setMonth(end_time.getMonth() - 1))).fmt('YYYY-MM-DD');
                position = 'left';
            break;

            case 'next':
                this.state.start = T.clock(new Date(start_time.setMonth(start_time.getMonth() + 1))).fmt('YYYY-MM-DD');
                this.state.end = T.clock(new Date(end_time.setMonth(end_time.getMonth() + 1))).fmt('YYYY-MM-DD');
                position = 'right';
            break;
        }
        this.setState({}, () => {
            this.calendar_ins.refresh(position);
        });
    }

    onChange = (item) => {
        console.log(item)
    }

    render() {
        const {start,end,select} = this.state;

        return (
            <div className='Calendar_demo'>
                <div onClick={()=>this.date_onChange('last')}>上个月</div>
                <div onClick={()=>this.date_onChange('next')}>下个月</div>
                <div>{`${start} ${end}`}</div>
                <Calendar start={start} end={end} onChange={this.onChange} ref={instance=>this.calendar_ins=instance} select={select} />
            </div>
        )
    }
}

export default Calendar_demo