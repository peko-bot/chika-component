import React from 'react'

import Button from '../Button/Button'
import {Modal,DatePicker,List,InputItem,Drawer,NavBar,Icon,Picker} from 'antd-mobile'
const operation = Modal.operation;

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
            select_datas: {}, // 新增/编辑页面下拉框集合
            date_datas: {}, // 日期集合
            search_field_open: false, // 搜索面板是否打开
            search_param: {}, // 搜索参数
        }

        this.children = [] // 遍历模板根据数据渲染 reactNode
        this.listDatas = [] // 列表数据 object
        this.power = [] // 权限字符串 string
        this.mainKey = '' // 搜索主键 string
        this.config = [] // 配置
    }

    componentDidMount = () => {
        this.bind_touch_direction();
        this.get_config();
    }

    // 绑定 判断滑动方向 事件
    bind_touch_direction = () => {
        let startX, startY, endX, endY;
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
        });

        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].pageX;
            endY = e.changedTouches[0].pageY;

            let direction = this.getDirection(startX, startY, endX, endY);

            switch(direction){
                case 'toLeft':
                    this.handle_search_change();
                break;
            }
        });
    }

    //根据起点终点返回方向
    getDirection(startx, starty, endx, endy) {
        let angx = endx - startx;
        let angy = endy - starty;
        let result = '我一直站在此处没有动，等你买橘回来给我付车费';
 
        //如果滑动距离太短
        if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
            return result;
        }
 
        let angle = Math.atan2(angy, angx) * 180 / Math.PI;
        if (angle >= -135 && angle <= -45) {
            result = 'toTop';
        } else if (angle > 45 && angle < 135) {
            result = 'toDown';
        } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
            result = 'toLeft';
        } else if (angle >= -45 && angle <= 45) {
            result = 'toRight';
        }
 
        return result;
    }

    // 请求配置
    get_config = () => {
        const {tbid = -1} = this.props;
        T.ajax({
            key: 'getConfig',
            f: 'json',
            data: {tbid},
            success: (result) => {
                const {power, config} = result;

                // 根据权限判断是否显示列表
                let flag = false;
                for(let item of power){
                    if(item == 'Select') flag = true;
                }
                // 需要权限不足的提示 mark
                if(!flag) return;

                this.power = power;
                this.config = config;

                /* 
                    搜索主键是列表点到详情页请求数据的那个唯一标识
                */
                for(let item of config){
                    // 判断是不是搜索主键，暂时按只有一个算
                    if(item.IsKey === 'True') this.mainKey = item.FName;
                }

                this.search();
            }
        });
    }

    // 判断搜索条件类型，和ControlType类型一致
    /* 这个得合并，不然写起来是真tm世界如此美好 mark */
    handle_search_field_type = (item) => {
        let element = null;
        let {search_param} = this.state;
        let {FName,FValue,DateFormat = 'YYYY-MM-DD',ForeignData} = item;

        // 容错
        if(item.IsSearchField !== 'True') return null;

        switch(item.ControlType){
            case '1': // 文本框
                element = (
                    <InputItem onChange={e => this.handle_input(e, 'search_param' ,FName)} value={search_param[FName]} placeholder='请输入'>{FValue}</InputItem>
                );
            break;

            case '2': // 时间控件
            /* 这里不能直接格式化value，因为组件内部处理格式是Date，所以下一次点击的时候会报错
                现在是搜索点确定会清空搜索面板 mark
            */
                element = (
                    <DatePicker onChange={date => this.handle_date(date, 'search_param', FName, DateFormat)} value={search_param[FName]} format={date => (T.clock(date).fmt(DateFormat))}>
                        <List.Item arrow='horizontal'>{FValue}</List.Item>
                    </DatePicker>
                );
            break;

            case '3': // 下拉框
                element = (
                    <Picker extra='请选择' data={ForeignData} cols={1} onChange={value => this.handle_select(value, 'search_param', FName)} value={[search_param[FName]]}>
                        <List.Item arrow='horizontal'>{FValue}</List.Item>
                    </Picker>
                );
            break;

            case '4': // 单选框

            break;
        }

        return element;
    }

    // 展示列表请求数据
    search = () => {
        let {search_param} = this.state;
        T.ajax({
            key: 'search',
            f: 'json',
            data: search_param,
            success: (result) => {
                const {data} = result;

                this.listDatas = data;

                this.children = [];
                for(let item of data){
                    let children = extend({}, this.props.children);
                    this.travel_children(children, item, item[this.mainKey]);
                    this.children.push(children);
                }

                // 搜索后关闭面板 mark
                // Object.keys(search_param).length === 0 ? this.setState({search_param: {}}) : this.handle_search_change();
                // 清空搜索面板
                this.setState({search_param: {}});
            }
        })
    }

    /* 
        初始化新增/编辑页面
        mainValue为搜索主键对应的值，mainKey在this里

        处理逻辑有冗余 mark
    */
    handle_item_edit = (mainValue, type) => {
        let {input_datas, select_datas, date_datas, edit_datas} = this.state;

        for(let item of this.listDatas){
            if(item[this.mainKey] == mainValue){
                for(let jtem of this.config){
                    let {FName,FValue} = jtem;
                    
                    for(let key in item){
                        if(key == FName && jtem.IsAdd === 'True'){ // IsVisiable是在列表中的显隐，这里的是编辑页面
                            if(type == 'edit'){
                                // 初始化控件值
                                switch(jtem.ControlType){
                                    case '1': 
                                        input_datas[key] = item[key];
                                    break;
                                    
                                    case '2':
                                        date_datas[key] = new Date(item[key]);
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
                                value: item[key],
                                type: jtem.ControlType,
                                key,
                                foreign_data: jtem.ForeignData,
                                format: jtem.format
                            });
                        }
                    }
                }
            }
        }
        this.setState({currentState: -1, input_datas, select_datas, date_datas, edit_datas}, () => {
            // 切换页面时回到顶部
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        });
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
                    // e.preventDefault();
                    timer = setTimeout(() => {
                        let opera = [];
                        for(let item of this.power){
                            switch(item){
                                case 'Add': 
                                    opera.push({text: '新增', onPress: () => this.handle_item_edit(mainKey, 'add')});
                                break;

                                case 'Del':
                                    opera.push({text: '删除', onPress: () => console.log('删除被点击了')});
                                break;

                                case 'Update':
                                    opera.push({text: '修改', onPress: () => this.handle_item_edit(mainKey, 'edit')});
                                break;
                            }
                        }
                        operation(opera);
                    }, 800);
                }
                child.props.onTouchEnd = () => {
                    clearTimeout(timer);
                }
            }

            /* 处理时间格式 */
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

    handle_input = (e, item, key) => {
        this.state[item][key] = e;
        this.setState();
    }

    handle_select = (e, item, key) => {
        // 内部数据结构处理，数组需要转化，需要级联选择 mark
        this.state[item][key] = e[0];
        this.setState();
    }

    handle_date = (e, item, key, format) => {
        this.state[item][key] = T.clock(e).fmt(format);
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
                element = (
                    <InputItem clear onChange={e => this.handle_input(e, 'input_datas', key)} value={input_datas[key]} placeholder='请输入'>{item.text}</InputItem>
                );
            break;

            case '2': // 时间控件
                element = (
                    <DatePicker value={date_datas[key]} onChange={date => this.handle_date(date, 'date_datas', key, format)} format={date => (T.clock(date).fmt(format))}>
                        <List.Item arrow='horizontal'>{text}</List.Item>
                    </DatePicker>
                );
            break;

            case '3': // 下拉框
                element = (
                    <Picker extra='请选择' data={item.foreign_data} cols={1} onChange={value => this.handle_select(value, 'select_datas', key)} value={[select_datas[key]]}>
                        <List.Item arrow='horizontal'>{item.text}</List.Item>
                    </Picker>
                );
            break;

            case '4': // 单选框

            break;
        }
        
        return element;
    }

    handle_search_change = (...args) => {
        this.setState({search_field_open: !this.state.search_field_open});
    }

    render() {
        const {children,config} = this;
        const {currentState,edit_datas,search_field_open} = this.state;
        const {height = document.documentElement.clientHeight || document.body.clientHeight} = this.props;

        let sidebar = (
            <List>
                <NavBar icon={<Icon type='search' />}>搜索条件</NavBar>
                {
                    config.map(item => {
                        return this.handle_search_field_type(item);
                    })
                }
                <List.Item>
                    <div style={{textAlign:'center'}}>
                        <Button type='primary' onChange={this.search} style={{width:110,height:30,marginRight:30}}>确定</Button>
                        <Button type='simple' onChange={this.handle_search_change} style={{width:110,height:30}}>返回</Button>
                    </div>
                </List.Item>
            </List>
          );

        let edit_content = (
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
            <div className='List_Container'>

                {/* 搜索面板 */}
                <Drawer open={search_field_open} onOpenChange={this.handle_search_change} className='search-drawer' sidebar={sidebar} position='right' enableDragHandle />

                {/* 模板渲染 */}
                <div className='content' style={{left: currentState * 100 + '%'}}>
                    {children}
                </div>

                {/* 新增/修改页 */}
                <div className='edit-content' style={{left: ((currentState + 1) * 1) * 100 + '%'}}>
                    {edit_content}
                </div>
            </div>
        )
    }
}