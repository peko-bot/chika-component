define([], function() {
    var urlHelp = {
      'isReal':false,
      'real':{

      },
      'simulation':{
        "secRecordPath": './data/s_problem_record_hy.json',
        tableconfig: './data/tableconfig.json',
        tableDatas: './data/tableDatas.json',
        newTabDatas: './data/newTabDatas.json',
        builder_search: '../../CommonReport/AjaxHandler/BuilderHandler.ashx?OPType=Search',
        getConfig: './data/getConfig.json',
        search: './data/search.json',
      }
    }
    return urlHelp
});