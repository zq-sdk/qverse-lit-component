# lit-switch-view · API

## 组件一览

| 标签名 | 说明 |
|--------|------|
| `lit-switch-dollhouse-view` | 切换到 3D（`dollhouse`） |
| `lit-switch-floorplan-view` | 切换到平面（`floorplan`） |
| `lit-switch-panorama-view` | 切换到全景（`panorama`） |

## 属性

| 属性 | 适用组件 | 类型 | 说明 |
|------|----------|------|------|
| `qspace` | 全部 | `any` | SDK 实例；传入后监听事件并调用视图切换 API |
| `enabled` | 全部 | `boolean` | 是否可点击；由组件根据 `view.mode` 自动同步，宿主亦可覆盖 |
| `option` | 全景 | `PanoramaSwitchOption` | 全景目标参数，见下表 |

### option 字段（仅全景）

```ts
type PanoramaSwitchOption = {
  locationId?: string
  quaternion?: { x: number; y: number; z: number; w: number }
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `locationId` | `string` | 目标全景点位 ID |
| `quaternion` | `{ x, y, z, w }` | 切换后的全景朝向 |

## 事件

| 事件名 | `detail` | 说明 |
|--------|----------|------|
| `lit-click` | `{ view: 'dollhouse' \| 'floorplan' \| 'panorama', originalEvent? }` | 用户点击且当前可点 |
| `lit-switch-complete` | 同上 | SDK 视图切换完成后派发 |

## 代码示例

### 基础用法（3D / 平面 / 全景）

```html
<lit-switch-dollhouse-view
  :qspace="qspaceInstance"
  @lit-click="onSwitchDollhouseViewClick"
  @lit-switch-complete="onSwitchDollhouseViewComplete"
/>
<lit-switch-floorplan-view
  :qspace="qspaceInstance"
  @lit-click="onSwitchFloorplanViewClick"
  @lit-switch-complete="onSwitchFloorplanViewComplete"
/>
<lit-switch-panorama-view
  :qspace="qspaceInstance"
  :option="panoramaOption"
  @lit-click="onSwitchPanoramaViewClick"
  @lit-switch-complete="onSwitchPanoramaViewComplete"
/>
```

### 全景 option

```ts
const panoramaOption = ref({
  locationId: 'location_10',
  quaternion: { x: -0.0009, y: -0.716, z: -0.0009, w: 0.698 },
})
```

### 事件监听

```ts
function onSwitchDollhouseViewClick(e: CustomEvent) {
  console.log('lit-click', e.detail)
}

function onSwitchDollhouseViewComplete(e: CustomEvent) {
  console.log('lit-switch-complete', e.detail)
}
```
