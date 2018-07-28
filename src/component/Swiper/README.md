基于translate3d的滑动分页组件
=
换句话就是上拉刷新下拉加载的一组件
 
 ```JavaScript
 config：
   {
     wrapperHeight: 500, // 容器高度
     duration: 0.5, // 弹回时间，可以试试不传这个参数是啥样子的
     sensibility: 3, // 灵敏度，也就是拖动的速度
   }
  ``` 
   
 refresh:
   上拉刷新的方法，需要使用
    this.swiper.cancelRefresh()
   来取消加载中的状态
   
 load:
   下拉加载的方法，需要使用
    this.swiper.cancelLoad()
   来取消加载中的状态
   
   
  子组件异步加载，在加载完成时需要调用this.swiper.reset()重置父组件高度，不然下方加载的div会显示异常

演示效果
-
![img](./demo_swiper.gif)
