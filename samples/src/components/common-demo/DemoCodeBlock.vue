<template>
  <section class="code-section">
    <p v-if="title" class="code-section-label">{{ title }}</p>
    <pre class="code-block"><code>{{ code }}</code></pre>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  code: string
}>()
</script>

<style scoped>
.code-section + .code-section {
  margin-top: 0.75rem;
}

.code-section-label {
  margin: 0 0 0.35rem;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.code-block {
  margin: 0;
  padding: 0.65rem 0.85rem;
  overflow-x: auto;
  font-size: 12px;
  line-height: 1.45;
  color: var(--el-text-color-primary);
  background: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: var(--el-border-radius-base);
}

.code-block code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  white-space: pre;
  background: transparent;
  padding: 0;
}
</style>
