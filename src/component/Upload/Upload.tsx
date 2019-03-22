import React from 'react';
import Uploader, { UploaderProps } from './Uploader';
import UploadView, { UploadViewProps } from './UploadView';

export interface UploadProps extends UploaderProps, UploadViewProps {
  style?: React.CSSProperties;
  className?: string;
}

const Upload = (props: UploadProps) => {
  const {
    fileList,
    onChange,
    loading,
    onPress,
    onClick,
    accept,
    multiple,
    ...rest
  } = props;
  return (
    <div className="Upload" {...rest}>
      <UploadView
        fileList={fileList}
        loading={loading}
        onPress={onPress}
        onClick={onClick}
      />
      <Uploader
        fileList={fileList}
        onChange={onChange}
        accept={accept}
        multiple={multiple}
      />
    </div>
  );
};

export default Upload;
