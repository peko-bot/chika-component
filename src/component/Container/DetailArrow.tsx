import React from 'react';

export interface DetailArrowProps {
  showNext?: boolean;
  showLast?: boolean;
  onClick?: (status: string) => void;
}

const DetailArrow = (props: DetailArrowProps) => {
  const { onClick } = props;
  const top = 'calc((100vh - 100px) / 2)';

  return (
    <React.Fragment>
      <div
        className="sc-extend-drawer sc-left"
        style={{ top }}
        onClick={() => onClick && onClick('last')}
      >
        <img src="../../assets/List_Container/arrow-left.png" />
      </div>
      <div
        className="sc-extend-drawer sc-right"
        style={{ top }}
        onClick={() => onClick && onClick('next')}
      >
        <img src="../../assets/List_Container/arrow-right.png" />
      </div>
    </React.Fragment>
  );
};

export default DetailArrow;
