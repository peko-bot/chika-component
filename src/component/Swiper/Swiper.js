import React from 'react'

import './css/Swiper.css'

/* 基于translate3d的滑动分页组件
    尚未实现惯性缓动
*/
class Swiper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            distance: 0, // 从touchstart记，到touchend结束，容器滑过的距离
            icon_deg: 0, // 箭头变换角度
            refresh_end: false, // 刷新是否完成
            load_end: false, // 加载是否完成
            duration: 0, // 滑动持续时间，如果config中传了这个参数则默认失效
            refresh_text: '下拉刷新',
            refresh_img: this.down,
            load_text: '加载更多',
            load_img: this.down,
        }
    }

    startY = 0;
    endY = 0;
    timer = null;
    down = '../../assets/Swiper/down.png'
    loading = '../../assets/Swiper/loading.gif'
    complete = '../../assets/Swiper/complete.png'
    scrollerHeight = 1000
    bottomHeight = 0
    componentDidMount = () => {
        this.event_bind(this.refs.wrapper);
    }
    
    /* 当子组件有异步加载，比如ajax的时候，那这个时候这里就获得不到子组件最新的高度
    然后下方加载的div就会显示异常。然后我这边有俩办法，取的是第二种
    一个是父组件获得子组件高度的方法写到componentDidUpdate里，但好像挺影响性能的
    一个是子组件在异步回调里去调父组件刷新高度的方法
    问题mark
    */
    // componentDidUpdate = (prevProps,prevState) => {
    //     this.get_child_height();
    // }

    reset = () => {
        this.get_child_height();
        this.setState();
    }

    /* 获得childeren元素加载的高度
        这里算法是用 屏幕可视高度-传进来容器高度,
        得到底部div该放到什么地方 */
    get_child_height = () => {
        const {wrapperHeight} = this.props.config;
        const {scrollHeight} = this.refs.scroller;
        // let height = document.documentElement.clientHeight || document.body.clientHeight;
        // 父页面中非容器元素的高度
        // this.n_differHeight = height - wrapperHeight;
        // 触发加载时要停在底部显示加载中
        this.bottomHeight = scrollHeight - wrapperHeight + 44;
        this.scrollerHeight = scrollHeight;
    }

    // 上下两div行为相似，于是放到一块去绑定事件了
    event_bind = (refs) => {
        const {config} = this.props;
        refs.addEventListener('touchstart', (e) => {
            // 计时
            this.timer = new Date().getTime();
            // 记录开始滑动时的坐标
            this.startY = e.touches[0].pageY;
            
            this.state.refresh_end = false;
            this.state.load_end = false;
        })

        refs.addEventListener('touchmove', (e) => {
            // 放在touchstart里会覆盖children里的click事件
            e.preventDefault();

            // 计算容器滑过的距离
            let distance = (e.touches[0].pageY - this.startY) / config.sensibility + this.endY;

            if (distance > 44) { // 44是刷新、加载div的高度，超过时箭头向上
                this.state.icon_deg = 180;
            } else if(distance >= 0 && distance <= 44) { // 刷新没超过上方div高度时，根据比例变换箭头方向
                this.state.icon_deg = (distance / 44) * 180;
            }else { // 下方的加载偷懒没写箭头变换以及未超过44的行为，mark
                this.state.icon_deg = 180;
            }

            this.setState({distance});
        });
        
        refs.addEventListener('touchend', (e) => {
            /* 
                配置里有duration的话就用配置里的
                默认的duration是从touchstart到end的时间
                也就是说滑动时间越长，弹回的越慢
            */
            let duration = config.duration ? config.duration : (new Date().getTime() - this.timer) / 1000;
            let {distance} = this.state;
            
            if(distance > 44){ // 拖到顶部的情况
                if(this.props.refresh) {
                    this.state.refresh_img = this.loading;
                    this.state.refresh_text = '刷新中...';
                    this.state.distance = 44;

                    this.props.refresh();
                }
            }else if(distance > 0 && distance <= 44){ // 上方div未超过44的情况
                this.state.distance = 0;
            }else if(distance < 0){ // 拖动到底部的情况
                const {offsetHeight,scrollHeight} = this.refs.scroller;
                const differHeight = scrollHeight - offsetHeight;
                // 超出边界回弹
                if(Math.abs(distance) > differHeight){ // 这里不能写等于，不然容器拖到底部时，touchstart会触发加载事件
                    this.state.distance = -differHeight;
                    this.endY = -differHeight;

                    // 下拉加载
                    if(this.props.load){
                        this.state.load_text = '加载中...';
                        this.state.load_img = this.loading;
                        this.state.distance = -this.bottomHeight;

                        this.props.load();
                    }
                }else{ // 未超出边界就停在那儿
                    this.endY = distance;
                }
            }
            
            this.setState({
                refresh_end: true,
                load_end: true,
                duration,
            }, () => {
                this.timer = null;
            })
        })
    }

    cancel_refresh = () => {
        // 上方div在加载完后显示更新成功
        this.setState({
            refresh_img: this.complete,
            refresh_text: '刷新成功',
            icon_deg: 0
        }, () => {
            // 滑回去
            setTimeout(() => {
                this.reset();
                this.setState({
                    refresh_img: this.down,
                    distance: 0,
                    refresh_text: '下拉刷新'
                });
            }, 1000);
        });
    }

    cancel_load = (finish_text = '加载完成') => {
        // 下方div在加载完后显示加载成功
        this.setState({
            load_img: this.complete,
            load_text: finish_text,
            icon_deg: 0,
        }, () => {
            // 滑回去
            setTimeout(() => {
                this.reset();
                this.setState({
                    load_img: this.down,
                    distance: this.endY,
                    load_text: '加载更多'
                });
            }, 1000);
        });
    }

    render() {
        const {config} = this.props, {wrapperHeight} = config;
        const {distance, icon_deg, refresh_end, duration,refresh_text,loading,refresh_img,load_end,load_text,load_img} = this.state;
        const defaultHeight = document.documentElement.clientHeight || document.body.clientHeight;
        const defaultWidth = document.documentElement.clientWidth || document.body.clientWidth;

        let refresh_style = {
            transform: `translate3d(0px, ${distance}px, 0)`,
        };
        if (refresh_end) 
            refresh_style = Object.assign(refresh_style, {transition: `all ${duration}s ease`});

        let load_style = {
            transform: `translate3d(0px, ${distance}px, 0)`,
            top: this.scrollerHeight
        };
        if (load_end) 
            load_style = Object.assign(load_style, {top: this.scrollerHeight,transition: `all ${duration}s ease`});
        
        let wrap_style = Object.assign({}, {height: wrapperHeight ? wrapperHeight : defaultHeight}, refresh_style);

        let refresh = [];
        if(config.refresh === true || config.refresh === undefined){
            refresh.push(
                <div className={refresh_end?'refresh refresh-end':'refresh'} style={refresh_style}>
                    <span className='refresh-icon' style={{transform:`rotateZ(${icon_deg}deg)`}}>
                        <img src={refresh_img} />
                    </span>
                    <span className='refresh-text'>{refresh_text}</span>
                </div>
            );
        }

        let load = [];
        if(config.load === true || config.load === undefined){
            load.push(
                <div className={load_end?'load load-end':'load'} style={load_style}>
                    <span className='load-icon' style={{transform:`rotateZ(${icon_deg}deg)`}}>
                        <img src={load_img} />
                    </span>
                    <span className='load-text'>{load_text}</span>
                </div>
            );
        }

        return (
            <div className='Swiper'>
                <div ref='wrapper' className='wrapper'>
                    {
                        React.Children.map(this.props.children, (child)=>{
                            child = React.cloneElement(child, {className: 'child-z-index-8'});
                            return (
                                <div>
                                    <div style={wrap_style} ref='scroller'>{child}</div>

                                    {/* 上拉刷新 */}
                                    {refresh}

                                    {/* 下拉加载 */}
                                    {load}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Swiper