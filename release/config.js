(function () {
    var MOUNT_NODE = document.getElementById('root')
    T.require(['./config/urlHelp'], function (urlHelp) {
        window.urlHelp  = urlHelp;
        var inject = function (conf) {
            var basePath = (urlHelp.isReal)
                ? urlHelp.real[conf.key]
                : urlHelp.simulation[conf.key];
            var theRequest = new Object();
            if (basePath.indexOf("?") !== -1) {
                var str = basePath.substr(basePath.indexOf("?") + 1);
                var strs = str.split("&");
                if(conf.method != 'GET'){
                    var param = '';
                    for(var i = 0;i < strs.length;i++){
                        var key = strs[i].split('=')[0];
                        var value = strs[i].split('=')[1];
                        if(key == 'key'){
                            continue;
                        }
                        theRequest[key] = value;
                    }
                    theRequest = (urlHelp.isReal)
                        ? Object.assign({}, theRequest, conf.data)
                        : Object.assign({}, conf.data, theRequest);
                    conf.data = theRequest;
                }else{
                    var param = '';
                    basePath = basePath.substring(0,basePath.indexOf("?"));
                    for(var key in conf.data){
                        strs.push(key + '=' + conf.data[key]);
                    }
                    for(var i = 0; i < strs.length; i++){
                        var key = strs[i].split('=')[0];
                        var value = strs[i].split('=')[1];
                        if(i == 0){
                            param += '?' + key + '=' + value;
                        }else{
                            param += '&' + key + '=' + value;
                        }
                    }
                    basePath += param;
                    conf.data = null;
                }
            }
            conf.url = basePath;
        }
        T.config({
            mount: MOUNT_NODE, //挂载
            data: {
                leaf: {
                    deps: [
                        'react', 'react-dom'
                    ],
                    paths: {
                        Swiper_demo: {
                            mount: 'Swiper_demo',
                            deps: ['Swiper_demo', 'css!./style/Swiper_demo']
                        },
                        List_Container_demo: {
                            mount: 'List_Container_demo',
                            deps: ['List_Container_demo', 'css!./style/List_Container_demo']
                        }
                    }
                }
            },
            router: {
                go: '/List_Container_demo', //默认路由（当剝路由为空时跳转）
                route: {
                    path: '/',
                    once: onTestLayout,
                    children: [
                        {
                            path: '/Swiper_demo', leaf: ['Swiper_demo']
                        },
                        {
                            path: '/List_Container_demo', leaf: ['List_Container_demo']
                        }
                    ]
                }
            },
            ajax: {
                inject: inject
            },
            req: {
                baseUrl: './',
                packages: [],
                map: {
                    '*': {
                        'css': 'plugins/css.min'
                    }
                },
                paths: {
                    "Swiper_demo": 'modules/Swiper_demo',
                    'List_Container_demo': 'modules/List_Container_demo',
                    "react": 'plugins/react.min',
                    "react-dom": 'plugins/react-dom.min'
                },
                shim: {}
            }

        })
    })

    function onTestLayout(data) {}
})()
