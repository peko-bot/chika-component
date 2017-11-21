import React from 'react'

import './css/Calendar.css'

/* 简单日历 */
export default class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendar_body: [],
            calendar_list: [0,], // 翻页用
        }
    }

    select = [];

    componentDidMount = () => {
        this.refresh();
    }

    refresh = (position, select = []) => {
        let {calendar_body,calendar_list} = this.state;
        const {start,end} = this.props;

        // 处理日历本体数据
        calendar_body = this.trans_calendar_datas(start, end);
        // 设置选中项
        if(select.length != 0){
            this.select = select;
        }
        calendar_body = this.handle_select_date(this.select, calendar_body);

        // 本体左右滑动事件
        // 这里需要清除数组的，不然点多了会影响性能，暂时没做 mark
        switch(position){
            case 'left':
                // 移除尾部元素
                // calendar_list = calendar_list.splice(-1, 1);
                for(let i = 0; i < calendar_list.length; i++){
                    calendar_list[i]--;
                }
                calendar_list.push(0);
            break;

            case 'right':
                // 移除头部元素
                // if(calendar_list.length > 2){
                    // calendar_list = calendar_list.slice(1, -1);
                // }
                for(let i = 0; i < calendar_list.length; i++){
                    calendar_list[i]++;
                }
                calendar_list.push(0);
            break;
        }
        
        this.setState({calendar_body, calendar_list});
    }

    /* 设置选中项
        这里就是简单遍历，性能会有问题
        优化的话应该是直接确定日期在二维数组中的位置
    */
    handle_select_date = (select, calendar_body) => {
        // mark
        for(let row of calendar_body){
            for(let col of row){
                let date_col = new Date(col.dateStr).getTime();
                for(let item of select){
                    let date_item = new Date(item.date).getTime();
                    if(date_col === date_item && col.color !== '#949494'){
                        col.background_color = item.color;
                        col.color = '#FFF';
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
            calendar_datas.push(new Array());
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
            // 这里转日期格式偷懒用现成的工具了，如果需要无依赖得另写转日期的方法
            const date_obj = T.clock(new Date(start_time));
            const dateStr = date_obj.fmt('YYYY-MM-DD');
            const date = date_obj.fmt('D');
            
            let param = {date, dateStr};
            /* 
                根据传进来的时段设置可点击日期的颜色，
                颜色是在这里设置，点击事件在render的body里
            */
            if(start_timeStamp.getTime() <= start_time && end_timeStamp.getTime() >= start_time){
                param.color = '#000';
            }else{
                param.color = '#949494';
            }
            calendar_datas[row][count % 7] = param;
            
            count++;
            if(count != 0 && count % 7 == 0) row++;
            start_time += 1 * 24 * 3600 * 1000;
        }

        return calendar_datas;
    }

    // 获得两个日期间隔天数
    getDaysByDateString = (dateString1, dateString2) => {
        if(dateString1 === undefined || dateString2 === undefined) return 1;
        let startDate = Date.parse(dateString1.replace('/-/g','/'));
        let endDate = Date.parse(dateString2.replace('/-/g','/'));
        let diffDate = (endDate - startDate) + 1 * 24 * 60 * 60 * 1000;
        let days = diffDate / (1 * 24 * 60 * 60 * 1000);
        return days;
    }

    handle_td_click = (item) => {
        this.props.onChange(item);
    }

    render() {
        let {calendar_body,calendar_list} = this.state;
        let head = [];
        head.push(
            <tr>
                {
                    WEEK.map((item) => {
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
        for(let i = 0; i < calendar_body.length; i++){
            let item = calendar_body[i];
            body.push(
                <tr>
                    {
                        item.map(jtem=>{
                            return (
                                <td onClick={jtem.color?()=>this.handle_td_click(jtem):null}>
                                    <div className='cal-text' style={{color: jtem.color,background:jtem.background_color}}>
                                        <span>{jtem.date}</span>
                                    </div>
                                </td>
                            )
                        })
                    }
                </tr>
            );
        }

        let table = [];
        table.push(
            <table className='week-name'>
                {head}
                {body}
            </table>
        );

        return (
            <div className='Calendar'>
                {
                    calendar_list.map(item=>{
                        return (
                            <div className='container' style={{left: item*-100+'%'}}>
                                {table}
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