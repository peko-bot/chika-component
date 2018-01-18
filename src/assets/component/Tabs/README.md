## 页签
- 过渡及点击效果
- 样式可配

## 效果
  ![img](https://github.com/zy410419243/react-mobile-component/blob/master/src/assets/component/Tabs/demo_tabs.gif)  
  
## 示例
   ``` html
   onClick = (item, currentSelect) => {
        this.setState({currentSelect});
    }

    config = {
        // containerStyle: {background: '#F96'}
    }

    render() {
        const {result,currentSelect} = this.state;

        return (
            <div className='Tabs_demo'>
                <Tabs currentSelect={currentSelect} onClick={this.onClick} config={this.config}>
                    <div label='test111111'>test1</div>
                    <div label='test2'>test2</div>
                </Tabs>
            </div>
        )
    }
    ``` 
  
## API
| 参数 | 说明 | 类型 | 默认值 |
| :------: | ----- | :------: | :------: |
| decimalcount | 浮点数保留位数 | Number | 0 |
| url | true时会用第三方接口，默认以tcid和menuid的形式请求数据 | Boolean |  false |
| bind | 长按事件绑定的地方。上面的例子是绑在整块模版上，于是长按模板就能触发事件 | Boolean | true |
| format | 字段为日期时，格式化字符串。绑定的节点得是底层，就是没子标签的那种 | string | YYYY-MM-DD |
| data-key | 物理字段名 | string，需要和接口中的字段对应 | 无 |
| unit | 单位，用在列表页 | string | 无 |
| bindKey | 如果data-key被占用了，可以把这个属性放到Container上，    ``` <Container bindKey='data-test' />``` ,于是现在绑定物理字段名的key变成data-test了 | string | 'data-key' |
| config | 配置，详见下方说明 | {} | 无 |
