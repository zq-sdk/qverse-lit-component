# lit-switch-view · 业务逻辑

## 组件定位

3D 场景工具栏中的**视图切换**由三个独立 Lit 组件组成，分别切换到对应 `view.mode`：

| 组件 | 目标视图 |
|------|----------|
| `lit-switch-dollhouse-view` | 3D（`dollhouse`） |
| `lit-switch-floorplan-view` | 平面（`floorplan`） |
| `lit-switch-panorama-view` | 全景（`panorama`） |

宿主通过 `:qspace` 传入 SDK 实例；组件监听场景事件并调用 SDK 切换视图。全景切换可额外通过 `:option` 传入 `locationId`、`quaternion`。

## UI 结构

每个组件渲染一个图标按钮，样式通过 CSS 变量配置（如 `--lit-mode-dollhouse-icon`）。当前处于目标视图或不可点击时，按钮半透明且 `pointer-events: none`。

## 数据来源

- **必选**：`:qspace` SDK 实例
- **可选**：`lit-switch-panorama-view` 的 `:option`（全景目标点位与朝向）；字段说明见 [API](./api.md)

## 显示条件

三个按钮独立挂载，无 `hidden` 逻辑；`enabled` 由组件根据场景状态自动维护，宿主无需手动控制。
