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
| 参数 | 说明 | 类型 | 默认值 |
| :------: | ----- | :------: | :------: |
| bind | 长按事件绑定的地方。上面的例子是绑在整块模版上，于是长按模板就能触发事件 | Boolean | true |
| format | 字段为日期时，格式化字符串 | string | YYYY-MM-DD |
| data-key | 物理字段名 | string，需要和接口中的字段对应 | 无 |
| bindKey | 如果data-key被占用了，可以把这个属性放到Container上，    ``` <Container bindKey='data-test' />``` ,于是现在绑定物理字段名的key变成data-test了 | string | 'data-key' |
| tcid | 请求配置表的id，由于接口还没写好，这个参数暂时没用 | Number | 无 |

## 已实现的控件类型
| ControlType | 说明 |
| :---: | :---: |
| 1 | 文本框 |
| 2 | 单日期选择 |
| 3 | 下拉框 |

其中1、2是引用antd-mobile里的
