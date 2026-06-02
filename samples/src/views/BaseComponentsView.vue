<template>
  <el-card shadow="never" class="lit-demo">
    <template #header>
      <span>基础组件测试</span>
      <el-text type="info" size="small">lit-button · @qverse-ui/lit-components/base</el-text>
    </template>

    <el-text type="info" class="intro">
      测试 <code>lit-button</code> 的 variant、size、disabled 与事件派发。
    </el-text>

    <div class="lit-blocks">
      <p class="section-label">Variant</p>
      <div class="demo-actions">
        <lit-button variant="primary" @click="onClick" @lit-click="onLitClick">
          主要按钮
        </lit-button>
        <lit-button variant="success">成功</lit-button>
        <lit-button variant="default">默认</lit-button>
        <lit-button variant="danger" disabled>禁用</lit-button>
      </div>

      <p class="section-label">Size</p>
      <div class="demo-actions">
        <lit-button variant="primary" size="small">Small</lit-button>
        <lit-button variant="primary" size="medium">Medium</lit-button>
        <lit-button variant="primary" size="large">Large</lit-button>
      </div>

      <p class="section-label">Block</p>
      <lit-button variant="primary" block>Block 按钮</lit-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">

import { ElMessage } from 'element-plus'

function onClick() {

  ElMessage.success('lit-button @click')

}

function onLitClick(e: CustomEvent<{ payload?: { variant?: string } }>) {

  ElMessage.info(`lit-click · variant=${e.detail?.payload?.variant ?? '-'}`)

}

</script>

<style scoped>
.intro {
  display: block;
  margin-bottom: 1rem;
}

.lit-blocks {
  padding-top: 0.25rem;
  padding-bottom: 1.25rem;
}

.section-label {
  margin: 0 0 0.5rem;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.demo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1.25rem;
}

code {
  font-size: 0.85em;
  background: var(--el-fill-color-light);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
</style>
