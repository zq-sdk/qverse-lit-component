<template>
  <el-container class="layout">
    <el-header class="header">
      <div class="header-brand">
        <h1>@qverse/lit-components</h1>
        <p class="subtitle">Vue 3 + Element Plus + Lit Web Components</p>
      </div>
      <el-menu
        mode="horizontal"
        :ellipsis="false"
        :default-active="activeMenu"
        router
        class="header-menu"
      >
        <el-menu-item index="/base">基础组件测试</el-menu-item>
        <el-menu-item index="/common">通用组件测试</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const activeMenu = computed(() => {

  if (route.path.startsWith('/common')) return '/common'

  return '/base'

})
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: var(--el-color-primary);
  color: #fff;
  padding: 0 1.5rem;
  height: auto;
  min-height: 64px;
}

.header-brand h1 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
}

.subtitle {
  margin: 0.15rem 0 0;
  font-size: 0.8rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.85);
}

.header-menu {
  flex: 1;
  justify-content: flex-end;
  border-bottom: none;
  background: transparent;
}

.header-menu :deep(.el-menu-item) {
  color: rgba(255, 255, 255, 0.9);
  border-bottom: 2px solid transparent;
}

.header-menu :deep(.el-menu-item:hover),
.header-menu :deep(.el-menu-item.is-active) {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.15) !important;
  border-bottom-color: #fff;
}

.main {
  background: var(--el-bg-color-page);
  padding: 1.25rem 1.5rem;
}
</style>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}
</style>
