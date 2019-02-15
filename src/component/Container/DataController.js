import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './core';
import { ajax, isDev } from '../../util/urlHelper';

export default class DataController extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      config: [],
      dataSource: {},
      power: {
        select: false,
        delete: false,
        update: false,
        add: false,
      },
      loading: false,
    };
  }

  componentDidMount = () => {
    this.getConfig();
  };

  handlePowerStr = power => {
    let result = {};
    for (let item of Array.from(power.split(','))) {
      switch (item) {
        case 'Select':
          result.select = true;
          break;

        case 'Add':
          result.add = true;
          break;

        case 'Del':
          result.delete = true;
          break;

        case 'Update':
          result.update = true;
          break;

        default:
          break;
      }
    }
    return result;
  };

  getConfig = () => {
    this.setState({ loading: true });
    const { tcid = -1, menuid = -1 } = this.props.config;

    ajax({
      url: '../../mock/getConfig.json',
      data: { tcid, menuid },
      success: ({ data }) => {
        this.setState({
          config: data.tablefieldconfig,
          power: this.handlePowerStr(data.power),
        });
        this.search();
      },
    });
  };

  search = () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
    }
    ajax({
      url: '../../mock/search.json',
      // params: {
      //   method: 'POST',
      //   body: JSON.stringify(data),
      //   mode: 'cors',
      // },
      success: dataSource => {
        this.setState({ dataSource, loading: false });
      },
    });
  };

  render = () => {
    const { power, config, dataSource, loading } = this.state;
    return (
      <div className="DataController">
        <Container
          power={power}
          config={config}
          dataSource={dataSource}
          loading={loading}
        />
      </div>
    );
  };
}
