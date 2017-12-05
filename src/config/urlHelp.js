define([], function () {
  var urlHelp = {
    isReal: false,
    real: {
      search: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPType=Search',
      getConfig: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPtype=GetConfig&UseType=DataList&DataType=1,3',
      detail: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPtype=GetConfig&DataType=1,3,4',
    },
    simulation: {
      tableconfig: './data/tableconfig.json',
      tableDatas: './data/tableDatas.json',
      newTabDatas: './data/newTabDatas.json',
      builder_search: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPType=Search',
      getConfig: './data/getConfig_new.json',
      search: './data/search_new.json',
      calendar_demo: './data/calendar_demo.json',
      secRecordPath: './data/s_problem_record_hy.json'
    }
  }
  return urlHelp
});