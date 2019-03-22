import React from 'react';
import UploadView, { UploadViewProps } from './UploadView';
import classNames from 'classnames';

export interface UploadProps extends UploadViewProps {
  style?: React.CSSProperties;
  className?: string;
}

const Upload = (props: UploadProps) => {
  const { style, className, ...rest } = props;
  return (
    <div className={classNames('upload', className)} style={style}>
      <UploadView {...rest} />
    </div>
  );
};

export default Upload;
