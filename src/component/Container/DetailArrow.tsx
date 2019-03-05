import React, { Component } from 'react';

export interface DetailArrowProps {
  displayLast?: boolean;
  displayNext?: boolean;
  height: number;
  onClick?: (status: string) => void;
  visible?: boolean;
}

export default class DetailArrow extends Component<DetailArrowProps> {
  render = () => {
    let {
      displayLast,
      displayNext,
      height,
      onClick,
      visible = false,
    } = this.props;

    /* 详情页上一条数据 */
    const last = (
      <div
        className="sc-extend-drawer sc-left"
        onClick={() => onClick && onClick('last')}
        style={{ display: displayLast ? '' : 'none', top: (height - 100) / 2 }}
      >
        <img src="../../assets/List_Container/arrow-left.png" />
      </div>
    );

    /* 详情页下一条数据 */
    const next = (
      <div
        className="sc-extend-drawer sc-right"
        onClick={() => onClick && onClick('next')}
        style={{ display: displayNext ? '' : 'none', top: (height - 100) / 2 }}
      >
        <img src="../../assets/List_Container/arrow-right.png" />
      </div>
    );

    return (
      <div className="DetailArrow">
        {visible && last}
        {visible && next}
      </div>
    );
  };
}
