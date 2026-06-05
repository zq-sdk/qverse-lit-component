# lit-switch-floor · API

## 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `qspace` | `any` | 可选。传入后组件监听 SDK 事件并按 `view.mode` 调用楼层 API；不传则仅派发事件 |
| `option` | `FloorSwitchOption` | 楼层配置，见下表 |
| `enabled` | `boolean` | 是否可点击；视图过渡、点位切换进行中为 `false` |

### option 字段

```ts
type FloorSwitchOption = {
  floors?: { idx: number; name: string }[]
  currentFloor?: number | 'all'   // 当前选中层，默认 'all'；组件内部写入以驱动高亮
  allLabel?: string               // 「全部」文案，默认「全部」
}
```

| 字段 | 类型 | 说明 |
|------|------|------|
| `floors` | `{ idx: number; name: string }[]` | 楼层列表（含显示名） |
| `currentFloor` | `number \| 'all'` | 当前选中楼层；组件在点击、SDK 同步时写入，宿主可读、无需 complete 回写 |
| `allLabel` | `string` | 「全部」文案，默认「全部」 |

## 事件

| 事件名 | `detail` | 说明 |
|--------|----------|------|
| `lit-click` | `{ floor: number \| 'all', originalEvent? }` | 用户点击「全部」或某一楼层 |
| `lit-switch-complete` | `{ floor: number }` | 用户点击具体楼层且切换完成，或全景点位切换后楼层与选中层不一致时派发 |

## 代码示例

### 基础用法（组件驱动 SDK）

```html
<lit-switch-floor
  :qspace="qspaceInstance"
  :option="floorSwitchOption"
  @lit-click="onFloorSwitchClick"
  @lit-switch-complete="onFloorSwitchComplete"
/>
```

### 纯 UI + 宿主处理

不传 `qspace`，宿主监听 `lit-click` 自行调用 SDK：

```html
<lit-switch-floor
  :option="{ floors: [{ idx: 0, name: 'F1' }, { idx: 1, name: 'F2' }], allLabel: '全部' }"
  @lit-click="onFloorSwitchClick"
/>
```

### floorSwitchOption mock 数据

```ts
const floorSwitchOption = {
  floors: [
    { idx: 0, name: '一楼' },
    { idx: 1, name: '二楼' },
    { idx: 2, name: '三楼' },
  ],
  currentFloor: 'all',
  allLabel: '全部',
}
```
