import React from 'react';

export interface ValueKeyProps {
  config: any;
  dataSource: Array<any>;
}

/** 键值对绑定 */
export class ValueKey extends React.Component<ValueKeyProps> {
  render() {
    const { config, dataSource } = this.props;

    return (
      <div className="keyValue_box">
        <div
          className="keyValue_title"
          style={{
            backgroundColor: config.tBgColor || '#fff',
            color: config.tColor || '#000',
            width: config.width || 100,
          }}
        >
          {dataSource[config.title]}
        </div>
        {config.rows.map((item: any) => {
          return (
            <div className="keyValue_row">
              <div
                style={{
                  width: item.nWidth || '50%',
                  backgroundColor: item.bgColor || '#fff',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  width: item.vWidth || '50%',
                  backgroundColor: item.bgColor || '#fff',
                }}
              >
                {dataSource[item.key]}
              </div>
            </div>
          );
        })}
        <div style={{ height: 1, clear: 'both' }} />
      </div>
    );
  }
}
