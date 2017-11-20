import React from 'react'

import Swiper from '../../component/Swiper/Swiper'
import './css/Swiper_demo.css'

class Swiper_demo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datas: []
        }
    }

    dataSource = []
    componentDidMount = () => {
        T.ajax({
            key: 'secRecordPath',
            f: 'json',
            success: (result) => {
                this.setState({datas: result}, () => {
                    this.refs.swiper.reset();
                });
            }
        })
    }

    refresh = () => {
        T.ajax({
            key: 'secRecordPath',
            f: 'json',
            success: (result) => {
                setTimeout(() => {
                    this.setState({datas: result}, () => {
                        this.refs.swiper.cancel_refresh();
                    });
                }, 1000);
            }
        })
    }

    load = () => {
        setTimeout(() => {
            console.log('load')
            let {datas} = this.state;
            let start = datas.length;
            // for(let i = start + 1;i - start <= 10;i++){
            //     datas.push({describe: `test${i}`});
            // }
            // this.setState({datas});
            this.refs.swiper.cancel_load();
        }, 1000);
    }

    onClick = (i) => {
        console.log(i)
    }

    render() {
        const {onClick} = this;

        return (
            <div className='Swiper_demo'>
                <Swiper config={this.config} refresh={this.refresh} load={this.load} ref='swiper'>
                    <ul>
                        {
                            this.state.datas.map((item,i)=>{
                                return (
                                    <li onClick={()=>onClick(item)}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </Swiper>
            </div>
        )
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

export default Swiper_demo