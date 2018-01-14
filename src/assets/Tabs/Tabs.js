import React from 'react'

import './css/Tabs.css'

/* 受控页签 */
export default class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSelect: 0,
            underline_item: {
                width: 0,
            }, // 下划线参数
            dataSource: [], // 页签项数据，比如除了字符串还传了其他东西
            ripple_config: { // 
                scale: 0, // 点击波纹缩放
                offsetLeft: 0, // 偏移量
                offsetTop: 0,
                opacity: 1, // 透明度
            },
        }
    }

    componentWillMount = () => {
        /* 
            预处理页签项数据
            一种情况是传入字符串，这直接显示出来就好
            另一种是除了字符串还传了其他东西，也就是一个对象。
                这种在里面加上label字段，其他参数在点击页签项的时候抛出
            除了这两种情况，其他传入都是报错
        */
        let {children} = this.props;
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

    componentDidMount = () => {
        this.reset_underline(0);
    }

    /* 
        重置下划线宽度
        根据span被字撑开的宽度计算下划线起始位置及宽度
        有挺多无用渲染的 mark
    */ 
    reset_underline = index => {
        setTimeout(() => {
            // 页签项下划线宽度
            let coefficient = [];
            for(let i = 0; i < this.state.dataSource.length; i++){
                let span_width = this[`panel_span_${i}`].offsetWidth;
                let item_width = this[`panel_item_${i}`].offsetWidth;
                let item_height = this[`panel_item_${i}`].offsetHeight;
                coefficient.push({underline_width: span_width + 20, left: ((item_width - span_width) / 2 - 12) + index * item_width, width: item_width, height: item_height});
            }
            this.setState({underline_item: coefficient[index]});
        }, 0);
    }

    handle_click = (item, currentSelect, event) => {
        let {ripple_config} = this.state;
        const {pageX, pageY} = event;

        this.reset_underline(currentSelect);

        ripple_config = {
            scale: 150,
            offsetLeft: `${pageX}`,
            offsetTop: `${pageY}`,
        };
        this.setState({ripple_config}, () => {
            setTimeout(() => {
                ripple_config.opacity = 0;
                this.setState({ripple_config});
            }, 700);
        });
        
        if(this.props.onClick) this.props.onClick(item, currentSelect);
    }

    render() {
        const {config = {}, currentSelect, children} = this.props;
        /* 当传width时，页签项定宽，
            超出宽度时可滑动，惯性弹回，
            未超出屏幕时就当没传 plan
            不传时按页签项数量平分一个屏幕的宽度 暂 */
        let {width, containerStyle, undelineStyle, fontStyle} = config;
        const {dataSource, underline_item, ripple_config} = this.state;
        const {scale, offsetLeft, offsetTop, opacity} = ripple_config;
        // console.log(offsetLeft, offsetTop)

        let ripple_style = {width: 2, height: 2, background: 'rgba(255, 255, 255, 0.3)', position: 'absolute', transform: `scale(${scale})`, transition: 'all .7s cubic-bezier(0.250, 0.460, 0.450, 0.940)', borderRadius: '50%', opacity};
        let tabs = [];
            tabs.push(
                <ul className='container' style={containerStyle}>
                    {
                        dataSource.map((item, i) => {
                            ripple_style.top = offsetTop;
                            ripple_style.left = offsetLeft - (currentSelect * underline_item.width);

                            return (
                                <li className='item' style={Object.assign({width: 100 / dataSource.length + '%'}, fontStyle)} onClick={e =>this.handle_click(item, i, e)} ref={ref => this[`panel_item_${i}`] = ref}>
                                    <span className={currentSelect == i ? 'active' : null} ref={ref => this[`panel_span_${i}`] = ref}>{item.label}</span>
                                    <div style={currentSelect == i ? ripple_style : null} />
                                </li>
                            )
                        })
                    }
                </ul>
            )

        let underline = [];
        const {underline_width, left} = underline_item;
        underline.push(
            <div className='underline-container' style={containerStyle}>
                <div className='underline' style={Object.assign({width: underline_width, transform: `translate3d(${left}px, 0, 0)`}, undelineStyle)}></div>
            </div>
        )

        return (
            <div className='Tabs'>
                {tabs}
                {underline}
                {
                    React.Children.map(children, (child, i) => {
                        return <div className='child-content' style={{transform: `translate3d(${(i - currentSelect) * 100}%, 0, 0)`}}>{child}</div>;
                    })
                }
            </div>
        )
    }
}