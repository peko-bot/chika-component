define([], function () {
  var urlHelp = {
    isReal: false,
    real: {
      search: 'http://222.185.24.19:9002/webapi/api/v2/generalbackstage/getdata',
      getConfig: 'http://222.185.24.19:9002/webapi/api/v2/generalbackstage/getconfig',
      getUrlData: 'http://222.185.24.19:9002/webapi/api/v2/generalbackstage/getinterfacedata', // 第三方接口地址，为了放置跨域问题，后端先处理下
      generalbackstage: 'http://222.185.24.19:9002/webapi/api/v2/generalbackstage/operatedata', // 增删改
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
      getUrlData: './data/tableconfig.json', // 第三方接口地址，为了防止跨域问题，后端先处理下
      generalbackstage: './data/tableconfig.json', // 增删改
    }
  }
  return urlHelp
});