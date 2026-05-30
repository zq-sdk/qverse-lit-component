# @qverse/lit-components Samples

Vue 3 演示应用，用于预览与验证 `@qverse/lit-components` 组件。

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

- **dev 模式**：Vite 将 `@qverse/lit-components` alias 到父目录 `src/`，改 Lit 组件后保存并硬刷新即可。
- **build 模式**：使用父目录 `dist/` 产物，与业务项目消费方式一致。
- Vue 模板将 `lit-*` 标为自定义元素；TypeScript 类型见 `src/types/lit-components.d.ts`。
- 顶部导航切换 **基础组件测试**（`/base`）与 **通用组件测试**（`/common`）。
