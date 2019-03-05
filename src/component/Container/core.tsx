import React from 'react';
import {
  Modal,
  List,
  Button,
  ActivityIndicator,
  // PullToRefresh,
} from 'antd-mobile';
const { alert, operation } = Modal;
import Template from './Template';
import TransformManager, {
  TransformManagerItem as Item,
} from '../TransformManager';
import DetailFactory from './DetailFactory';
import MapBox from './MapBox';
import './css/Container-core.css';
import { format as fnsFormat } from 'date-fns/esm';
import { zhCN } from 'date-fns/locale';

function noop() {}

export interface ContainerCoreProps {
  power: any;
  config: Array<any>;
  dataSource: Array<any>;
  total?: number;
  loading?: boolean;
  primaryKey?: string;
  onDelete?: (primaryValue: string | number) => void;
  formatControls: (item: any, config: any) => void;
  onMapPickerChange?: (item: any) => void;
}
export interface ContainerCoreState {
  currentOrder: number | string;
  currentGroup: string;
  lng: number | string;
  lat: number | string;
  address: string;
  primaryValue: string | number;
  currentState: number;
}

export default class ContainerCore extends React.Component<
  ContainerCoreProps,
  ContainerCoreState
> {
  content: any;
  state: ContainerCoreState = {
    currentOrder: 0,
    currentGroup: 'list-page',
    // for mapPicker
    lng: -1,
    lat: -1,
    address: '',
    primaryValue: '',
    currentState: 0,
  };

  history: { group: string; order: string | number } = {
    group: '',
    order: '',
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

  backToLast = (item: any) => {
    const { group, order } = this.history;
    if (this.props.onMapPickerChange) {
      this.props.onMapPickerChange(item);
    }
    this.setState({ currentGroup: group, currentOrder: order });
  };

  handleDelete = (primaryValue: string | number) => {
    alert('长痛不如短痛，删tm的', '真删了啊？', [
      { text: '容朕三思' },
      {
        text: '真的',
        onPress: () => {
          if (this.props.onDelete) {
            this.props.onDelete(primaryValue);
          }
        },
      },
    ]);
  };

  // 滑动加载
  handlePullLoad = () => {};

  handleTemplateClick = ({
    templateOrder,
  }: {
    templateOrder: string | number;
    childProps?: any;
    event?: any;
  }) => {
    this.setState({ currentOrder: templateOrder, currentGroup: 'detail-page' });
  };

  // show Modal for operation
  handleTemplatePress = (dataItem: any) => {
    const { primaryKey, power } = this.props;
    const { add, delete: del, update, select } = power;
    const primaryValue = dataItem[primaryKey || ''];
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

  handleChildDataFormat = (value: any, childProps: any) => {
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

  renderDetailPage = (dataSource: Array<any>) => {
    const { config, formatControls } = this.props;
    let result: Array<any> = [];
    dataSource.map((item, i) => {
      const dataItem = formatControls(item, config);
      result.push(
        <Item group="detail-page" order={i} key={`detail-page-${i}`}>
          <DetailFactory
            onBack={this.backToList}
            onPageChange={this.onDetailPageChange}
            dataItem={dataItem as any}
            onDataFormat={this.handleChildDataFormat}
            goToMapBox={this.handleGoToMapBox}
          />
        </Item>,
      );
    });
    return result;
  };

  handleGoToMapBox = ({
    lat,
    lng,
    address,
    primaryValue,
  }: {
    lat: number | string;
    lng: number | string;
    address: string;
    primaryValue: string;
  }) => {
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
        {/* {[].map((item, i) =>
          this.handleControlType(item, 'edit', undefined, i),
        )} */}
        <List.Item>
          <Button
            type="primary"
            // onClick={this.save}
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
            {/* <PullToRefresh
              direction="up"
              style={{ height: style.height, overflow: 'auto' }}
              onRefresh={this.handlePullLoad}
              refreshing={pullLoad}
            > */}
            <div
              className="sc-content"
              style={{
                transform: `translate3d(${currentState * 100}%, 0, 0)`,
                // display: pageType == 'list' ? '' : 'none',
              }}
              ref={(ref: any) => (this.content = ref)}
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
            {/* </PullToRefresh> */}
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
