<template>
  <el-card shadow="never" class="lit-demo">
    <template #header>
      <span>通用组件测试</span>
      <el-text type="info" size="small">lit-switch-*-view · @qverse/lit-components/common</el-text>
    </template>

    <el-text type="info" class="intro">
      样式对齐作品编辑端 ModeSwitch；当前视图（active）时隐藏对应按钮。宿主可通过 CSS 变量覆盖图标：
      <code>--lit-mode-panorama-icon</code> 等。
    </el-text>

    <p class="section-label">切换3D视图</p>
    <lit-switch-dollhouse-view
      :button-enabled="true"
      @lit-switch-dollhouse-click="onSwitchClick"
      @lit-switch-dollhouse-complete="onSwitchComplete"
    />
    <p class="section-label">切换平面视图</p>
    <lit-switch-floorplan-view
      :button-enabled="true"
      @lit-switch-floorplan-click="onSwitchClick"
      @lit-switch-floorplan-complete="onSwitchComplete"
    />
  </el-card>
</template>

<script setup lang="ts">

import { ElMessage } from 'element-plus'

function onSwitchClick(e: CustomEvent<{ view?: string }>) {

  ElMessage.info(`lit-switch-${e.detail?.view ?? '?'}-click`)

}

function onSwitchComplete(e: CustomEvent<{ view?: string }>) {

  ElMessage.success(`lit-switch-${e.detail?.view ?? '?'}-complete`)

}

</script>

<style scoped>
.intro {
  display: block;
  margin-bottom: 1rem;
}

.section-label {
  margin: 0 0 0.5rem;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

lit-switch-panorama-view,
lit-switch-dollhouse-view,
lit-switch-floorplan-view {
  display: inline-block;
  vertical-align: middle;
}

.section-label:not(:first-child) {
  margin-top: 1.25rem;
}

code {
  font-size: 0.85em;
  background: var(--el-fill-color-light);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
</style>
