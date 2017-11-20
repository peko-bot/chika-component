# react-mobile-component
一系列瞎鸡巴写的移动端（html5）组件，礼包内含日历、滑动组件，不定期更新已有组件dlc
具体有啥组件进src里看看

# 脚手架是不愿透露姓名的同事写的，已征求过意见，脚手架MIT，我代发下

# react-kit

React 开发脚手架。提供react开发环境，以及模块的打包。方便开发。（后续会丰富其功能，提供更多便利操作。）

## 特性
* [react](https://github.com/facebook/react)
* [redux](https://github.com/rackt/redux)
* [nodejs](https://sfantasy.gitbooks.io/node-in-action/content/zh/)
* [es6](https://likebeta.gitbooks.io/es6tutorial/content/)
* [webpack](https://github.com/webpack/webpack)
* [babel](https://github.com/babel/babel)
* [express](https://github.com/expressjs/express)

## 需求配置
* node `^4.5.0`
* npm `^3.0.0`
* git `非必须`

## 开发环境建议
  *  node    [安装教程](http://www.runoob.com/nodejs/nodejs-install-setup.html)
  *  vscode  [安装教程](http://jingyan.baidu.com/article/0eb457e52675b503f1a90533.html)  体积小、可直接执行终端、辅助工具多、使用方便
  *  cnpm    [安装教程](https://npm.taobao.org/)  淘宝镜像，执行 `$ npm install -g cnpm --registry=https://registry.npm.taobao.org` 安装，安装完后可以使用`cnpm`代替`npm`，快速下载

## 开始

确认好你的环境配置，然后就可以开始以下步骤。

```bash
$ cd  ...                                                             # 进入文件目录
$ npm install                                                         # 根据package.json 下载插件依赖
$ npm start                                                           # 启动脚手架
```

如果一切顺利，你会看到如下:

```bash
  app:config Creating default configuration. +0ms
  app:config Looking for environment overrides for NODE_ENV "development". +14ms
  app:config Found overrides, applying to default configuration. +5ms
  app:webpack:config Creating configuration. +1s
  app:webpack:config Enable plugins for live development (HMR, NoErrors). +2ms
  app:server Enable webpack dev and HMR middleware +198ms
  app:bin:server Server is now running at http://localhost:3000. +72ms
```

另外项目可使用的指令：

|`npm run <script>`|解释|
|------------------|-----------|
|`start`|服务启动  开启3000端口。|
|`build`|将所有的模块压缩打包 （默认目录~/release）。|
|`build-dev`|将所有的模块不压缩打包 （默认目录~/release）。|
|`compile`|编译程序到dist目录下（默认目录~/dist）。|
|`dev`|与`npm start`相同, 但是启动nodemon守护进程。|


## 程序目录
```
├── bin                      # 启动脚本
├── build                    # 所有webpack配置项
├── config                   # 配置文件
├── server                   # Express 程序 (使用 webpack 中间件)
│   └── main.js              # 服务端程序入口文件
├── src                      # 程序源文件
│   ├── main.js              # 程序启动和渲染
│   ├── index.html           # 项目html界面
│   ├── assets               # 资源文件夹
│   │    ├── component       # 组件
│   │    ├── frame           # 框架脚本
│   │    │    └── tree.js    # 平台框架脚本
│   │    └── modules         # 模块组件
│   ├── data                 # 模拟数据
│   └── config               # 全局文件
│        └── urlHelp.js      # 接口地址配置
├── demo                     # 发布目录demo
├── .babelrc                 # babel配置
├── package.json             # 依赖配置
└── README.md                # 说明文档
```

## 服务端

在node环境下，基于express搭建的服务端 。启动3000端口。 

## 编辑

 * react组件开发，需熟悉react的使用
 * 使用es6语法
 * 基于 `tree.js` 全局可使用 `T` 对象进行数据请求、数据传递、事件派发、辅助类等处理操作
 * 项目启动后， 编辑代码，执行 `ctrl + s` 保存后， 项目自动重构并刷新界面

## 打包

执行`npm run build` 或 `npm run build-dev` 检索modules下的文件，每一个文件代表一个模块会打包出一个js 和一个 css 以及一个静态资源文件 asset ，以及导出文件夹`data`和`config`

## 图片

支持`png` `jpg` `jpeg` `gif` `svg` 格式类型

## 样式

支持 `.css` `.less` 类型文件

## tree.js

## 注意 

  * urlHelp.js 中配置  `./src/config` 与 `./src/data` 文件夹下的文件路径 ： `./config/...` 与 `./data/...`
  * 使用 import 引用的图片打包后会在 `./release/modules/` 下生产 `assets` 文件夹 ， 需要手动与 `./release/assets` 文件夹合并

