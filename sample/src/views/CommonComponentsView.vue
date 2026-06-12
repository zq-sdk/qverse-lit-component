<!--
  通用组件 · 3D 场景示例：仅示例页挂载 rendererStage
-->
<template>
  <div class="common-scene">
    <div id="common-renderer-wrap" class="scene-stage">
      <div class="scene-top-bar">
        <el-text type="info" class="page-intro">
          模型
          <code>{{ sceneModelLabel }}</code>
          · 场景加载状态：
          <code>{{ loadState }}</code>
        </el-text>
      </div>

      <div class="scene-demo-controls">
        <div class="scene-demo-controls-group">
          <span class="scene-demo-controls-label">视图切换按钮</span>
          <el-checkbox v-model="dollhouseVisible" label="3D" />
          <el-checkbox v-model="floorplanVisible" label="平面" />
          <el-checkbox v-model="panoramaVisible" label="全景" />
        </div>
        <div class="scene-demo-controls-group">
          <span class="scene-demo-controls-label">楼层切换</span>
          <el-checkbox v-model="floorSwitchVisible" label="工具栏" />
        </div>
      </div>

      <div class="scene-body">
        <SceneRendererWrap />
        <div class="scene-overlay">
          <RouterView :key="route.fullPath" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SceneRendererWrap from '@/components/SceneRendererWrap.vue'
import { provideSceneExampleOverlay } from '@/composables/useSceneExampleViewSwitch'
import { SCENE_BOOT_DATA } from '@/config/scene-boot'
import { useQspaceScene } from '@/composables/useQspaceScene'

const route = useRoute()

const { loadState } = useQspaceScene()

const {
  floorSwitchVisible,
  dollhouseVisible,
  floorplanVisible,
  panoramaVisible,
} = provideSceneExampleOverlay()

const sceneModelLabel = computed(
  () => `${SCENE_BOOT_DATA.id} · ${SCENE_BOOT_DATA.version}`,
)
</script>

<style scoped>
.common-scene {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.scene-stage {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 320px;
  width: 100%;
  overflow: hidden;
  border-radius: var(--el-border-radius-base);
  background-image: linear-gradient(180deg, #1c1c1c 5%, #474a59 54%, #5e6272 75%);
}

.scene-top-bar {
  flex-shrink: 0;
  z-index: 4;
  padding: 0.5rem 1rem;
  background: var(--el-fill-color-light);
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.scene-demo-controls {
  flex-shrink: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.45rem;
  padding: 0.45rem 1rem;
  background: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.scene-demo-controls-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}

.scene-demo-controls-group + .scene-demo-controls-group {
  padding-left: 0;
  border-left: none;
}

.scene-demo-controls-label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.scene-demo-controls :deep(.el-checkbox) {
  height: auto;
  margin-right: 0;
}

.scene-demo-controls :deep(.el-checkbox__label) {
  font-size: 13px;
}

.scene-body {
  position: relative;
  flex: 1;
  min-height: 0;
}

.scene-overlay {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

.page-intro {
  display: block;
  font-size: 13px;
  line-height: 1.5;
}

code {
  font-size: 0.92em;
  background: var(--el-bg-color);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
</style>

<style>
.renderer-stage {
  width: 100%;
  height: 100%;
}
</style>
