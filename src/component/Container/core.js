import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  DatePicker,
  List,
  InputItem,
  Drawer,
  Picker,
  Toast,
  Button,
  ActivityIndicator,
  PullToRefresh,
  Checkbox,
  Accordion,
  Calendar,
} from 'antd-mobile';
const { alert, operation } = Modal;
const CheckboxItem = Checkbox.CheckboxItem;
import Upload from './UploadWrapper';
import { createForm } from 'rc-form';
import Template from './Template';
import TransformManager, { Item } from '../TransformManager';
import DetailArrow from './DetailArrow';
import FunctionalButton from './FunctionalButton';
import MapBox from './MaxBox';
import { bindTouchDirection } from '../../util/Touch';
import './css/List_Container.css';
import Serialize from '../../util/Serialize';
import { format as fnsFormat } from 'date-fns/esm';
import { zhCN } from 'date-fns/locale';

function noop() {}
class ContainerCore extends React.Component {
  static propTypes = {
    power: PropTypes.object.isRequired,
    config: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired,
    total: PropTypes.number,
    loading: PropTypes.bool,
    primaryKey: PropTypes.string,
    onDelete: PropTypes.func,
  };

  static defaultProps = {
    power: {
      select: false,
      delete: false,
      update: false,
      add: false,
    },
    config: [],
    dataSource: [],
    total: 0,
    loading: false,
    primaryKey: '',
    onDelete: noop,
  };

  constructor(props) {
    super(props);

    let { domain, config } = props;
    let { tcid, pageSize = 10 } = config;

    this.state = {
      currentOrder: 0,
      currentGroup: 'list-page',
    };
  }

  componentDidMount = () => {
    // const { showSearch = true } = this.props.config;
    // 绑定搜索面板滑动事件
    // showSearch
    //   ? bindTouchDirection(this.content, direction => {
    //       switch (direction) {
    //         case 'toLeft':
    //           this.handleSearchChange();
    //           break;
    //         default:
    //           break;
    //       }
    //     })
    //   : null;
    // 绑定详情页点击及滑动事件
    // bindTouchDirection(this.editWrapper, direction => {
    //   const { pageType } = this.state;
    //   if (pageType == 'detail') {
    //     let { detailNext, detailLast } = this.handleDetailNext();
    //     switch (direction) {
    //       case 'toLeft':
    //         if (detailNext) {
    //           this.handleDetailPagination('next', detailNext);
    //         }
    //         break;
    //       case 'toRight':
    //         if (detailLast) {
    //           this.handleDetailPagination('last', detailLast);
    //         }
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // });
    // start
    // this.getConfig();
  };

  moment = (date, formatStr) => {
    return fnsFormat(new Date(date), formatStr, {
      locale: zhCN,
    });
  };

  // 返回列表
  backToList = () => {
    this.setState({ currentGroup: 'list-page', currentOrder: 0 });
  };

  handleDelete = primaryValue => {
    alert('长痛不如短痛，删tm的', '真删了啊？', [
      { text: '容朕三思' },
      {
        text: '真的',
        onPress: () => {
          this.props.onDelete(primaryValue);
        },
      },
    ]);
  };

  // 滑动加载
  handlePullLoad = () => {};

  handleTemplateClick = dataItem => {
    this.setState({ currentOrder: 0, currentGroup: 'detail-page' });
  };

  // show Modal for operation
  handleTemplatePress = dataItem => {
    const { primaryKey, power } = this.props;
    const { add, delete: del, update, select } = power;
    const primaryValue = dataItem[primaryKey];
    let param = [];

    if (!select) {
      return;
    }

    if (add) {
      param.push({
        text: '新增',
        // onPress: () => console.log('add'),
      });
    }

    if (update) {
      param.push({
        text: '修改',
        onPress: () => {
          this.setState({ currentGroup: 'update-page', currentOrder: 0 });
        },
      });
    }

    if (del) {
      param.push({
        text: '删除',
        onPress: () => this.handleDelete(primaryValue),
      });
    }
    param.length !== 0 && operation(param);
  };

