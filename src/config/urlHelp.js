define([], function () {
  var urlHelp = {
    isReal: false,
    real: {

    },
    simulation: {
      tableconfig: './data/tableconfig.json',
      tableDatas: './data/tableDatas.json',
      newTabDatas: './data/newTabDatas.json',
      builder_search: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPType=Search',
      getConfig: './data/getConfig.json',
      search: './data/search.json',
      calendar_demo: './data/calendar_demo.json',
      secRecordPath: './data/s_problem_record_hy.json'
    }
  }
  return urlHelp
});