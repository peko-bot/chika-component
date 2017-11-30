import React from 'react'

import Button from '../Button/Button'
import Modal from 'antd-mobile/lib/modal'
import 'antd-mobile/lib/modal/style/css'
const operation = Modal.operation
import DatePicker from 'antd-mobile/lib/date-picker'
import 'antd-mobile/lib/date-picker/style/css'
import List from 'antd-mobile/lib/list'
import 'antd-mobile/lib/list/style/css'
import InputItem from 'antd-mobile/lib/input-item'
import 'antd-mobile/lib/input-item/style/css'

import './css/List_Container.css'
import {extend} from '../../../data/DeepClone'

/* 块状通用列表（移动端） */
export default class List_Container extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentState: 0, // 页面所处位置
            edit_datas: [], // 新增/编辑页面数据
            loading: false, // 新增/编辑页面加载状态
            input_datas: {}, // 新增/编辑页面文本框集合
            select_datas: {}, // 下拉框集合
            date_datas: {}, // 日期集合
        }
    }

    children = []
    componentDidMount = () => {
        this.search();
    }

    // 展示列表请求数据
    search = () => {
        this.setState({loading: true});
        T.ajax({
            key: 'search',
            f: 'json',
            success: (result) => {
                const {data,config,mainKey} = result;
                this.mainKey = mainKey;
                
                for(let item of result.data){
                    let children = extend({}, this.props.children);
                    this.travel_children(children, item, item[mainKey]);
                    this.children.push(children);
                }
                this.setState({loading: false});
            }
        })
    }

    /* 
        mainValue为搜索主键对应的值，mainKey在this里
    */
    handle_item_edit = (mainValue, type) => {
        // 搜索主键
        let param = {};
        param[this.mainKey] = mainValue;

        // 页面加载标识
        this.setState({loading: true})
        
        T.ajax({
            key: 'getConfig',
            f: 'json',
            data: param,
            success: (result) => {
                const {DataFields,ModelData} = result;
                let {input_datas, select_datas, date_datas, edit_datas} = this.state;

                for(let item of DataFields){
                    let {FName,FValue} = item;
                    
                    for(let key in ModelData){
                        if(key == FName && item.IsAdd === 'True'){ // IsVisiable是在列表中的显隐，这里的是编辑页面
                            if(type == 'edit'){
                                // 初始化控件值
                                switch(item.ControlType){
                                    case '1': 
                                        input_datas[key] = ModelData[key];
                                    break;
                                    
                                    case '2':
                                        date_datas[key] = new Date(ModelData[key]);
                                    break;
                                    
                                    case '3':
                                        select_datas[key] = FValue;
                                    break;
                                }
                            }else if(type == 'add'){
                                input_datas = {};
                                select_datas = {};
                                date_datas = {};
                            }

                            // 初始化配置属性
                            edit_datas.push({
                                text: FValue,
                                value: ModelData[key],
                                type: item.ControlType,
                                key,
                                foreign_data: item.ForeignData,
                                format: item.format
                            });
                        }
                    }
                }
                this.setState({currentState: -1, loading: false, input_datas, select_datas, date_datas, edit_datas}, () => {
                    // 切换页面时回到顶部
                    document.documentElement.scrollTop = document.body.scrollTop = 0;
                });
            }
        })
    }

    /* 递归模版，填入数据
        可能有更好的处理方法，不需要深拷贝  mark
    */
    travel_children = (children, item, mainKey) => {
        const {bindKey = 'data-key'} = this.props;

        React.Children.map(children, child => {
            let {bind,format} = child.props;
            /* 绑定点击事件
                模版中所谓的head就是每块元素的最顶层标签
            */
            if(bind){
                // 长按菜单
                let timer = null;
                child.props.onTouchStart = (e) => {
                    e.preventDefault();
                    timer = setTimeout(() => {
                        operation([
                            { text: '新增', onPress: () => this.handle_item_edit(mainKey, 'add') },
                            { text: '修改', onPress: () => this.handle_item_edit(mainKey, 'edit') },
                            { text: '删除', onPress: () => console.log('删除被点击了') },
                        ]);
                    }, 800);
                }
                child.props.onTouchEnd = () => {
                    clearTimeout(timer);
                }
            }

            /* 处理时间格式
                偷懒用T的时间处理
            */
            if(format){
                let key = child.props[bindKey];
                let date = T.clock(item[key]).fmt(format);
                child.props.children = date;
            }

            if(child.props[bindKey] && !format){
                let key = child.props[bindKey];
                child.props.children = item[key];
            }else{
                if(child.props && typeof(child.props.children) === 'object'){
                    this.travel_children(child.props.children, item, mainKey);
                }
            }
        })
    }

    save = () => {
        console.log(this.state)
        this.children = [];
        this.search();
        this.setState({currentState: 0}, () => {
            this.state.edit_datas = [];
        })
    }

    reset = () => {
        this.setState({currentState: 0}, () => {
            this.state.edit_datas = [];
        });
    }

    handle_input = (e, type) => {
        this.state.input_datas[type] = e;
        this.setState();
    }

    handle_select = (e, type) => {
        this.state.select_datas[type] = e.target.value;
        this.setState();
    }

    handle_date = (date, type) => {
        this.state.date_datas[type] = date;
        this.setState();
    }

    //1. 文本框 2. 时间控件（日期：2012-01-01） 3. 下拉框 4. 单选框 5. 多选框
    //6. 数值控件 7. TextArea 8.隐藏域hidden 9.时间控件（时间：2012-01-01 00:00:00）
    //10.行政区划Ztree(支持多个) 11.部门Ztree(支持多个) 12.单、多附件上传 13.可输可选 14.地图坐标选取
    handle_ControlType = (item) => {
        const {input_datas,select_datas,date_datas} = this.state;
        const {text,key,format='YYYY-MM-DD'} = item;

        let element = [];
        switch (item.type){
            case '1': // 文本框
                element.push(
                    <InputItem clear onChange={e => this.handle_input(e, key)} value={input_datas[key]} labelNumber={7} placeholder='请输入'>{item.text}</InputItem>
                );
            break;

            case '2': // 时间控件
                element.push(
                    <DatePicker value={date_datas[key]} onChange={date => this.handle_date(date, key)} format={format}>
                        <List.Item arrow='horizontal'>{text}</List.Item>
                    </DatePicker>
                );
            break;

            case '3': // 下拉框
                let select = (
                    <select onChange={(e) => this.handle_select(e, key)} value={select_datas[key]}>
                        {
                            item.foreign_data.map(item => {
                                return (
                                    <option value={item.VALUE}>{item.TEXT}</option>
                                )
                            })
                        }
                    </select>
                );
                element.push(
                    <List.Item extra={select} arrow='horizontal'>{item.text}</List.Item>
                )
            break;

            case '4': // 单选框

            break;
        }
        
        return element;
    }

    render() {
        const {children} = this;
        const {currentState,edit_datas} = this.state;
        const {height = document.documentElement.clientHeight || document.body.clientHeight} = this.props;

        let edit_content = [];
        edit_content.push(
            <List>
                {
                    edit_datas.map(item => {
                        return this.handle_ControlType(item);
                    })
                }
                <List.Item>
                    <div style={{textAlign:'center'}}>
                        <Button type='primary' onChange={this.save} style={{width:110,height:30,marginRight:30}}>保存</Button>
                        <Button type='simple' onChange={this.reset} style={{width:110,height:30}}>返回</Button>
                    </div>
                </List.Item>
            </List>
        );

        return (
            <div className='List_Container' style={{height}}>
                <div className='content' style={{left: currentState * 100 + '%'}}>
                    {children}
                </div>

                <div className='edit-content' style={{left: ((currentState + 1) * 1) * 100 + '%'}}>
                    {edit_content}
                </div>
            </div>
        )
    }
}