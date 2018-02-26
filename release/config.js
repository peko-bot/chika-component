var urlHelp = {
    'isReal': false,
    'real': {
        search: '../../webapi/api/v2/generalbackstage/getdata',
        getConfig: '../../webapi/api/v2/generalbackstage/getconfig',
        getUrlData: './data/tableconfig.json', // 第三方接口地址，为了放置跨域问题，后端先处理下
        generalbackstage: '../../webapi/api/v2/generalbackstage/operatedata', // 增删改
    },
    'simulation': {
        search: 'http://192.168.118.226:7014/webapi/api/v2/generalbackstage/getdata',
        getConfig: 'http://192.168.118.226:7014/webapi/api/v2/generalbackstage/getconfig',
        getUrlData: 'http://192.168.118.226:7014/webapi/api/v2/generalbackstage/getinterfacedata', // 第三方接口地址，为了放置跨域问题，后端先处理下
        generalbackstage: 'http://192.168.118.226:7014/webapi/api/v2/generalbackstage/operatedata', // 增删改
    }
}

T(function () {
    window.urlHelp = urlHelp;
    var inject = function (conf) {
        var basePath = (urlHelp.isReal)
            ? urlHelp.real[conf.key]
            : urlHelp.simulation[conf.key];
        var theRequest = new Object();
        if (basePath.indexOf("?") !== -1) {
            var str = basePath.substr(basePath.indexOf("?") + 1);
            var strs = str.split("&");

            var param = '';
            if (conf.method != 'GET') {
                for (var i = 0; i < strs.length; i++) {
                    var key = strs[i].split('=')[0];
                    var value = strs[i].split('=')[1];
                    if (key == 'key') {
                        continue;
                    }
                    theRequest[key] = value;
                }
                theRequest = (urlHelp.isReal)
                    ? Object.assign({}, theRequest, conf.data)
                    : Object.assign({}, conf.data, theRequest);
                conf.data = theRequest;
            } else {
                basePath = basePath.substring(0, basePath.indexOf("?"));
                for (var key in conf.data) {
                    strs.push(key + '=' + conf.data[key]);
                }
                for (var i = 0; i < strs.length; i++) {
                    var key = strs[i].split('=')[0];
                    var value = strs[i].split('=')[1];
                    if (i == 0) {
                        param += '?' + key + '=' + value;
                    } else {
                        param += '&' + key + '=' + value;
                    }
                }
                basePath += param;
                conf.data = null;
            }
        }
        theRequest = (urlHelp.isReal)
            ? Object.assign({}, theRequest, conf.data)
            : Object.assign({}, conf.data, theRequest);
        conf.data = theRequest;
        conf.url = basePath;
    }

    T.config({
        mount: document.body, // MOUNT_NODE, //挂载
        data: {
            leaf: {
                deps: [
                    'polyfill', 'react', 'react-dom'
                ],
                paths: {
                    List_Container_demo: {
                        mount: 'List_Container_demo', deps: ['List_Container_demo', 'css!./style/List_Container_demo']
                    }
                }
            }
        },
        router: {
            go: '/List_Container_demo', //默认路由（当剝路由为空时跳转）
            route: {
                path: '/',
                children: [
                    {
                        path: '/List_Container_demo', leaf: ['List_Container_demo']
                    }
                ]
            }
        },
        ajax: {
            inject: inject,
        },
        req: {
            // baseUrl: './',
            baseUrl: T.Sys.jsURL(), //'tree',
            packages: [],
            map: {
                '*': {
                    'css': 'plugins/css.min'
                }
            },
            waitSeconds: 0,
            paths: {
                'List_Container_demo': 'modules/List_Container_demo',
                "react": 'plugins/react.min',
                "react-dom": 'plugins/react-dom.min',
                "polyfill": 'plugins/polyfill.min'
            }
        }
    })
})