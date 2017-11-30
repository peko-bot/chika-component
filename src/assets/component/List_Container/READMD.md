## 通用列表
- 自定义模版
- 内容可编辑

## 示例
* 第一步
    * 在模板文件里写html
    ``` html
      render(){
          <div className='item' bind>
              <div>
                  <span>测试字段1：</span>
                  <span data-key='RNAME'>RNAME</span>
              </div>
              <div>
                  <span>测试字段2：</span>
                  <span data-key='REALNAME'>REALNAME</span>
              </div>
              <div>
                  <span>测试字段3：</span>
                  <span data-key='U_ADDRESS'>U_ADDRESS</span>
              </div>
              <div>
                  <span>测试字段4：</span>
                  {/* format需要写在最下层 */}
                  <span data-key='CREATETIME' format='YYYY-MM-DD'>CREATETIME</span>
              </div>
          </div>
      }
    ``` 
    
    * 效果图  
    ![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/List_Container/demo_img/first.jpg)
    
* 第二步

    觉着没问题以后再加点细节
    ``` html
       import Container from '../../component/List_Container/List_Container'
       
       render(){
          <Container tbid={1471}>
              <div className='item' bind>
                  <div>
                      <span>测试字段1：</span>
                      <span data-key='RNAME'>RNAME</span>
                  </div>
                  <div>
                      <span>测试字段2：</span>
                      <span data-key='REALNAME'>REALNAME</span>
                  </div>
                  <div>
                      <span>测试字段3：</span>
                      <span data-key='U_ADDRESS'>U_ADDRESS</span>
                  </div>
                  <div>
                      <span>测试字段4：</span>
                      {/* format需要写在最下层 */}
                      <span data-key='CREATETIME' format='YYYY-MM-DD'>CREATETIME</span>
                  </div>
              </div>
          </Container>
       }
    ```
    
    * 效果图  
    ![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/List_Container/demo_img/second.jpg)
    
## 最终效果图
  ![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/List_Container/demo_img/demo_list_container.gif)

## API
   施工中
