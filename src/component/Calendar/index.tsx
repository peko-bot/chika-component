import React from 'react';
import { bindTouchDirection } from '../../util/Touch';
import './css/Calendar.css';

export interface CalendarProps {
  touch?: (direction: string) => void;
  start: string;
  end: string;
  position?: string;
  onChange?: (item: any) => void;
  select?: Array<any>;
}
export interface CalendarState {
  calendarBody: Array<any>;
  calendarList: Array<number>;
}

export default class Calendar extends React.Component<
  CalendarProps,
  CalendarState
> {
  state: CalendarState = {
    calendarBody: [],
    calendarList: [-4, -3, -2, -1, 0, 1], // 翻页用
  };
  content: any;

  componentDidMount = () => {
    bindTouchDirection(this.content, direction => {
      this.props.touch && this.props.touch(direction);
    });
    this.refresh();
  };

  refresh = (select?: Array<any>) => {
    let { calendarBody, calendarList } = this.state;
    const { start, end, position } = this.props;

    // 处理日历本体数据
    calendarBody = this.handleSelectDate(
      select,
      this.transCalendarDatas(start, end),
    );

    let listLen = calendarList.length;

    // 本体左右滑动事件
    // 这里需要清理数组的，不然点多了会影响性能，暂时没做 mark
    switch (position) {
      case 'toRight':
        for (let i = 0; i < calendarList.length; i++) {
          calendarList[i]--;
        }
        if (listLen && calendarList[listLen - 1] == 0) {
          calendarList.push(1);
        }
        // 移除头部元素
        // calendarList.length >= 6 ? calendarList.shift() : null;
        break;

      case 'toLeft':
        for (let i = 0; i < calendarList.length; i++) {
          calendarList[i]++;
        }
        listLen && calendarList[0] == 0 && calendarList.splice(0, 0, -1);

        // 移除尾部元素
        // calendarList.length >= 6 ? calendarList.pop() : null;
        break;

      default:
        break;
    }
    return { calendarBody, calendarList };
  };

  /* 设置选中项样式
    这里就是简单遍历，性能会有问题
    优化的话应该是直接确定日期在二维数组中的位置
  */
  handleSelectDate = (select: Array<any> = [], calendarBody: Array<any>) => {
    for (let row of calendarBody) {
      for (let col of row) {
        let dateCol = new Date(col.dateStr).getTime();

        for (let item of select) {
          const { style, badge, changeable = true, date, disabled } = item;

          let dateItem = new Date(date).getTime();

          if (dateCol === dateItem) {
            col = Object.assign(col, { style, badge, changeable, disabled });
          }
        }
      }
    }
    return calendarBody;
  };

  /* 将起止日期转化成二维数组 */
  transCalendarDatas = (start: string, end: string) => {
    let calendarDatas: Array<Array<any>> = [];
    const startTimeStamp = new Date(start);
    const endTimeStamp = new Date(end);
    const diffDays = this.getDaysByDateString(start, end);
    // 二维数组行数，每行七个对象
    const rowNum = Math.ceil(diffDays / 7) + 1;
    // 开始日期在一星期中的index
    const indexStart = startTimeStamp.getDay();
    // 结束日期在一星期中的index
    const indexEnd = endTimeStamp.getDay();

    // 初始化二维数组
    for (let i = 0; i < rowNum; i++) {
      calendarDatas.push([]);
    }

    /*
      获得第一行的第一个日期和最后一行的最后一个日期
      然后求两时间中间的所有日期
      然后把这些日期填到二维数组里
    */
    // 开始、结束日期的毫秒数
    // 填满首尾两行
    let startTime = startTimeStamp.getTime() - indexStart * 24 * 3600 * 1000;
    let endTime =
      endTimeStamp.getTime() + (7 - indexEnd - 1) * 24 * 3600 * 1000;

    // 把日期填到二维数组里
    let row = 0,
      count = 0;

    while (endTime - startTime >= 0) {
      const dateObj = new Date(startTime);
      const dateStr = `${dateObj.getFullYear()}/${dateObj.getMonth() +
        1}/${dateObj.getDate()}`; // /是为了ios new Date时不出错
      const date = dateObj.getDate();

      let param = { date, dateStr, disabled: false };
      /*
        根据传进来的时段设置可点击日期的颜色，
        颜色是在这里设置，点击事件在render的body里
      */

      param.disabled = !(
        startTimeStamp.getTime() <= startTime &&
        endTimeStamp.getTime() >= startTime
      );
      calendarDatas[row][count % 7] = param;

      count++;
      count != 0 && count % 7 == 0 && row++;
      startTime += 1 * 24 * 3600 * 1000;
    }

    return calendarDatas;
  };

  // 获得两个日期间隔天数
  getDaysByDateString = (start: string, end: string) => {
    if (start === undefined || end === undefined) return 1;
    let startDate = Date.parse(start.replace('/-/g', '/'));
    let endDate = Date.parse(end.replace('/-/g', '/'));
    let diffDate = endDate - startDate + 1 * 24 * 60 * 60 * 1000;
    let days = diffDate / (24 * 60 * 60 * 1000);

    return days;
  };

  handleTdClick = (item: any) =>
    this.props.onChange && this.props.onChange(item);

  render = () => {
    let { select = [] } = this.props;

    let { calendarBody, calendarList } = this.refresh(select);

    let head: any = [];
    head.push(
      <tbody key="body_tbody_-1">
        <tr>
          {WEEK.map((item, i) => {
            return (
              <td key={`week_td_${i}`}>
                <span>{item}</span>
              </td>
            );
          })}
        </tr>
      </tbody>,
    );

    let body: any = [];
    calendarBody.map((item, i) => {
      body.push(
        <tbody key={`body_tbody_${i}`}>
          <tr>
            {item.map((jtem: any, j: number) => {
              const {
                style = {},
                date,
                disabled,
                badge = { text: '', style: {} },
              } = jtem;
              const { text, style: badgeStyle } = badge;

              return (
                <td
                  onClick={() => this.handleTdClick(jtem)}
                  key={`body_td_${j}`}
                >
                  {/* 当disabled为true时，去掉所有样式只显示灰色 */}
                  <div
                    className="cal-text"
                    style={disabled ? { color: '#949494' } : style}
                  >
                    {badge ? (
                      <div
                        className="cal-badge"
                        style={disabled ? {} : badgeStyle}
                      >
                        {text}
                      </div>
                    ) : null}
                    <span>{date}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        </tbody>,
      );
    });

    return (
      <div className="Calendar" ref={(ref: any) => (this.content = ref)}>
        {calendarList.map((item, i) => {
          return (
            <div
              className="container"
              style={{
                transform: `translate3d(${item * -100}%, 0 , 0)`,
                opacity: !item ? 1 : 0,
              }}
              key={`list_div_${i}`}
            >
              <table className="week-name">
                {head}
                {body}
              </table>
            </div>
          );
        })}
      </div>
    );
  };
}

const WEEK = ['日', '一', '二', '三', '四', '五', '六'];
