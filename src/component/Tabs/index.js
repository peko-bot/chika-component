/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-06-04 17:17:11 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-06-04 17:19:23
 */
import React from 'react'

import './css/Tabs.css'

export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: 0,
            underline_item: { // 下划线参数
                width: 0,
            },
            dataSource: [], // 页签项数据，比如除了字符串还传了其他东西
            ripple_config: { // 
                scale: 0, // 点击波纹缩放
                offsetLeft: 0, // 偏移量
                offsetTop: 0,
                opacity: 1, // 透明度
                displayFlag: false, // 用于判断二次点击时是否产生波纹
            },
        }
    }

    componentWillMount = () => {
        this.handle_children_datas();
    }

    // 用于label动态更新
    componentWillReceiveProps = nextProps => {
        let {children} = nextProps;

        this.handle_children_datas(children);
    }

    componentDidMount = () => {
        this.reset_underline();
    }

    /* 
        预处理页签项数据
        一种情况是传入字符串，这直接显示出来就好
        另一种是除了字符串还传了其他东西，也就是一个对象。
            这种在里面加上label字段，其他参数在点击页签项的时候抛出
        除了这两种情况，其他传入都是报错
    */
    handle_children_datas = (children = this.props.children) => {
        this.state.dataSource = [];
        React.Children.map(children, child => {
            let obj = {};
            if(typeof child.props.label === 'string'){
                obj.label = child.props.label;
            }else{
                obj = child.props.label;
            }
            this.state.dataSource.push(obj);
        })
    }

    /* 
        重置下划线宽度
        根据span被字撑开的宽度计算下划线起始位置及宽度
        有挺多无用渲染的 mark
    */ 
    reset_underline = () => {
        setTimeout(() => {
            let {currentSelect} = this.props;
            // 页签项下划线宽度
            let coefficient = [];
            for(let i = 0; i < this.state.dataSource.length; i++){
                let span_width = this[`panel_span_${i}`].offsetWidth;
                let item_width = this[`panel_item_${i}`].offsetWidth;
                let item_height = this[`panel_item_${i}`].offsetHeight;

                this[`panel_item_${i}`].addEventListener('transitionend', e => {
                    this.state.ripple_config.displayFlag = false;
                    this.setState();
                });
                // 这里的-12，我也忘了是为什么了
                coefficient.push({underline_width: span_width + 20, left: ((item_width - span_width) / 2 - 12) + currentSelect * item_width, width: item_width, height: item_height});
            }
            this.setState({underline_item: coefficient[currentSelect]});
        }, 0);
    }

    handle_click = (item, currentSelect, event) => {
        let {ripple_config, underline_item} = this.state;
        const {pageX, pageY} = event;

        this.reset_underline();

        let config = {
            scale: +underline_item.width,
            offsetLeft: pageX,
            offsetTop: pageY,
            opacity: 1,
            displayFlag: true,
        };
        this.setState(Object.assign(ripple_config, config), () => {
            ripple_config.opacity = 0;
            this.setState({ripple_config});
        });
        
        if(this.props.onClick) this.props.onClick(item, currentSelect);
    }

    render() {
        const {config = {}, currentSelect, children} = this.props;
        /* 当传width时，页签项定宽，
            超出宽度时可滑动，惯性弹回，
            未超出屏幕时就当没传 plan
            不传时按页签项数量平分父容器的宽度 暂 */
        let {width, containerStyle, undelineStyle, fontStyle} = config;
        const {dataSource, underline_item, ripple_config} = this.state;
        const {scale, offsetLeft, offsetTop, opacity, displayFlag} = ripple_config;

        // 波纹
        let ripple_style = Object.assign({}, {top: offsetTop, left: offsetLeft - (currentSelect * underline_item.width)}, {width: 2, height: 2, background: 'rgba(255, 255, 255, 0.3)', position: 'absolute', transform: `scale(${scale})`, transition: 'transform .7s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .7s cubic-bezier(0.250, 0.460, 0.450, 0.940)', borderRadius: '50%', opacity});

        let tabs = [];
        tabs.push(
            <ul key='container_ul' className='container' style={containerStyle}>
                {
                    dataSource.map((item, i) => {
                        return (
                            <li key={`dataSource_${i}`} className='item' style={Object.assign({width: 100 / dataSource.length + '%'}, fontStyle)} onClick={e => this.handle_click(item, i, e)} ref={ref => this[`panel_item_${i}`] = ref}>
                                <span className={currentSelect == i ? 'active' : null} ref={ref => this[`panel_span_${i}`] = ref}>{item.label}</span>
                                <div style={currentSelect == i && displayFlag ? ripple_style : null} />
                            </li>
                        )
                    })
                }
            </ul>
        )

        let underline = [];
        const {underline_width, left} = underline_item;
        underline.push(
            <div key='underline' className='underline-container' style={containerStyle}>
                <div className='underline' style={Object.assign({width: underline_width, transform: `translate3d(${left}px, 0, 0)`}, undelineStyle)}></div>
            </div>
        )

        return (
            <div className='Tabs'>
                {tabs}
                {underline}
                {
                    React.Children.map(children, (child, i) => {
                        return (
                            <div key={`child_${i}`} className='child-content' style={{transform: `translate3d(${(i - currentSelect) * 100}%, 0, 0)`}}>{child}</div>
                        )
                    })
                }
            </div>
        )
    }
}