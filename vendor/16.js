(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{263:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return E});var r=n(48),o=n.n(r),a=n(13),i=n.n(a),s=n(9),l=n.n(s),c=n(19),d=n.n(c),h=n(10),p=n.n(h),u=n(11),f=n.n(u),g=n(12),m=n.n(g),x=n(0),y=n.n(x),v=(n(264),n(6)),S=n.n(v),w="./assets/down.png",T="./assets/loading.gif",E=function(e){function t(){var e;return l()(this,t),(e=p()(this,f()(t).apply(this,arguments))).startY=0,e.endY=0,e.scrollerHeight=1e4,e.bottomHeight=0,e.state={distance:0,iconDeg:0,refreshEnd:!1,loadEnd:!1,refreshText:"下拉刷新",refreshImg:w,loadText:"加载更多",loadImg:w,status:"loaded",type:"load"},e.getChildHeight=function(){var t=e.props.wrapperHeight,n=e.scroller.scrollHeight;e.bottomHeight=n-t+44,e.scrollerHeight=n},e.handleTouchStart=function(t){e.startY=t.touches[0].pageY,e.setState({refreshEnd:!1,loadEnd:!1})},e.handleTouchMove=function(t){var n=e.props.sensibility,r=void 0===n?1:n;t.preventDefault();var o,a=(t.touches[0].pageY-e.startY)/r+e.endY;o=a>44?180:a>=0&&a<=44?a/44*180:180,e.setState({distance:a,iconDeg:o})},e.handleTouchEnd=function(){var t=e.props,n=t.onRefresh,r=t.onLoad,o=e.state.distance;if(o>44)n&&(e.setState({refreshImg:T,refreshText:"刷新中...",distance:44,status:"loading",type:"refresh"}),n());else if(o>0&&o<=44)e.setState({distance:0});else if(o<0){var a=e.scroller,i=a.offsetHeight,s=a.scrollHeight-i;Math.abs(o)>s?(e.endY=-s,r?(e.setState({loadText:"加载中...",loadImg:T,distance:-e.bottomHeight,status:"loading",type:"load"}),r()):e.setState({distance:-s})):e.endY=o}e.setState({refreshEnd:!0,loadEnd:!0})},e.generateStyle=function(){var t=e.props,n=t.wrapperHeight,r=t.duration,o=void 0===r?1:r,a=e.state,s=a.distance,l=a.refreshEnd,c=a.loadEnd,d=document.documentElement.clientHeight||document.body.clientHeight,h={},p={},u="translate3d(0px, ".concat(s,"px, 0)"),f="all ".concat(o,"s ease");return h.transform=u,l&&(h.transition=f),p.transform=u,c&&(p.transition=f),{wrapperStyle:i()({},h,{height:n||d}),loadStyle:p,refreshStyle:h}},e.renderSpinner=function(e){var t,n=e.type,r=e.isFinished,a=e.relatedStyle,i=e.iconUrl,s=e.iconDeg,l=e.relatedText;return y.a.createElement("div",{className:S()((t={},o()(t,n,!0),o()(t,"".concat(n,"-end"),r),t)),style:a},y.a.createElement("span",{className:"".concat(n,"-icon"),style:{transform:"rotateZ(".concat(s,"deg)")}},y.a.createElement("img",{src:i})),y.a.createElement("span",{className:"".concat(n,"-text")},l))},e}return m()(t,e),d()(t,[{key:"componentDidUpdate",value:function(e,t){var n=this;e.loading&&!this.props.loading&&"loading"===t.status&&("refresh"===this.state.type?this.setState({status:"loaded",refreshImg:"./assets/complete.png",refreshText:"刷新成功",iconDeg:0},function(){setTimeout(function(){n.getChildHeight(),n.setState({refreshImg:w,distance:0,refreshText:"下拉刷新"})},1e3)}):"load"===this.state.type&&this.setState({status:"loaded",loadImg:"./assets/complete.png",loadText:"加载完成",iconDeg:0},function(){setTimeout(function(){n.getChildHeight(),n.setState({loadImg:w,loadText:"加载更多",distance:n.endY})},1e3)}))}},{key:"render",value:function(){var e=this,t=this.props,n=t.onRefresh,r=t.onLoad,o=t.children,a=this.state,i=a.iconDeg,s=a.refreshEnd,l=a.refreshText,c=a.refreshImg,d=a.loadEnd,h=a.loadText,p=a.loadImg,u=this.generateStyle(),f=u.refreshStyle,g=u.wrapperStyle,m=u.loadStyle;return y.a.createElement("div",{className:"Swiper"},y.a.createElement("div",{className:"wrapper",onTouchStart:this.handleTouchStart,onTouchMove:this.handleTouchMove,onTouchEnd:this.handleTouchEnd},y.a.createElement("div",{style:g,ref:function(t){return t&&(e.scroller=t)}},o),n&&this.renderSpinner({type:"refresh",isFinished:s,relatedStyle:f,iconUrl:c,iconDeg:i,relatedText:l}),r&&this.renderSpinner({type:"load",isFinished:d,relatedStyle:m,iconUrl:p,iconDeg:i,relatedText:h})))}}]),t}(y.a.Component)},264:function(e,t,n){var r=n(265);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(15)(r,o);r.locals&&(e.exports=r.locals)},265:function(e,t,n){(e.exports=n(14)(!1)).push([e.i,".Swiper {\r\n  will-change: transform;\r\n}\r\n\r\n.Swiper .refresh {\r\n  position: absolute;\r\n  top: -44px;\r\n  width: 100%;\r\n  height: 44px;\r\n  line-height: 44px;\r\n  font-size: 16px;\r\n  text-align: center;\r\n  transform: (0px 0px) translateZ(0px) scale(1);\r\n}\r\n\r\n.Swiper .refresh .refresh-icon {\r\n  display: inline-block;\r\n  width: 24px;\r\n  height: 24px;\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 25%;\r\n}\r\n\r\n.Swiper .refresh .refresh-icon img {\r\n  width: 24px;\r\n  height: 24px;\r\n  display: block;\r\n}\r\n\r\n\r\n/***************上方刷新样式，下方加载样式*****************/\r\n\r\n.Swiper .load {\r\n  position: absolute;\r\n  bottom: -44px;\r\n  width: 100%;\r\n  height: 44px;\r\n  line-height: 44px;\r\n  font-size: 16px;\r\n  text-align: center;\r\n  z-index: 10;\r\n  /* transform: (0px 0px) translateZ(0px) scale(1); */\r\n}\r\n\r\n.Swiper .load .load-icon {\r\n  display: inline-block;\r\n  width: 24px;\r\n  height: 24px;\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 25%;\r\n}\r\n\r\n.Swiper .load .load-icon img {\r\n  width: 24px;\r\n  height: 24px;\r\n  display: block;\r\n}\r\n\r\n\r\n/************************************************/\r\n\r\n.Swiper .wrapper {\r\n  position: relative;\r\n  overflow: hidden;\r\n}\r\n",""])},284:function(e,t,n){var r=n(285);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n(15)(r,o);r.locals&&(e.exports=r.locals)},285:function(e,t,n){(e.exports=n(14)(!1)).push([e.i,".Swiper_demo li {\r\n    list-style-type: none;\r\n    height: 50px;\r\n}",""])},289:function(e,t,n){"use strict";n.r(t),n.d(t,"default",function(){return x});var r=n(9),o=n.n(r),a=n(19),i=n.n(a),s=n(10),l=n.n(s),c=n(11),d=n.n(c),h=n(12),p=n.n(h),u=n(0),f=n.n(u),g=n(263),m=(n(284),n(76)),x=function(e){function t(){var e;return o()(this,t),(e=l()(this,d()(t).apply(this,arguments))).state={datas:[],loading:!1},e.dataSource=[],e.componentDidMount=function(){e.setState({loading:!0}),Object(m.a)({url:"./assets/swiper.json",success:function(t){return e.setState({datas:t,loading:!1})}})},e.onChange=function(){e.setState({loading:!0}),setTimeout(function(){e.setState({loading:!1})},1e3)},e}return p()(t,e),i()(t,[{key:"render",value:function(){var e=this.state.loading;return f.a.createElement("div",{className:"Swiper_demo"},f.a.createElement(g.default,{wrapperHeight:2950,duration:.7,sensibility:1,onRefresh:this.onChange,onLoad:this.onChange,loading:e},f.a.createElement("ul",null,this.state.datas.map(function(e,t){return f.a.createElement("li",{key:t},e)}))))}}]),t}(f.a.Component)},76:function(e,t,n){"use strict";var r=n(13),o=n.n(r),a=n(138),i={upload:"../../../SysManage/AjaxHandler/UploadHandler.ashx"};n.d(t,"a",function(){return c});var s=["json","html","text"],l=["GET","POST","PUT","DELETE"],c=function(e){var t,n,r=e.url,s=e.key,l=e.method,c=void 0===l?"GET":l,u=e.data,g=e.type,m=void 0===g?"json":g,x=e.success,y=e.params,v=e.fix,S=void 0===v?"&":v,w=e.isProxy,T=void 0!==w&&w,E=e.error,b={};h(m),d(c),t=f(s,i,null,T)||r,n=p(t,u,S),"GET"!=c&&(b={body:JSON.stringify(u),method:c,headers:{"Content-Type":"application/json"}}),b=o()({},b,y),Object(a.a)(t+n,b).then(function(e){return e[m]()}).then(function(e){return x&&x(e)}).catch(function(e){return E&&E(e)})},d=function(e){return e?(e=e.toUpperCase(),l.includes(e)?e:(console.error("fetch method error."),!1)):(console.error("fetch method is undefined."),!1)},h=function(e){return e?(e=e.toLowerCase(),s.includes(e)?e:(console.error("fetch type error."),!1)):(console.error("fetch type is undefined."),!1)},p=function(e,t,n){if(!e||!t)return"";var r=e.includes("?")?n:"?",o=u(t,n);return o?r+o:o},u=function(e,t){if(!e||0==Object.keys(e).length||e instanceof Array)return"";if("string"==typeof e)return e;for(var n="",r=0,o=Object.keys(e);r<o.length;r++){var a=o[r];n+="".concat(a,"=").concat(e[a]).concat(t)}return n=n.substr(0,n.length-("&"==t?1:3))},f=function(e,t,n,r){var o;for(var a in t)if(e==a){o=t[a];break}return!!o&&(n&&r&&(o=n+o),o)}}}]);