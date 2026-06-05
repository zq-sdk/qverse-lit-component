<template>
  <el-tabs v-model="activeTab" class="component-doc-tabs">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <MarkdownDoc :html="tab.html" />
      <p v-if="tab.note" class="doc-tab-note">{{ tab.note }}</p>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MarkdownDoc from '@/components/common-demo/MarkdownDoc.vue'

export type ComponentDocTab = {
  name: string
  label: string
  html: string
  note?: string
}

const props = withDefaults(defineProps<{
  tabs: ComponentDocTab[]
  defaultTab?: string
}>(), {
  defaultTab: '',
})

const activeTab = ref(props.defaultTab || props.tabs[0]?.name || '')

watch(
  () => props.tabs,
  (tabs) => {
    if (!tabs.some((tab) => tab.name === activeTab.value)) {
      activeTab.value = props.defaultTab || tabs[0]?.name || ''
    }
  },
  { deep: true },
)
</script>

<style scoped>
.component-doc-tabs :deep(.el-tabs__header) {
  margin-bottom: 0.75rem;
}

.doc-tab-note {
  margin: 0.75rem 0 0;
  font-size: 12px;
  color: var(--el-text-color-placeholder);
  line-height: 1.6;
}
</style>