  render = () => {
    const { state, props } = this;
    const { currentState, currentOrder, currentGroup } = state;
    let sidebar = (
      <List>
        <List.Item>
          <Button onClick={this.handleSearch} loading={props.loading}>
            确定
          </Button>
        </List.Item>
        {/* {config.map((item, i) =>
          this.handleControlType(item, 'search', undefined, i),
        )} */}
      </List>
    );

    let param = this.handleDetailNext();
    let [detailLast, detailNext] = [param.detailLast, param.detailNext];

    /* 新增/修改都是这个 */
    let editContent = (
      <List>
        {editConfig.map((item, i) =>
          this.handleControlType(item, 'edit', undefined, i),
        )}

        <List.Item>
          <Button
            type="primary"
            onClick={this.save}
            inline
            style={{ marginRight: 4, width: 'calc(50% - 4px)' }}
          >
            保存
          </Button>
          <Button inline onClick={this.backToList} style={{ width: '50%' }}>
            返回
          </Button>
        </List.Item>
      </List>
    );

    /* 详情页 */
    let detailContent = (
      <div style={{ overflowX: 'hidden', position: 'relative' }}>
        {props.dataSource.map((jtem, j) => (
          <List
            key={`listDatas_${j}`}
            className="sc-detail-content"
            style={{
              transform: `translate3d(${jtem.detailOrder * 100}%, ${j *
                -100}%, 0)`,
            }}
          >
            {detailConfig.map((item, i) =>
              this.handleControlType(item, 'detail', jtem, i),
            )}

            <List.Item>
              <Button onClick={this.backToList}>返回上级</Button>
            </List.Item>
          </List>
        ))}
      </div>
    );

    /* 触发搜索的方块 */
    let extendDrawer = showSearch ? (
      <div
        className="sc-extend-drawer sc-right"
        onClick={this.handleSearchChange}
        style={{
          display: searchFieldOpen || pageType != 'list' ? 'none' : '',
          top: (ClientHeight - 100) / 2,
        }}
      >
        <img src="../../assets/List_Container/arrow-left.png" />
      </div>
    ) : null;

    const drawerConfig = {
      open: searchFieldOpen,
      onOpenChange: this.handleSearchChange,
      className: 'sc-search-drawer',
      sidebar,
      position: 'right',
      sidebarStyle: { width: '77%', background: 'rgba(50, 50, 50, .35)' },
      overlayStyle: { backgroundColor: 'rgba(50, 50, 50, 0)' },
      style: { display: pageType == 'list' ? '' : 'none' },
    };

    const detailArrowConfig = {
      visible: detailArrow,
      displayLast: pageType == 'detail' && detailLast ? '' : 'none',
      displayNext: pageType == 'detail' && detailNext ? '' : 'none',
      height: style.height,
      onClick: type => {
        type == 'next'
          ? this.handleDetailPagination(type, detailNext)
          : this.handleDetailPagination(type, detailLast);
      },
    };

    const functionalButtonConfig = {
      visible: showButton && !searchFieldOpen && pageType == 'list',
      onAdd: type => this.handleItemEdit(this.mainValue, type),
      dataSource: this.listDatas,
      sortBy,
      power: this.power,
      onSort: datas => {
        this.listDatas = datas;

        this.setState({});
      },
    };

    return (
      <div className="List_Container" style={style}>
        {/* 触发搜索的方块 */}
        {extendDrawer}

        {/* 触发添加的图标 */}
        <FunctionalButton {...functionalButtonConfig} />

        {/* 搜索面板 */}
        <Drawer {...drawerConfig}>
          <span />
        </Drawer>

        {/* 新增/修改/详情 */}
        {/* <div
          className="sc-edit-content"
          style={
            {
              transform: `translate3d(${(currentState + 1) * 100}%, 0, 0)`,
            }
          }
          ref={ref => (this.editWrapper = ref)}
        >
          {pageType == 'detail' ? detailContent : editContent}
          <DetailArrow {...detailArrowConfig} />
        </div> */}
        <TransformManager
          currentGroup={currentGroup}
          currentOrder={currentOrder}
        >
          <Item group="list-page" order={0} key="list-page-0">
            <PullToRefresh
              direction="up"
              style={{ height: style.height, overflow: 'auto' }}
              onRefresh={this.handlePullLoad}
              refreshing={pullLoad}
            >
              <div
                className="sc-content"
                style={{
                  transform: `translate3d(${currentState * 100}%, 0, 0)`,
                  display: pageType == 'list' ? '' : 'none',
                }}
                ref={ref => (this.content = ref)}
              >
                <Template
                  template={props.children}
                  dataSource={props.dataSource}
                  loading={props.loading}
                  onDataFormat={this.handleChildDataFormat}
                  onClick={this.handleTemplateClick}
                  onLongPress={this.handleTemplatePress}
                />
              </div>
            </PullToRefresh>
          </Item>
          <Item group="detail-page" order={0} key="detail-page-0">
            {detailContent}
          </Item>
          <Item group="update-page" order={0} key="update-page-0">
            {editContent}
          </Item>
        </TransformManager>

        <Calendar
          visible={calendarVisible}
          onCancel={() => {
            this.setState({ calendarVisible: false });
          }}
          pickTime
          onConfirm={this.handleCalendarSubmit}
        />

        <MapBox url={mapBoxUrl} onClose={this.handleOnMapClose} />

        <ActivityIndicator
          animating={loading}
          text="正在加载..."
          toast
          size="large"
        />
      </div>
    );
  };
}

export default createForm()(ContainerCore);
