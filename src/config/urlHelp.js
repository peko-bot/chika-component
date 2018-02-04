define([], function () {
  var urlHelp = {
    isReal: false,
    real: {
      search: 'http://47.95.1.229:8500/webapi/api/v2/generalbackstage/getdata',
      getConfig: 'http://47.95.1.229:8500/webapi/api/v2/generalbackstage/getconfig',
    },
    simulation: {
      tableconfig: './data/tableconfig.json',
      tableDatas: './data/tableDatas.json',
      newTabDatas: './data/newTabDatas.json',
      builder_search: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPType=Search',
      getConfig: './data/getConfig.json',
      search: './data/search.json',
      calendar_demo: './data/calendar_demo.json',
      secRecordPath: './data/s_problem_record_hy.json',
      getUrlData: './data/tableconfig.json', // 第三方接口地址，为了放置跨域问题，后端先处理下
      generalbackstage: './data/tableconfig.json', // 增删改
    }
  }
  return urlHelp
});