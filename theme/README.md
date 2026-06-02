# 设计令牌（可选）

`tokens.json` 用于 **Lit 组件库内部** 生成 `src/styles/tokens.generated.ts`（`--lit-*` + `--el-*` fallback）。

**各 Vue 应用的主题由各自项目的 Element Plus 自行配置**，不强制使用本目录产物。

## 何时使用 `theme.css`

仅在希望「主应用 / 子应用 / Lit 共用同一套 `--el-*` 变量」时，在对应应用里**自行**添加（在 `element-plus/dist/index.css` 之后）：

```ts
import '@qverse-ui/lit-components/theme.css'
```

## 修改本包默认 fallback

1. 编辑 `theme/tokens.json`
2. 在本项目目录执行：

```bash
npm run generate-theme
npm run build
```

## 生成产物

| 文件 | 用途 |
|------|------|
| `theme/generated/element-plus-vars.css` | 可选：覆盖 `:root` 的 `--el-*`（`@qverse-ui/lit-components/theme.css`） |
| `src/styles/tokens.generated.ts` | Lit 组件 Shadow DOM 内 `--lit-*` |
