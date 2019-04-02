import React from 'react';
import Swiper from '../../component/Swiper';
import './css/Swiper_demo.css';
const secRecordPath = '/mock/swiper.json';
import { ajax } from '../../util/urlHelper';

export default class SwiperDemo extends React.Component {
  swiper: any;
  state: { datas: Array<any>; loading: boolean } = {
    datas: [],
    loading: false,
  };

  dataSource = [];
  componentDidMount = () => {
    this.setState({ loading: true });
    ajax({
      url: secRecordPath,
      success: result => this.setState({ datas: result, loading: false }),
    });
  };

  onChange = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    const { loading } = this.state;

    return (
      <div className="Swiper_demo">
        <Swiper
          wrapperHeight={500}
          duration={0.7}
          sensibility={1}
          onRefresh={this.onChange}
          onLoad={this.onChange}
          loading={loading}
        >
          <ul>
            {this.state.datas.map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </Swiper>
      </div>
    );
  }
}
