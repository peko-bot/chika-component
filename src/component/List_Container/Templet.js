/*
 * @Author: zy9@github.com/zy410419243 
 * @Date: 2018-07-04 09:59:21 
 * @Last Modified by: zy9
 * @Last Modified time: 2018-07-05 09:44:38
 */
import React, { Component } from 'react'

import { PullToRefresh } from 'antd-mobile'

import moment from 'moment'
import extend from '../../util/DeepClone'

export default class Templet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
        }
    }

    componentDidMount = () => {
    
    }

    // 递归复制模版，填入数据
   travel_children = (children, item, mainKey) => {
        const { bindKey = 'data-key' } = this.props;

        React.Children.map(children, child => {
            let { bind, format, decimalcount, unit } = child.props;

            child.key = `child_${Math.random() * 10000}`;

            let instance = child.props;
            let key = instance[bindKey];

            // children中有绑定事件时，把这个格子的数据传出去
            instance.onClick = e => (instance.onChange && instance.onChange(item));

            /* 绑定点击事件，模版中所谓的head就是每块元素的最顶层标签 */
            if(bind) {
                // 长按菜单
                let timer = null;
                
                /* 查看详情 */
                instance.onClick = e => {
                    this.handle_item_edit(mainKey, 'detail');
                }

                instance.onTouchStart = e => {
                    timer = setTimeout(() => {
                        let opera = [];
                        for(let item of this.power) {
                            switch(item) {
                                // case 'Add':
                                //     opera.push({text: '新增', onPress: () => this.handle_item_edit(mainKey, 'add')});
                                // break;

                                case 'Del':
                                    opera.push({text: '删除', onPress: () => this.delete(mainKey)});
                                break;

                                case 'Update':
                                    opera.push({text: '修改', onPress: () => this.handle_item_edit(mainKey, 'edit')});
                                break;
                            }
                        }
                        opera.length != 0 ? operation(opera) : null;
                    }, 800);
                }

                // 滑动时停止计时，不然滑着滑着弹菜单，很尴尬
                instance.onTouchMove = () => {
                    clearTimeout(timer);
                }

                instance.onTouchEnd = () => {
                    clearTimeout(timer);
                }
            }

            const value = item[key];

            /* 列表页预处理 */
            if(instance[bindKey]) {
                /* 处理时间格式 */
                if(format) {
                    instance.children = value ? moment(value).format(format) : value;
                }

                /* 处理小数保留位数 */
                if(decimalcount) {
                    instance.children = value ? parseFloat(value).toFixed(decimalcount) : instance.children;
                }
                
                /* 处理单位 */
                if(unit) {
                    instance.children = value ? `${instance.children} ${unit}` : instance.children;
                }

                instance.children = instance.children ? instance.children : value;
            } else {
                if(instance && typeof instance.children === 'object') {
                    this.travel_children(instance.children, item, mainKey);
                }
            }
        })
    }

    buildTemplet = () => {
        const { dataSource, mainKey, templet } = this.props;

        // 重置详情页left顺序，顺带重新渲染模版
        let children = [];
        for(let i = 0; i < dataSource.length; i++) {
            let item = dataSource[i];

            // 详情页排序
            item.detail_order = i;
            item.index = i;

            // 复制模版对象
            let singleTemplet = extend({}, templet);

            const value = item[mainKey]
            this.mainValue = value;
            // 渲染模版
            this.travel_children(singleTemplet, item, value);
            children.push(singleTemplet);
        }

        return children;
    }

    render = () => {
        const { height, currentState, display, loading, dataSource } = this.props;

        return (
            <div className='Templet'>
                {/* <PullToRefresh direction='up' style={{ height, overflow: 'auto' }} onRefresh={ this.handle_pull_load } refreshing={ loading }> */}
                    {/* <div className='sc-content' style={{ transform: `translate3d(${ currentState * 100 }%, 0, 0)`, display }} ref={ ref => this.content = ref }> */}
                        { dataSource.length ? this.buildTemplet() : <img src='../../src/assets/List_Container/nodata.png' style={{ width: '100%' }} /> }
                    {/* </div> */}
                {/* </PullToRefresh> */}
            </div>
        )
    }
}