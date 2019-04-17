# MapBox

[English](./README.md) | 简体中文

Leaflet 的封装

## 示例

https://zy410419243.github.io/chika-component/#/mapbox

<img src="./demo_img/screenshot.png" />

## 用法

```js
import React from 'react';
import { MapBox } from 'chika-component';

export default () => (
  <MapBox onMarkerMove={({ lat, lng }) => console.log(lat, lng)} />
);
```

## API

### MapBox props

|       name        | description                                |                 type                 |    default    |
| :---------------: | ------------------------------------------ | :----------------------------------: | :-----------: |
|       type        | 图源类型, 详细的可以看看 [这里](#TileType) |        [TileType](#TileType)         | gdTrafficTile |
|   markerVisible   | marker 是否显示                            |               boolean                |     true      |
|  markerDraggable  | marker 能否被拖拽                          |               boolean                |     true      |
|    onMoveStart    |                                            | ({lng: string; lat: string}) => void |               |
|      onMove       |                                            | ({lng: string; lat: string}) => void |               |
|     onMoveEnd     |                                            | ({lng: string; lat: string}) => void |               |
|    onDragStart    |                                            | ({lng: string; lat: string}) => void |               |
|      onDrag       |                                            | ({lng: string; lat: string}) => void |               |
|     onDragEnd     |                                            | ({lng: string; lat: string}) => void |               |
| onMarkerMoveStart |                                            | ({lng: string; lat: string}) => void |               |
|   onMarkerMove    |                                            | ({lng: string; lat: string}) => void |               |
|  onMarkerMoveEnd  |                                            | ({lng: string; lat: string}) => void |               |
| onMarkerDragStart |                                            | ({lng: string; lat: string}) => void |               |
|   onMarkerDrag    |                                            | ({lng: string; lat: string}) => void |               |
|  onMarkerDragEnd  |                                            | ({lng: string; lat: string}) => void |               |

### TileType

```tsx
enum TileType {
  'gdTrafficTile',
  'gdSatelliteTile',
  'googleTile',
  'googleRsTile',
  'googleTrafficTile',
}
```
