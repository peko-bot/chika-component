import React from 'react';

export interface DetailArrowProps {
  showNext?: boolean;
  showLast?: boolean;
  onClick?: (status: string) => void;
}

export default (props: DetailArrowProps) => {
  const { onClick, showLast, showNext } = props;
  const top = 'calc((100vh - 100px) / 2)';
  const last = (
    <div
      className="sc-extend-drawer sc-left"
      style={{ top }}
      onClick={() => onClick && onClick('last')}
    >
      <img src="../../assets/List_Container/arrow-left.png" />
    </div>
  );
  const next = (
    <div
      className="sc-extend-drawer sc-right"
      style={{ top }}
      onClick={() => onClick && onClick('next')}
    >
      <img src="../../assets/List_Container/arrow-right.png" />
    </div>
  );
  return (
    <React.Fragment>
      {showLast && last}
      {showNext && next}
    </React.Fragment>
  );
};
