# Swiper

Instantly reload the content by triggering, base on translate3d

## Screenshots

![img](./demo_swiper.gif)

## Usage

```js
import React from 'react';
import { Swiper } from 'chika-component';

class Demo extends React.Component {
  state = { loading: false };

  onChange = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  render() {
    return (
      <Swiper
        wrapperHeight={500}
        duration={0.7}
        sensibility={1}
        onRefresh={this.onChange}
        onLoad={this.onChange}
        loading={loading}
      >
        <ul>
          {['test1', 'test2', 'test3'].map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </Swiper>
    );
  }
}
```

## API

### Swiper props

|     name      | description                                                                            |    type    |          default           |
| :-----------: | -------------------------------------------------------------------------------------- | :--------: | :------------------------: |
| wrapperHeight | height of content wrapper                                                              |   number   | document.body.clientHeight |
|    loading    | whether the view should be indicating an active refresh                                |  boolean   |           false            |
|  sensibility  | sensitivity when dragging, in other words, it controlls speed of content when dragging |   number   |             1              |
|   duration    | time of transform start to end interval                                                |   number   |             1              |
|   onRefresh   | event of pull down                                                                     | () => void |             -              |
|    onLoad     | event of pull up                                                                       | () => void |             -              |
