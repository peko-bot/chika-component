import React, { Component } from 'react';

import { Modal } from 'antd-mobile';
const operation = Modal.operation;

import moment from 'moment';
import extend from '../../util/DeepClone';

export default class Templet extends Component {
  // 递归复制模版，填入数据
  travelChildren = (children, item, mainValue) => {
    const { bindKey = 'data-key', onDetail, power, onDelete } = this.props;

    React.Children.map(children, child => {
      let { props = {} } = child;
      let { bind, format, decimalcount, unit } = props;
      let instance, key;

      if (typeof child !== 'string') {
        child.key = `child_${Math.random() * 10000}`;
        instance = child.props;
        key = instance[bindKey];

        // children中有绑定事件时，把这个格子的数据传出去
        if (instance.onChange) {
          instance.onClick = e => {
            e.stopPropagation();

            instance.onChange(item);
          };
        }
      }

      /* 绑定点击事件，模版中所谓的head就是每块元素的最顶层标签 */
      if (bind && instance) {
        // 长按菜单
        let timer = null;

        /* 查看详情 */
        instance.onClick = e => {
          onDetail && onDetail(mainValue, 'detail');
        };

        instance.onTouchStart = e => {
          timer = setTimeout(() => {
            let opera = [];

            for (let item of power) {
              switch (item) {
                // case 'Add':
                //     opera.push({ text: '新增', onPress: () => onDetail && onDetail(mainValue, 'add') });
                // break;

                case 'Del':
                  opera.push({
                    text: '删除',
                    onPress: () => onDelete(mainValue),
                  });
                  break;

                case 'Update':
                  opera.push({
                    text: '修改',
                    onPress: () => onDetail && onDetail(mainValue, 'edit'),
                  });
                  break;

                default:
                  break;
              }
            }
            opera.length != 0 ? operation(opera) : null;
          }, 800);
        };

        // 滑动时停止计时，不然滑着滑着弹菜单，很监介
        instance.onTouchMove = () => {
          clearTimeout(timer);
        };

        instance.onTouchEnd = () => {
          clearTimeout(timer);
        };
      }

      let value = item[key];

      /* 列表页预处理 */
      if (instance) {
        if (instance[bindKey] && value !== undefined) {
          /* 处理时间格式 */
          if (format) {
            instance.children = value = moment(value).format(format);
          }

          /* 处理小数保留位数 */
          if (decimalcount) {
            instance.children = value = parseFloat(value).toFixed(decimalcount);
          }

          /* 处理单位 */
          if (unit) {
            instance.children = value = `${value} ${unit}`;
          }

          instance.children = instance.children ? instance.children : value;
        } else if (instance && typeof instance.children === 'object') {
          this.travelChildren(instance.children, item, mainValue);
        }
      }
    });
  };

  buildTemplet = () => {
    const { dataSource, mainKey, templet, mainValue, onSort } = this.props;

    // 重置详情页left顺序，顺带重新渲染模版
    let children = [];

    for (let i = 0; i < dataSource.length; i++) {
      let item = dataSource[i];

      // 复制模版对象
      let singleTemplet = extend({}, templet);

      mainValue(item[mainKey]);

      // 渲染模版
      this.travelChildren(singleTemplet, item, item[mainKey]);

      children.push(singleTemplet);
    }

    return children;
  };

  render = () => {
    const { dataSource } = this.props;

    return (
      <div className="Templet">
        {dataSource.length ? (
          this.buildTemplet()
        ) : (
          <img
            src="../../assets/List_Container/nodata.png"
            style={{ width: '100%' }}
          />
        )}
      </div>
    );
  };
}
