# lit-switch-floor · 业务逻辑

## 组件定位

`lit-switch-floor` 是 3D 场景工具栏中的**楼层切换**通用组件，提供竖向楼层列表 UI，并在宿主传入 `qspace` 时按当前视图模式调用 SDK 执行楼层切换。

## UI 结构

| 区域 | 说明 |
|------|------|
| 顶部「全部」 | 固定显示，选中时展示全部楼层 |
| 楼层列表 | 按 `floors` **倒序**渲染（对齐作品编辑端 `floorListReverse`） |
| 滚动箭头 | 楼层数超过 4 层时显示上下箭头，列表区域可滚动 |

楼层显示名优先级：`floors[].name` → 自动生成 `F{n}` / `B{n}`（负 idx 为地下层）。

## 数据来源

由宿主组装后通过 `option` 传入；字段说明见 [API](./api.md)。

宿主典型做法：场景 `loaded` 后从 `qspace.model.floors`（或适配后的场景数据）读取楼层列表，写入 `option.floors`。

## 显示条件

- `option.floors` 为空 → 组件 `hidden`，不渲染
- 有楼层数据即显示
