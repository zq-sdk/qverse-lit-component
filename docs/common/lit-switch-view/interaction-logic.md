# lit-switch-view · 交互逻辑

## enabled 状态

各按钮在**当前已是目标视图**或**视图过渡中**时禁用；其余稳定视图下可点。

| 组件 | `enabled = true` | `enabled = false` |
|------|------------------|-------------------|
| `lit-switch-dollhouse-view` | `floorplan` / `panorama` | `dollhouse` / `transitioning` |
| `lit-switch-floorplan-view` | `dollhouse` / `panorama` | `floorplan` / `transitioning` |
| `lit-switch-panorama-view` | `dollhouse` / `floorplan` | `panorama` / `transitioning` |

**点位切换进行中**（`switch.waypoint.start` → `complete`）：三个视图按钮均 `enabled = false`，完成后按当前 `view.mode` 恢复。

## 场景未就绪

`core.loaded` 前，或挂载时 `getCurrentMode()` 为 `null`：不调用 `syncEnabledFromMode`，按钮保持默认 `enabled = false`，点击无效。

## core.loaded

场景加载完成后，按当前 `qspace.view.mode` 同步各按钮 `enabled`。

## 点击切换

```
点击按钮
  → 若 disabled：忽略
  → 派发 lit-click
  → enabled = false
  → 有 qspace：调用 SDK 切换至目标视图
  → 切换完成：派发 lit-switch-complete，按新模式恢复 enabled
  → 无 qspace：仅派发 lit-click
```

## view.mode.change

外部或 SDK 切换视图后，各组件按新模式自动同步 `enabled`（已在目标视图则禁用对应按钮）。

## 全景点位切换联动

| 事件 | 行为 |
|------|------|
| `switch.waypoint.start` | 三个视图按钮均禁用 |
| `switch.waypoint.complete` | 按当前 `view.mode` 恢复各按钮 `enabled` |
