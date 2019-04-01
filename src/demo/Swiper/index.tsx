import React from 'react';
import Swiper from '../../component/Swiper';
import './css/Swiper_demo.css';
const secRecordPath = '/mock/s_problem_record_hy.json';

export default class SwiperDemo extends React.Component {
  swiper: any;
  state: { datas: Array<any> } = {
    datas: [],
  };

  dataSource = [];
  componentDidMount = () => {
    fetch(secRecordPath)
      .then(result => result.json())
      .then(result => {
        this.setState({ datas: result }, () => {
          this.swiper.reset();
        });
      });
  };

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
  };

  load = () => {
    setTimeout(() => {
      this.swiper.cancelLoad();
    }, 1000);
  };

  onClick = (i: string) => {
    console.log(i);
  };

  render() {
    const { onClick } = this;

    return (
      <div className="Swiper_demo">
        <Swiper
          wrapperHeight={500}
          duration={0.5}
          sensibility={1}
          onRefresh={this.refresh}
          onLoad={this.load}
          ref={ref => (this.swiper = ref)}
        >
          <ul>
            {this.state.datas.map((item, i) => {
              return (
                <li key={`datas_${i}`} onClick={() => onClick(item)}>
                  {item}
                </li>
              );
            })}
          </ul>
        </Swiper>
      </div>
    );
  }
}
