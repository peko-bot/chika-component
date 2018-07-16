## 进度条
- 颜色渐变
- 浮光滚动

## 示例

* 第一步  
在package.json的dependencies里加入``` "react-mobile-component": "git+https://github.com/zy410419243/react-mobile-component.git" ```  

    npm install  

* 第二步
    ``` html
            render = () => {
                const customImage = `linear-gradient(90deg, 
                    #feda3d 0%, 
                    #80b99e 0%, 
                    #0298ff 0%, 
                    #02ccff 39%, 
                    #01fefc 100%)`;

                return (
                    <div className='Progress_demo' style={{ background: '#ccc', height: document.documentElement.clientHeight }}>
                        <div style={{ width: '70%', float: 'left', marginRight: 15 }}>
                            <Progress percent={ 70 } height={ 20 } customImage={ customImage } innerStyle={{ background: 'rgba(255, 255, 255, 0.4)' }} active />
                        </div>
                        <span>70</span>
                    </div>
                )
            }
    ``` 
    
    * 效果图  
    ![img](./demo_img/demo.gif)

## API
| 参数 | 说明 | 类型 | 默认值 |
| :------: | ----- | :------: | :------: |
| percent | 进度条长度 | number | 50 |
| height | 进度条高度 | number 或 string | 8 |
| start | 渐变开始颜色 | string | 无 |
| end | 渐变结束颜色 | string | 无 |
| active | 是否带有浮光 | boolean | false |
| innerStyle | 容器样式，只建议改背景色，宽高这些可以在外层套一层容器 | {} | 无 |
| customImage | 自定义background-image。和start-end二选一，优先start-end | string | '' |