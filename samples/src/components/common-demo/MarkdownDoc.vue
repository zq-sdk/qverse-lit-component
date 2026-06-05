<template>
  <div class="markdown-doc" v-html="html" />
</template>

<script setup lang="ts">
defineProps<{
  html: string
}>()
</script>

<style scoped>
.markdown-doc {
  margin: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
}

.markdown-doc :deep(h1) {
  margin: 0 0 0.35rem;
  font-size: 14px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.markdown-doc :deep(h2) {
  margin: 0.75rem 0 0.35rem;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.markdown-doc :deep(h3) {
  margin: 0.5rem 0 0.25rem;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.markdown-doc :deep(p),
.markdown-doc :deep(ul),
.markdown-doc :deep(ol),
.markdown-doc :deep(table),
.markdown-doc :deep(pre) {
  margin: 0 0 0.5rem;
}

.markdown-doc :deep(ul),
.markdown-doc :deep(ol) {
  padding-left: 1.25rem;
}

.markdown-doc :deep(li + li) {
  margin-top: 0.35rem;
}

.markdown-doc :deep(blockquote) {
  margin: 0 0 0.5rem;
  padding: 0.35rem 0.65rem;
  border-left: 3px solid var(--el-border-color);
  color: var(--el-text-color-placeholder);
  background: var(--el-fill-color-lighter);
}

.markdown-doc :deep(code) {
  font-size: 0.92em;
  background: var(--el-fill-color-light);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.markdown-doc :deep(pre) {
  padding: 0.65rem 0.85rem;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.45;
  color: var(--el-text-color-primary);
  background: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: var(--el-border-radius-base);
}

.markdown-doc :deep(pre code) {
  padding: 0;
  background: transparent;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  white-space: pre;
}

.markdown-doc :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.markdown-doc :deep(th),
.markdown-doc :deep(td) {
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--el-border-color-lighter);
  text-align: left;
}

.markdown-doc :deep(th) {
  font-weight: 600;
  color: var(--el-text-color-primary);
  background: var(--el-fill-color-light);
}

.markdown-doc :deep(hr) {
  margin: 0.75rem 0;
  border: none;
  border-top: 1px solid var(--el-border-color-lighter);
}
</style>
