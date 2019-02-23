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
import DetailFactory from './DetailFactory';
import MapBox from './MapBox';
import DetailArrow from './DetailArrow';
import FunctionalButton from './FunctionalButton';
import { bindTouchDirection } from '../../util/Touch';
import './css/Container-core.css';
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
    formatControls: PropTypes.func,
    onMapPickerChange: PropTypes.func,
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
    formatControls: noop,
    onMapPickerChange: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentOrder: 0,
      currentGroup: 'list-page',
      // for mapPicker
      lng: -1,
      lat: -1,
      address: '',
      primaryValue: '',
    };

    this.history = {
      group: '',
      order: '',
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
  };

  backToList = () => {
    this.setState({ currentGroup: 'list-page', currentOrder: 0 });
  };

  backToLast = item => {
    const { group, order } = this.history;
    this.props.onMapPickerChange(item);
    this.setState({ currentGroup: group, currentOrder: order });
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

  handleTemplateClick = ({ templateOrder }) => {
    this.setState({ currentOrder: templateOrder, currentGroup: 'detail-page' });
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
        onPress: () =>
          this.setState({ currentGroup: 'update-page', currentOrder: 0 }),
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

  handleChildDataFormat = (value, childProps) => {
    const { dateFormat, decimalCount, unit } = childProps;

    if (dateFormat) {
      return fnsFormat(new Date(value), dateFormat, {
        locale: zhCN,
      });
    }
    if (decimalCount) {
      value = +parseFloat(value.toFixed(decimalCount)).toPrecision(12);
    }
    if (unit) {
      value = `${value} ${unit}`;
    }
    return value;
  };

  onDetailPageChange = () => {};

  renderDetailPage = dataSource => {
    const { config, formatControls } = this.props;
    let result = [];
    dataSource.map((item, i) => {
      const dataItem = formatControls(item, config);
      result.push(
        <Item group="detail-page" order={i} key={`detail-page-${i}`}>
          <DetailFactory
            onBack={this.backToList}
            onPageChange={this.onDetailPageChange}
            dataItem={dataItem}
            onDataFormat={this.handleChildDataFormat}
            goToMapBox={this.handleGoToMapBox}
          />
        </Item>,
      );
    });
    return result;
  };

  handleGoToMapBox = ({ lat, lng, address, primaryValue }) => {
    const { currentGroup, currentOrder } = this.state;
    // record position, for going back
    this.history = {
      group: currentGroup,
      order: currentOrder,
    };

    this.setState({
      currentGroup: 'map-box',
      currentOrder: 0,
      lat,
      lng,
      address,
      primaryValue,
    });
  };

  render = () => {
    const { state, props } = this;
    const {
      currentState,
      currentOrder,
      currentGroup,
      lat,
      lng,
      address,
      primaryValue,
    } = state;
    // let sidebar = (
    //   <List>
    //     <List.Item>
    //       <Button onClick={this.handleSearch} loading={props.loading}>
    //         确定
    //       </Button>
    //     </List.Item>
    //     {config.map((item, i) =>
    //       this.handleControlType(item, 'search', undefined, i),
    //     )}
    //   </List>
    // );

    /* 新增/修改都是这个 */
    let editContent = (
      <List>
        {[].map((item, i) =>
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

    /* 触发搜索的方块 */
    // let extendDrawer = (
    //   <div
    //     className="sc-extend-drawer sc-right"
    //     onClick={this.handleSearchChange}
    //     style={{
    //       top: (document.body.clientHeight - 100) / 2,
    //     }}
    //   >
    //     <img src="../../assets/List_Container/arrow-left.png" />
    //   </div>
    // );

    // const drawerConfig = {
    //   open: false,
    //   onOpenChange: this.handleSearchChange,
    //   className: 'sc-search-drawer',
    //   sidebar,
    //   position: 'right',
    //   sidebarStyle: { width: '77%', background: 'rgba(50, 50, 50, .35)' },
    //   overlayStyle: { backgroundColor: 'rgba(50, 50, 50, 0)' },
    //   style: { display: pageType == 'list' ? '' : 'none' },
    // };

    // const functionalButtonConfig = {
    //   visible: showButton && pageType == 'list',
    //   onAdd: type => this.handleItemEdit(this.mainValue, type),
    //   dataSource: this.listDatas,
    //   sortBy,
    //   power: this.power,
    //   onSort: datas => {
    //     this.listDatas = datas;

    //     this.setState({});
    //   },
    // };

    return (
      <div className="Container-core">
        {/* 触发搜索的方块 */}
        {/* {extendDrawer} */}

        {/* 触发添加的图标 */}
        {/* <FunctionalButton {...functionalButtonConfig} /> */}

        {/* 搜索面板 */}
        {/* <Drawer {...drawerConfig}>
          <span />
        </Drawer> */}

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
              // style={{ height: style.height, overflow: 'auto' }}
              onRefresh={this.handlePullLoad}
              // refreshing={pullLoad}
            >
              <div
                className="sc-content"
                style={{
                  transform: `translate3d(${currentState * 100}%, 0, 0)`,
                  // display: pageType == 'list' ? '' : 'none',
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
          {this.renderDetailPage(props.dataSource)}
          <Item group="update-page" order={0} key="update-page-0">
            {editContent}
          </Item>
          <Item group="map-box" order={0} key="map-box-0">
            <MapBox
              onBack={this.backToLast}
              lat={lat}
              lng={lng}
              address={address}
              primaryValue={primaryValue}
            />
          </Item>
        </TransformManager>

        {/* <Calendar
          visible={calendarVisible}
          onCancel={() => {
            this.setState({ calendarVisible: false });
          }}
          pickTime
          onConfirm={this.handleCalendarSubmit}
        /> */}

        <ActivityIndicator
          animating={props.loading}
          text="正在加载..."
          toast
          size="large"
        />
      </div>
    );
  };
}

export default ContainerCore;
