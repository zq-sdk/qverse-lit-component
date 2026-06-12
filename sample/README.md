# @qverse-ui/lit-components Samples

Vue 3 演示应用，用于预览与验证 `@qverse-ui/lit-components` 组件。

## 前置条件

组件库需先构建（`samples` 通过 `file:..` 引用父目录包）：

```bash
cd ..
npm install
npm run build
```

## 命令

在 `samples/` 目录内独立执行：

```bash
npm install
npm run dev       # http://localhost:3100
npm run build     # 输出到 samples/dist
npm run preview   # 预览生产构建
```

## 开发说明

- samples **不编译**组件库源码，通过 `file:..` 引用父包 `dist/` 产物（与业务项目一致）。
- 修改 Lit 组件后：根目录跑 `npm run dev`（`vite build --watch`）或 `npm run build`；**samples dev 无需重启**，dist 更新后会自动整页刷新。
- Vue 模板将 `lit-*` 标为自定义元素；TypeScript 类型见 `src/types/lit-components.d.ts`。
- 顶部导航切换 **基础组件测试**（`/base`）与 **通用组件测试**（`/common`）。
