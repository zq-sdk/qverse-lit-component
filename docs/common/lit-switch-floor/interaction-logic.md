# lit-switch-floor · 交互逻辑

## enabled 状态
| `view.mode` | `enabled` |
|-------------|-----------|
| `panorama` / `dollhouse` / `floorplan` | `true` |
| `transitioning` | `false` |
| 点位切换进行中 | `false` |

## lit-switch-complete 派发规则

| 场景 | 是否派发 |
|------|----------|
| 点击具体楼层（3D / 平面） | ✅ 切换后立即派发 |
| 点击具体楼层（全景） | ✅ `switch.waypoint.complete` 后派发 |
| 全景 `switch.waypoint.complete` 且点位楼层 ≠ 当前选中层 | ✅ 同步选中层并派发 |
| 点击「全部」 | ❌ |
| 视图切换 / 场景 loaded 同步选中层 | ❌ |
| 全景漫游且点位仍在同一楼层 | ❌ |

## 首入视图

场景 `core.loaded` 后（含组件晚挂载补跑）：

- 若当前为**平面视图**（`floorplan`），默认选中**第一层**（`floors` 中 idx 最小项），并同步 SDK 楼层透明度与启用状态
- 其他视图不做首入默认层处理

> 不派发 `lit-switch-complete`。

## 视图模式切换

### transitioning（过渡中）

1. `enabled = false`
2. 立即选中「全部」
3. 恢复全部楼层启用且不透明

### 切到 floorplan（平面）

1. 默认选中**第一层**（`floors` 中 idx 最小项，通常为 F1）
2. 同步 SDK 楼层透明度与启用状态

触发时机：`view.mode.change` → `floorplan`；过渡结束后 `queueMicrotask` 二次同步。

### 切到 panorama（全景）

1. **强制**从 SDK 同步当前楼层（忽略其他视图遗留的 `option.currentFloor`）
2. 优先按当前全景点位所在楼层高亮；无法解析时使用 SDK 当前楼层

触发时机：`view.mode.change` → `panorama`。

> 切到平面时，若宿主在**当前平面视图下**显式传入 `option.currentFloor` 为具体 idx（非 `'all'`），视图切换默认选中时不覆盖。

## 点位切换联动

全景下楼层切换本质为点位切换：

### switch.waypoint.start

- `enabled = false`

### switch.waypoint.complete

- 解析当前点位所属楼层，与 `option.currentFloor` 不一致时更新选中态并派发 `lit-switch-complete`
- 用户点击具体楼层触发的切换（选中层已一致）亦在完成后派发
- 恢复 `enabled`

## 用户点击楼层

```
点击「全部」或某一楼层
  → 若 disabled 或已选中：忽略
  → 派发 lit-click
  → 更新选中态
  → 有 qspace：按 view.mode 执行切换
      点击具体楼层 + panorama：进行中禁用，switch.waypoint.complete 后派发 lit-switch-complete
      点击具体楼层 + dollhouse / floorplan：立即派发 lit-switch-complete
      点击「全部」：不派发 lit-switch-complete
  → 无 qspace + 点击具体楼层：立即派发 lit-switch-complete
```

### 全景视图下点击切换楼层

- 调用 SDK 切换全景楼层（点位切换）
- 切换完成前 `enabled=false`
- 仅点击具体楼层时，`switch.waypoint.complete` 后派发 `lit-switch-complete`

### 3D 视图下点击切换楼层

- 选中层**启用**且**不透明**，其余楼层**禁用**并**半透明**；选「全部」时恢复全部楼层启用且不透明
- 仅点击具体楼层时，完成后立即派发 `lit-switch-complete`

### 平面视图下点击切换楼层

- 选中层**启用**且**不透明**，其余楼层**禁用**并**半透明**；选「全部」时恢复全部楼层启用且不透明
- 仅点击具体楼层时，完成后立即派发 `lit-switch-complete`

## 滚动

- 楼层数 ≤ 3：列表完整展示
- 楼层数 ≥ 4：显示上下箭头，列表区域可滚动
