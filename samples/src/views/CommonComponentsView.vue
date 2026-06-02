<!--
  通用 Lit 组件演示页：qspace 场景 + lit-switch-*-view 视图切换
  切换逻辑与按钮 enabled 均在 Lit 组件内完成
-->
<template>
  <div class="common-scene">
    <!-- 视图切换工具栏 -->
    <el-card shadow="never" class="lit-demo">
      <template #header>
        <span>通用组件测试</span>
        <el-text type="info" size="small">lit-switch-*-view · @qverse-ui/lit-components/common</el-text>
      </template>

      <p class="section-label">视图切换（需场景加载完成后可用）</p>
      <div class="switch-row">
        <lit-switch-dollhouse-view :qspace="qspaceInstance" />
        <lit-switch-floorplan-view :qspace="qspaceInstance" />
        <lit-switch-panorama-view
          :qspace="qspaceInstance"
          :option="panoramaOption"
        />
      </div>
    </el-card>

    <el-text type="info" class="intro">
      模型
      <code>{{ sceneModelLabel }}</code>
    </el-text>

    <!-- qspace 渲染舞台（挂载于 attachRendererStage） -->
    <div ref="rendererWrapRef" class="renderer-wrap">
      <div v-if="loadState === 'loading'" class="stage-overlay">
        <el-progress type="circle" :percentage="loadProgress" :width="72" />
        <span class="overlay-text">场景加载中…</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CommonComponentsView — samples 通用组件 + 3D 场景联调页
 *
 * 数据流：scene-boot → useQspaceScene → Lit 组件监听 qspace core.loaded / mode.change
 */

import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { SCENE_BOOT_DATA } from '@/config/scene-boot'
import { useQspaceScene } from '@/composables/useQspaceScene'
import type { PanoramaSwitchOption } from '@/composables/useSwitchView'
import { resolveQspace } from '@/sdk/resolve-qspace'
import { attachRendererStage, detachRendererStage } from '@/utils/renderer-stage-host.js'

/** 场景加载进度与启动 */
const { loadState, loadProgress, startScene } = useQspaceScene()

/** 全局 qspace 实例（由 index.html 注入） */
const qspaceInstance: any = resolveQspace()

const panoramaOption = ref<PanoramaSwitchOption | null>(null)

const sceneModelLabel = computed(
  () => `${SCENE_BOOT_DATA.id} · ${SCENE_BOOT_DATA.version}`,
)

const rendererWrapRef = ref<HTMLElement | null>(null)

/** core loaded：初始化 panorama option */
function onCoreLoaded() {

  panoramaOption.value = {
    locationId: qspaceInstance.model.waypoints[0].location_id,
  }

  const timer = setTimeout(() => {

    clearTimeout(timer)

    panoramaOption!.value!.locationId = 'location_10'

    panoramaOption!.value!.quaternion = {
      x: -0.0009091443452219972,
      y: -0.7159943957430044,
      z: -0.0009324420121733712,
      w: 0.6981048125267894,
    }

    console.log('locationId updated', panoramaOption.value)

  }, 3000)

}

onMounted(() => {

  if (rendererWrapRef.value) {
    attachRendererStage(rendererWrapRef.value)
  }

  startScene()

  qspaceInstance?.core?.addEventListener?.('loaded', onCoreLoaded)

})

onBeforeUnmount(() => {

  qspaceInstance?.core?.removeEventListener?.('loaded', onCoreLoaded)

  detachRendererStage()

})
</script>

<style scoped>
.common-scene {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.intro {
  display: block;
  margin-bottom: 1rem;
}

.section-label {
  margin: 0 0 0.5rem;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

.switch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.renderer-wrap {
  position: relative;
  width: 100%;
  height: min(52vh, 520px);
  min-height: 320px;
  overflow: hidden;
  border-radius: var(--el-border-radius-base);
  background-image: linear-gradient(180deg, #1c1c1c 5%, #474a59 54%, #5e6272 75%);
}

.stage-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: rgba(0, 0, 0, 0.35);
  pointer-events: none;
}

.overlay-text {
  color: #fff;
  font-size: 13px;
}

.lit-demo {
  flex-shrink: 0;
}

code {
  font-size: 0.85em;
  background: var(--el-fill-color-light);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}
</style>

<!-- 渲染舞台挂载后由 renderer-stage-host 注入的全局 class -->
<style>
.renderer-stage {
  width: 100%;
  height: 100%;
}
</style>
