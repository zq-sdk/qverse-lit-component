<!--
  演示站首页：左侧导航 + 右侧内容区
-->
<template>
  <el-container class="home-layout">
    <el-aside width="240px" class="home-aside">
      <el-menu
        mode="vertical"
        :default-active="activePath"
        :default-openeds="defaultOpeneds"
        class="home-menu"
        router
      >
        <el-sub-menu index="base">
          <template #title>基础组件</template>
          <el-menu-item index="/base">lit-button</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="common">
          <template #title>通用组件</template>
          <el-sub-menu index="common-scene">
            <template #title>3D 场景工具栏</template>
            <el-menu-item index="/common/scene/switch-view">视图切换</el-menu-item>
            <el-menu-item index="/common/scene/floor-switch">楼层切换</el-menu-item>
            <el-menu-item index="/common/scene/example">示例</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-aside>

    <el-main class="home-main">
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/** 默认展开：基础组件、通用组件、3D 场景工具栏 */
const defaultOpeneds = ['base', 'common', 'common-scene']

const activePath = computed(() => {
  if (route.path.startsWith('/common/scene/example')) {
    return '/common/scene/example'
  }
  if (route.path.startsWith('/common/scene/floor-switch')) {
    return '/common/scene/floor-switch'
  }
  if (route.path.startsWith('/common/scene/switch-view')) {
    return '/common/scene/switch-view'
  }
  if (route.path.startsWith('/base')) {
    return '/base'
  }
  return route.path
})
</script>

<style scoped>
.home-layout {
  min-height: calc(100vh - 64px);
  align-items: stretch;
}

.home-aside {
  border-right: 1px solid var(--el-border-color-light);
  background: var(--el-bg-color);
  padding: 0.75rem 0;
}

.home-menu {
  border-right: none;
}

.home-main {
  padding: 1.25rem 1.5rem;
  background: var(--el-bg-color-page);
}
</style>
