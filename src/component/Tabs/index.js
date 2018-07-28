/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-04 17:17:11
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 13:49:05
 */
import React from 'react';

import './css/Tabs.css';

export default class Tabs extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			currentSelect: 0,
			underlineItem: { // 下划线参数
				width: 0,
			},
			dataSource: [], // 页签项数据，比如除了字符串还传了其他东西
			rippleConfig: { //
				scale: 0, // 点击波纹缩放
				offsetLeft: 0, // 偏移量
				offsetTop: 0,
				opacity: 1, // 透明度
				displayFlag: false, // 用于判断二次点击时是否产生波纹
			},
		};
	}

    componentWillMount = () => {
    	this.handleChildrenDatas();
    }

    // 用于label动态更新
    componentWillReceiveProps = nextProps => {
    	let { children } = nextProps;

    	this.handleChildrenDatas(children);
    }

    componentDidMount = () => {
    	this.resetUnderline();
    }

    /*
        预处理页签项数据
        一种情况是传入字符串，这直接显示出来就好
        另一种是除了字符串还传了其他东西，也就是一个对象。
            这种在里面加上label字段，其他参数在点击页签项的时候抛出
        除了这两种情况，其他传入都是报错
    */
    handleChildrenDatas = (children = this.props.children) => {
    	this.state.dataSource = [];
    	React.Children.map(children, child => {
    		let obj = {};

    		if(typeof child.props.label === 'string') {
    			obj.label = child.props.label;
    		}else{
    			obj = child.props.label;
    		}
    		this.state.dataSource.push(obj);
    	});
    }

    /*
        重置下划线宽度
        根据span被字撑开的宽度计算下划线起始位置及宽度
        有挺多无用渲染的 mark
    */
    resetUnderline = () => {
    	setTimeout(() => {
    		let { currentSelect } = this.props;
    		// 页签项下划线宽度
    		let coefficient = [];

    		for(let i = 0; i < this.state.dataSource.length; i++) {
    			let spanWidth = this[`panel_span_${i}`].offsetWidth;
    			let itemWidth = this[`panel_item_${i}`].offsetWidth;
    			let itemHeight = this[`panel_item_${i}`].offsetHeight;

    			this[`panel_item_${i}`].addEventListener('transitionend', e => {
    				this.state.rippleConfig.displayFlag = false;
    				this.setState();
    			});
    			// 这里的-12，我也忘了是为什么了
    			coefficient.push({ underlineWidth: spanWidth + 20, left: ((itemWidth - spanWidth) / 2 - 12) + currentSelect * itemWidth, width: itemWidth, height: itemHeight });
    		}
    		this.setState({ underlineItem: coefficient[currentSelect] });
    	}, 0);
    }

    handleClick = (item, currentSelect, event) => {
    	let { rippleConfig, underlineItem } = this.state;
    	const { pageX, pageY } = event;

    	this.resetUnderline();

    	let config = {
    		scale: +underlineItem.width,
    		offsetLeft: pageX,
    		offsetTop: pageY,
    		opacity: 1,
    		displayFlag: true,
    	};

    	this.setState(Object.assign(rippleConfig, config), () => {
    		rippleConfig.opacity = 0;
    		this.setState({ rippleConfig });
    	});

    	if(this.props.onClick) this.props.onClick(item, currentSelect);
    }

    render () {
    	const { config = {}, currentSelect, children } = this.props;
    	/* 当传width时，页签项定宽，
            超出宽度时可滑动，惯性弹回，
            未超出屏幕时就当没传 plan
            不传时按页签项数量平分父容器的宽度 暂 */
    	let { width, containerStyle, undelineStyle, fontStyle } = config;
    	const { dataSource, underlineItem, rippleConfig } = this.state;
    	const { scale, offsetLeft, offsetTop, opacity, displayFlag } = rippleConfig;

    	// 波纹
    	let rippleStyle = Object.assign({}, { top: offsetTop, left: offsetLeft - (currentSelect * underlineItem.width) }, { width: 2, height: 2, background: 'rgba(255, 255, 255, 0.3)', position: 'absolute', transform: `scale(${scale})`, transition: 'transform .7s cubic-bezier(0.250, 0.460, 0.450, 0.940), opacity .7s cubic-bezier(0.250, 0.460, 0.450, 0.940)', borderRadius: '50%', opacity });

    	let tabs = [];

    	tabs.push(
    		<ul key='container_ul' className='container' style={containerStyle}>
    			{
    				dataSource.map((item, i) => {
    					return (
    						<li key={`dataSource_${i}`} className='item' style={Object.assign({ width: 100 / dataSource.length + '%' }, fontStyle)} onClick={e => this.handleClick(item, i, e)} ref={ref => this[`panel_item_${i}`] = ref}>
    							<span className={currentSelect == i ? 'active' : null} ref={ref => this[`panel_span_${i}`] = ref}>{item.label}</span>
    							<div style={currentSelect == i && displayFlag ? rippleStyle : null} />
    						</li>
    					);
    				})
    			}
    		</ul>
    	);

    	let underline = [];
    	const { underlineWidth, left } = underlineItem;

    	underline.push(
    		<div key='underline' className='underline-container' style={containerStyle}>
    			<div className='underline' style={Object.assign({ width: underlineWidth, transform: `translate3d(${left}px, 0, 0)` }, undelineStyle)}></div>
    		</div>
    	);

    	return (
    		<div className='Tabs'>
    			{tabs}
    			{underline}
    			{
    				React.Children.map(children, (child, i) => {
    					return (
    						<div key={`child_${i}`} className='child-content' style={{ transform: `translate3d(${(i - currentSelect) * 100}%, 0, 0)` }}>{child}</div>
    					);
    				})
    			}
    		</div>
    	);
    }
}