import React from 'react';
import Calendar from '../../component/Calendar';
import './css/Calendar_demo.css';
import moment from 'moment';
import { ajax } from '../../utils/urlHelper';

export interface CalendarDemoState {
  select: Array<any>;
  start: string;
  end: string;
  position: string;
}

export default class CalendarDemo extends React.Component<
  any,
  CalendarDemoState
> {
  format: string = 'YYYY/MM/DD';
  constructor(props: any) {
    super(props);

    const date = new Date();
    const endTime = new Date(
      new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime() - 86400,
    );
    const end = `${endTime.getFullYear()}/${endTime.getMonth() +
      1}/${endTime.getDate()}`;

    const startTime = new Date(new Date(date.setDate(1)).getTime());
    const start = `${startTime.getFullYear()}/${startTime.getMonth() +
      1}/${startTime.getDate()}`;

    this.state = {
      select: [],
      start,
      end,
      position: '',
    };
  }

  componentDidMount = () => {
    ajax({
      url: './assets/calendar_demo.json',
      success: select => this.setState({ select }),
    });
  };

  handleDateChange = (type: string) => {
    let { start, end, position } = this.state;
    const startTime = new Date(start);
    const endTime = new Date(end);

    switch (type) {
      case 'toRight':
        start = moment(
          new Date(startTime.setMonth(startTime.getMonth() - 1)),
        ).format(this.format);
        end = moment(new Date(endTime.setMonth(endTime.getMonth() - 1))).format(
          this.format,
        );
        break;

      case 'toLeft':
        start = moment(
          new Date(startTime.setMonth(startTime.getMonth() + 1)),
        ).format(this.format);
        end = moment(new Date(endTime.setMonth(endTime.getMonth() + 1))).format(
          this.format,
        );
        break;

      default:
        break;
    }

    position = type;

    return { start, end, position };
  };

  dateOnChange = (type: string) => {
    this.setState(this.handleDateChange(type));
  };

  onChange = (item: any) => {
    const { select } = this.state;
    const { dateStr, changeable } = item;

    /* 当dateStr出现重复项时，移除后一个
      用来实现选中项恢复原样 */
    select.pop();
    if (!changeable) {
      select.push(
        Object.assign(item, {
          date: dateStr,
          style: { background: '#F96', color: '#FFF', changeable: true },
        }),
      );
    }

    this.setState({ select, position: '' });
  };

  handleTouch = (position: string) => {
    const { start, end } = this.handleDateChange(position);

    this.setState({ position, start, end });
  };

  render() {
    const { select, start, end, position } = this.state;

    return (
      <div className="Calendar_demo">
        <div
          onClick={() => this.dateOnChange('toRight')}
          style={{ float: 'left' }}
        >
          上个月
        </div>
        <div
          onClick={() => this.dateOnChange('toLeft')}
          style={{ float: 'right' }}
        >
          下个月
        </div>
        <div style={{ clear: 'both' }} />
        <div>{`${start} ${end}`}</div>
        <Calendar
          onChange={this.onChange}
          start={start}
          end={end}
          select={select}
          position={position}
          touch={this.handleTouch}
        />
      </div>
    );
  }
}
