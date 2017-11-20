(function(){
    var MOUNT_NODE = document.getElementById('root')
    T.require(['./config/urlHelp'],function(urlHelp){
        var inject = function (conf) {
            if(!conf.key){
                return;
            }
            var basePath = (urlHelp.isReal) ? urlHelp.real[conf.key] : urlHelp.simulation[conf.key];
            if(conf.method == 'POST') {
                conf.url = basePath;
            }else{
                var theRequest = new Object();  
                if (basePath.indexOf("?") !== -1) {   
                    var str = basePath.substr(basePath.indexOf("?") + 1);   
                    var strs = str.split("&");   
                    for(var i = 0; i < strs.length; i ++) {   
                        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];   
                    }
                    basePath = basePath.substring(0,basePath.indexOf("?"));
                }
                theRequest = (urlHelp.isReal) ? Object.assign({},theRequest,conf.data) : Object.assign({},conf.data,theRequest);
                conf.data = theRequest;
                conf.url = basePath;
            }
        }
        T.config({
            mount: MOUNT_NODE,  //挂载
            data: {
                leaf: {
                    deps: [
                        'react',
                        'react-dom'
                    ],
                    paths: {
                        "testlayout": {
                            mount: 'a.testlayout',
                            deps: ['testlayout','css!./style/TestLayout']
                        },
                        hello:{ 
                            mount: 'b.hello',
                            deps: ['hello','css!./style/Hello']
                        }
                    }
                }
            },
            router: {
                go: '/a',//默认路由（当前路由为空时跳转）
                route: {
                    path: '/', once :onTestLayout ,  children: [
                        {
                            path: '/a', leaf:['testlayout'], suspend:['hello']
                        },
                        {
                            path: '/b', leaf:['hello'], suspend:['testlayout']
                        }
                    ]
                }
            },  
            ajax: {
                inject : inject
            },
            req: {
                baseUrl: './',
                packages:[
                    
                ],
                map: {
                    '*': {
                        'css': 'plugins/css.min'
                    }
                },
                paths: {
                    "hello": 'modules/Hello',
                    "testlayout": 'modules/TestLayout',
                    "react": 'plugins/react.min',
                    "react-dom": 'plugins/react-dom.min'
                },
                shim: {
                }
            }

        }) 
    })
   
    function onTestLayout(data){

    }
})()
