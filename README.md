# @qverse/lit-components

基于 [Lit](https://github.com/lit/lit) 的 Web Component，源码在 `src/components/`。

## 目录

```
src/components/
  index.ts          # 全量注册
  base/             # lit-button
  common/           # lit-switch-*-view 等通用组件
samples/            # Vue 3 演示应用（可独立构建）
```

## 安装

```json
"@qverse/lit-components": "file:../Qverse-Lit-Component"
```

## 使用

```ts
import '@qverse/lit-components'

import '@qverse/lit-components/base'
import '@qverse/lit-components/common'
import '@qverse/lit-components/components'
```

| 入口 | 说明 |
|------|------|
| `.` | 全部组件 |
| `/components` | 同 `.` |
| `/base` | `lit-button` |
| `/common` | `lit-switch-panorama-view`、`lit-switch-dollhouse-view`、`lit-switch-floorplan-view` |

宿主应用自行引入 `element-plus/dist/index.css` 并配置主题；**不必**引入本包的 `theme.css`。

Lit 组件会读取页面上的 `--el-*`（若存在）；否则使用 `tokens.generated.ts` 内 fallback。

若需全站与 Lit 共用一套令牌，可**可选**引入 `@qverse/lit-components/theme.css`（见 `theme/README.md`）。

## 组件事件

组件内使用 `dispatchEvent` 派发 `CustomEvent`（`bubbles: true`、`composed: true`），宿主用 Vue `@事件名` 监听，例如 `@lit-click`、`@lit-switch-panorama-complete`。

## 构建

```bash
npm install
npm run build
```

## Samples（Vue 3 演示）

库内 `samples/` 为独立 Vue 3 应用，用于预览组件：

```bash
cd samples
npm install
npm run dev       # http://localhost:3100
npm run build     # 输出 samples/dist
```

详见 [samples/README.md](./samples/README.md)。

## 本地开发（与 main-app 联调）

**仅 main-app（Vite）** 在 `vite.config.ts` 里 alias 到 `src/`；改组件后 **保存 → 硬刷新（Ctrl+Shift+R）** 即可。

**子应用（vue-cli）** 始终读 `dist/`，改 lit 后需：

1. `cd Qverse-Lit-Component && npm run build`（或另开终端 `npm run dev` 即 `vite build --watch`）
2. **重启** main-app / 子应用的 dev 服务
3. 硬刷新页面（`customElements` 注册后无法 HMR 替换类）

DevTools Sources 里看到的是 **源码 + source map**，若与运行不一致，说明浏览器还在跑旧模块，按上面步骤处理。
