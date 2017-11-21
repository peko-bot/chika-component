import React from 'react'

import Calendar from '../../component/Calendar/Calendar'
import './css/Calendar_demo.css'

export default class Calendar_demo extends React.Component {
    constructor(props) {
        super(props);

        let date = new Date();
        let end = T.clock(date).fmt('YYYY-MM-DD');
        let start = T.clock(new Date(date.setMonth(date.getMonth() - 1))).fmt('YYYY-MM-DD');
        this.state = {
            select: [],
            start,
            end,
        }
    }

    componentDidMount = () => {
        T.ajax({
            key: 'calendar_demo',
            f: 'json',
            success: (select) => {
                /* 调用refresh方法一定要在模块页刷新state之后 */
                this.setState({}, () => {
                    this.calendar_ins.refresh(null, select);
                });
            }
        });
    }

    date_onChange = (type) => {
        let {start,end} = this.state;
        let start_time = new Date(start);
        let end_time = new Date(end);
        let position = '';

        switch(type){
            case 'last':
                start = T.clock(new Date(start_time.setMonth(start_time.getMonth() - 1))).fmt('YYYY-MM-DD');
                end = T.clock(new Date(end_time.setMonth(end_time.getMonth() - 1))).fmt('YYYY-MM-DD');
                position = 'left';
            break;

            case 'next':
                start = T.clock(new Date(start_time.setMonth(start_time.getMonth() + 1))).fmt('YYYY-MM-DD');
                end = T.clock(new Date(end_time.setMonth(end_time.getMonth() + 1))).fmt('YYYY-MM-DD');
                position = 'right';
            break;
        }
        /* 调用refresh方法一定要在模块页刷新state之后 */
        this.setState({start, end}, () => {
            this.calendar_ins.refresh(position);
        });
    }

    onChange = (item) => {
        console.log(item)
    }

    render() {
        const {select,start,end} = this.state;

        return (
            <div className='Calendar_demo'>
                <div onClick={()=>this.date_onChange('last')} style={{float:'left'}}>上个月</div>
                <div onClick={()=>this.date_onChange('next')} style={{float:'right'}}>下个月</div>
                <div style={{clear:'both'}}></div>
                <div>{`${start} ${end}`}</div>
                <Calendar onChange={this.onChange} start={start} end={end} ref={instance=>this.calendar_ins=instance} />
            </div>
        )
    }
}