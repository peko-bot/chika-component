import React from 'react';

import './css/Ripple.css';

/* 点击波纹 */
export default class Ripple extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			display: false, // 动画是否开始
			left: 0,
			top: 0,
			opacity: 0,
		};
	}

    componentDidMount = () => {
    	// 动画结束后移除样式 mark
    	this.ripple.removeEventListener('transitionend', this.handleTransitionend, false);
    	this.ripple.addEventListener('transitionend', this.handleTransitionend, false);
    }

    init = element => {
    	if(!element) return;

    	element.removeEventListener('click', this.handleClick, false);
    	element.addEventListener('click', this.handleClick, false);
    }

    handleTransitionend = e => {
    	this.setState({ display: false });
    }

    handleClick = e => {
    	const { offsetX, offsetY } = e;
    	const { wrapWidth = 150 } = this.props;

    	// 开始动画
    	this.setState({
    		scale: wrapWidth,
    		left: offsetX,
    		top: offsetY,
    		opacity: 1,
    		display: true,
    	}, () => {
    		// 波纹淡出
    		this.setState({ opacity: 0 });
    	});
    }

    render () {
    	let { wrapWidth = 150, duration = '0.7s', background = 'rgba(255, 255, 255, 0.3)', children } = this.props;
    	let { display, scale, opacity, left, top } = this.state;

    	let style = { transform: `scale(${scale})`, opacity, left, top, width: 2, height: 2, transitionDuration: duration, background };

    	return (
    		<div>
    			{
    				React.Children.map(children, child => {
    					return (
    						<div ref={ref => this.init(ref)} style={{ display: 'inline-block', width: '50%' }}>{child}</div>
    					);
    				})
    			}
    			<div className='Ripple' style={display ? style : null} ref={ref => this.ripple = ref} />
    		</div>
    	);
    }
}