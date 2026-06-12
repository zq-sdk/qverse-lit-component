<template>
  <el-tabs v-model="activeTab" class="component-doc-tabs">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <div class="doc-tab-body" @click="onDocLinkClick">
        <MarkdownDoc :html="tab.html" />
        <p v-if="tab.note" class="doc-tab-note">{{ tab.note }}</p>
      </div>
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

/** 文档内相对链接 → Tab name（如 business-logic.md 中的 ./api.md） */
const DOC_LINK_TAB: Record<string, string> = {
  'api.md': 'api',
  'business-logic.md': 'business',
  'interaction-logic.md': 'interaction',
}

function resolveDocTab(href: string): string | undefined {

  const normalized = href.replace(/^\.\//, '').split('#')[0]?.split('?')[0] ?? ''

  return DOC_LINK_TAB[normalized]

}

function onDocLinkClick(event: MouseEvent) {

  const anchor = (event.target as HTMLElement | null)?.closest('a')

  if (!anchor) {

    return

  }

  const href = anchor.getAttribute('href')

  if (!href || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:')) {

    return

  }

  const tabName = resolveDocTab(href)

  if (!tabName || !props.tabs.some((tab) => tab.name === tabName)) {

    return

  }

  event.preventDefault()
  activeTab.value = tabName

}

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
