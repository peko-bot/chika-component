import React from 'react'

import './css/Calendar.css'

/**
* @description 简单日历
* @module Calendar
* @author: zy9
* @since: 2018-02-04 ‏‎20:55:34
*/

export default class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendar_body: [],
            calendar_list: [-4, -3, -2, -1, 0, 1], // 翻页用 mark
        }
    }

    componentDidMount = () => {
        // 绑定搜索面板滑动事件
        this.bind_touch_direction(this.content, direction => {
            this.props.touch && this.props.touch(direction);
        });

        this.refresh();
    }

    // 绑定 判断滑动方向 事件
    bind_touch_direction = (ref, callback) => {
        let startX, startY, endX, endY;
        ref.addEventListener('touchstart', e => {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });

        ref.addEventListener('touchend', e => {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;

            let direction = this.getDirection(startX, startY, endX, endY);

            callback(direction);
        });
    }

    //根据起点终点返回方向
    getDirection(startX, startY, endX, endY) {
        let angx = endX - startX;
        let angy = endY - startY;
        let result = '我一直站在此处没有动，等你买橘回来给我付车费';
 
        // 如果滑动距离太短
        if (Math.abs(angx) < 25 && Math.abs(angy) < 25) {
            return result;
        }
 
        let angle = Math.atan2(angy, angx) * 180 / Math.PI;
        if (angle >= -135 && angle <= -45) {
            result = 'down'; // toTop
        } else if (angle > 45 && angle < 135) {
            result = 'top'; // toDown
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 'right'; // toLeft
        } else if (angle >= -45 && angle <= 45) {
            result = 'left'; // toRight
        }
 
        return result;
    }

    refresh = (select = []) => {
        let {calendar_body, calendar_list} = this.state;
        const {start, end, position} = this.props;

        // 处理日历本体数据
        calendar_body = this.handle_select_date(select, this.trans_calendar_datas(start, end));

        let list_len = calendar_list.length;

        // 本体左右滑动事件
        // 这里需要清理数组的，不然点多了会影响性能，暂时没做 mark
        switch(position){
            case 'left':
                for(let i = 0; i < calendar_list.length; i++){
                    calendar_list[i]--;
                }
                if(list_len && calendar_list[list_len - 1] == 0){
                    calendar_list.push(1);
                }
                // 移除头部元素
                // calendar_list.length >= 6 ? calendar_list.shift() : null;
            break;

            case 'right':
                for(let i = 0; i < calendar_list.length; i++){  
                    calendar_list[i]++;
                }
                list_len && calendar_list[0] == 0 && calendar_list.splice(0, 0, -1);

                // 移除尾部元素
                // calendar_list.length >= 6 ? calendar_list.pop() : null;
            break;
        }
        
        return {calendar_body, calendar_list};
    }

    /* 设置选中项样式
        这里就是简单遍历，性能会有问题
        优化的话应该是直接确定日期在二维数组中的位置 mark
    */
    handle_select_date = (select, calendar_body) => {
        for(let row of calendar_body){
            for(let col of row){
                let date_col = new Date(col.dateStr).getTime();
                for(let item of select){
                    const {style, badge, changeable = true, date, disabled} = item;
                    
                    let date_item = new Date(date).getTime();
                    if(date_col === date_item){
                        col = Object.assign(col, {style, badge, changeable, disabled});
                    }
                }
            }
        }
        return calendar_body;
    }

    /* 将起止日期转化成二维数组 */
    trans_calendar_datas = (start, end) => {
        let calendar_datas = [];
        const start_timeStamp = new Date(start);
        const end_timeStamp = new Date(end);
        const diffDays = this.getDaysByDateString(start, end);
        // 二维数组行数，每行七个对象
        const rowNum = Math.ceil(diffDays / 7) + 1;
        // 开始日期在一星期中的index
        const index_start = start_timeStamp.getDay();
        // 结束日期在一星期中的index
        const index_end = end_timeStamp.getDay();

        // 初始化二维数组
        for(let i = 0; i < rowNum; i++){
            calendar_datas.push([]);
        }

        /* 
            获得第一行的第一个日期和最后一行的最后一个日期
            然后求两时间中间的所有日期
            然后把这些日期填到二维数组里
        */
        // 开始、结束日期的毫秒数
        // 填满首尾两行
        let start_time = start_timeStamp.getTime() - index_start * 24 * 3600 * 1000;
        let end_time = end_timeStamp.getTime() + (7 - index_end - 1) * 24 * 3600 * 1000;

        // 把日期填到二维数组里
        let row = 0, count = 0;
        while(end_time - start_time >= 0){
            const date_obj = new Date(start_time);
            const dateStr = `${date_obj.getFullYear()}/${date_obj.getMonth() + 1}/${date_obj.getDate()}`; // /是为了ios new Date时不出错
            const date = date_obj.getDate();
            
            let param = {date, dateStr};
            /* 
                根据传进来的时段设置可点击日期的颜色，
                颜色是在这里设置，点击事件在render的body里
            */
            param.disabled = start_timeStamp.getTime() <= start_time && end_timeStamp.getTime() >= start_time ? false : true;
            calendar_datas[row][count % 7] = param;
            
            count++;
            count != 0 && count % 7 == 0 && row++;
            start_time += 1 * 24 * 3600 * 1000;
        }

        return calendar_datas;
    }

    // 获得两个日期间隔天数
    getDaysByDateString = (start, end) => {
        if(start === undefined || end === undefined) return 1;
        let startDate = Date.parse(start.replace('/-/g', '/'));
        let endDate = Date.parse(end.replace('/-/g', '/'));
        let diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000;
        let days = diffDate / (24 * 60 * 60 * 1000);

        return days;
    }

    handle_td_click = item => {
        this.props.onChange && this.props.onChange(item);
    }

    render = () => {
        let {select = []} = this.props;
        let {currentSelect} = this.state;

        let {calendar_body, calendar_list} = this.refresh(select);

        let head = [];
        head.push(
            <tr>
                {
                    WEEK.map(item => {
                        return (
                            <td>
                                <span>{item}</span>
                            </td>
                        )
                    })
                }
            </tr>
        );

        let body = [];
        for(let item of calendar_body){
            body.push(
                <tr>
                    {
                        item.map(jtem => {
                            const {style = {}, date, disabled, badge = {text: '', style: {}}} = jtem;
                            const {text, style: badge_style} = badge;

                            return (
                                <td onClick={() => this.handle_td_click(jtem)}>
                                    {/* 当disabled为true时，去掉所有样式只显示灰色 */}
                                    <div className='cal-text' style={disabled ? {color: '#949494'} : style}>
                                        {badge ? <div className='cal-badge' style={disabled ? {} : badge_style}>{text}</div> : null}
                                        <span>{date}</span>
                                    </div>
                                </td>
                            )
                        })
                    }
                </tr>
            );
        }

        return (
            <div className='Calendar' ref={ref => this.content = ref}>
                {
                    calendar_list.map((item, i) => {
                        return (
                            <div className='container' style={{transform: `translate3d(${item * -100}%, 0 , 0)`, opacity: !item ? 1 : 0}}>
                                <table className='week-name'>
                                    {head}
                                    {body}
                                </table>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const WEEK = [
    '日',
    '一',
    '二',
    '三',
    '四',
    '五',
    '六'
];