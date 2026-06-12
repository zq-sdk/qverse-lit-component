<!--
  视图切换 · 组件说明（文档来自 docs/common/lit-switch-view）
-->
<template>
  <el-card shadow="never" class="lit-demo-panel">
    <template #header>
      <div class="panel-header">
        <span>视图切换</span>
        <el-text type="info" size="small">lit-switch-*-view</el-text>
      </div>
    </template>

    <ComponentDocTabs :tabs="docTabs" default-tab="business" />
  </el-card>
</template>

<script setup lang="ts">
import ComponentDocTabs, { type ComponentDocTab } from '@/components/common-demo/ComponentDocTabs.vue'
import apiHtml from '@lit-docs/lit-switch-view/api.md'
import businessLogicHtml from '@lit-docs/lit-switch-view/business-logic.md'
import interactionLogicHtml from '@lit-docs/lit-switch-view/interaction-logic.md'

const docTabs: ComponentDocTab[] = [
  { name: 'business', label: '业务逻辑', html: businessLogicHtml },
  { name: 'interaction', label: '交互逻辑', html: interactionLogicHtml },
  {
    name: 'api',
    label: 'API',
    html: apiHtml,
    note: '交互演示请前往左侧导航「3D 场景工具栏 → 示例」。',
  },
]
</script>

<style scoped>
.panel-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
}

.lit-demo-panel {
  flex-shrink: 0;
}
</style>
