/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-04 17:05:37
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-28 13:22:24
 */
import React from 'react';

import Swiper from '../../component/Swiper/Swiper';
import './css/Swiper_demo.css';

const secRecordPath = '/data/s_problem_record_hy.json';

export default class SwiperDemo extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			datas: []
		};
	}

    dataSource = []
    componentDidMount = () => {
    	fetch(secRecordPath)
    		.then(result => result.json())
    		.then(result => {
    			this.setState({ datas: result }, () => {
    				this.swiper.reset();
    			});
    		});
    }

    refresh = () => {
    	fetch(secRecordPath)
    		.then(result => result.json())
    		.then(result => {
    			setTimeout(() => {
    				this.setState({ datas: result }, () => {
    					this.swiper.cancelRefresh();
    				});
    			}, 1000);
    		});
    }

    load = () => {
    	setTimeout(() => {
    		console.log('load');
    		let { datas } = this.state;
    		let start = datas.length;
    		// for(let i = start + 1;i - start <= 10;i++){
    		//     datas.push({describe: `test${i}`});
    		// }
    		// this.setState({datas});

    		this.swiper.cancelLoad();
    	}, 1000);
    }

    onClick = (i) => {
    	console.log(i);
    }

    render () {
    	const { onClick } = this;

    	return (
    		<div className='Swiper_demo'>
    			<Swiper config={this.config} refresh={this.refresh} load={this.load} ref={ ref => this.swiper = ref }>
    				<ul>
    					{
    						this.state.datas.map((item, i) => {
    							return (
    								<li key={`datas_${i}`} onClick={() => onClick(item)}>{item}</li>
    							);
    						})
    					}
    				</ul>
    			</Swiper>
    		</div>
    	);
    }

    height = document.documentElement.clientHeight || document.body.clientHeight;

    config = {
    	wrapperHeight: 500, // 容器高度
    	duration: 0.5, // 弹回时间
    	sensibility: 1, // 灵敏度
    	// refresh: false,
    	// load: false,
    }
}