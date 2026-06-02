<!--
  通用 Lit 组件演示页：qspace 场景 + lit-switch-*-view 视图切换
  切换逻辑在 Lit 组件内；本页仅同步按钮 enabled / current-view 互斥状态
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
        <!-- click：点击后立即禁用其他按钮；complete：切换完成后同步 current-view -->
        <lit-switch-dollhouse-view
          ref="dollhouseRef"
          :qspace="qspaceInstance"
          :button-enabled="switchButtonsEnabled"
          @lit-switch-dollhouse-click="onViewSwitchClick"
          @lit-switch-dollhouse-complete="onViewSwitchComplete"
        />
        <lit-switch-floorplan-view
          ref="floorplanRef"
          :qspace="qspaceInstance"
          :button-enabled="switchButtonsEnabled"
          @lit-switch-floorplan-click="onViewSwitchClick"
          @lit-switch-floorplan-complete="onViewSwitchComplete"
        />
        <lit-switch-panorama-view
          ref="panoramaRef"
          :qspace="qspaceInstance"
          :button-enabled="switchButtonsEnabled"
          :option="panoramaOption"
          @lit-switch-panorama-click="onViewSwitchClick"
          @lit-switch-panorama-complete="onViewSwitchComplete"
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
 * 数据流：scene-boot → useQspaceScene → qspace.core.loaded → 启用切换按钮
 * 按钮互斥：演示页监听 Lit 事件，再调用 useSwitchView 同步 current-view
 */

import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { SCENE_BOOT_DATA } from '@/config/scene-boot'
import { useQspaceScene } from '@/composables/useQspaceScene'
import { useSwitchView, type PanoramaSwitchOption, type SwitchViewElement, type SwitchViewMode } from '@/composables/useSwitchView'
import { resolveQspace } from '@/sdk/resolve-qspace'
import { attachRendererStage, detachRendererStage } from '@/utils/renderer-stage-host.js'

/** 场景加载进度与启动 */
const { loadState, loadProgress, startScene } = useQspaceScene()

/** 全局 qspace 实例（由 index.html 注入） */
const qspaceInstance: any = resolveQspace()

/** 三个切换按钮 ref，供 useSwitchView 同步 current-view */
const dollhouseRef = ref<SwitchViewElement | null>(null)
const floorplanRef = ref<SwitchViewElement | null>(null)
const panoramaRef = ref<SwitchViewElement | null>(null)
;(window as any).dollhouseRef = dollhouseRef
;(window as any).floorplanRef = floorplanRef
;(window as any).panoramaRef = panoramaRef

/** 按钮 enabled 与 current-view 互斥（见 composables/useSwitchView.ts） */
const {
  switchButtonsEnabled,
  syncSwitchViewAfterLoad,
  handleViewSwitchClick,
  handleViewSwitchComplete,
} = useSwitchView(loadState, {
  dollhouse: dollhouseRef,
  floorplan: floorplanRef,
  panorama: panoramaRef,
})

const panoramaOption = ref<PanoramaSwitchOption | null>(null)

/** 演示页监听 Lit click，再委托 composable 禁用其他按钮 */
function onViewSwitchClick(event: CustomEvent<{ view?: string }>) {

  handleViewSwitchClick(event)

}

/** 演示页监听 Lit complete，再委托 composable 同步 current-view */
function onViewSwitchComplete(event: CustomEvent<{ view?: string }>) {

  handleViewSwitchComplete(event)

}

const sceneModelLabel = computed(
  () => `${SCENE_BOOT_DATA.id} · ${SCENE_BOOT_DATA.version}`,
)

const rendererWrapRef = ref<HTMLElement | null>(null)

/** core loaded：相机配置 + 按 entry_info.mode 初始化当前视图按钮状态 */
async function onCoreLoaded() {

  panoramaOption.value = {
    locationId: qspaceInstance.model.waypoints[0].location_id,
  }

  // 测试参数延迟更新
  const timer = setTimeout(() => {

    clearTimeout(timer)

    panoramaOption!.value!.locationId = 'location_10'

    panoramaOption!.value!.quaternion = {x: -0.0009091443452219972, y: -0.7159943957430044, z: -0.0009324420121733712, w: 0.6981048125267894}

    console.log('locationId updated', panoramaOption.value)

  }, 3000)

  // 获取当前视图模式
  const currentView = qspaceInstance!.view!.mode as SwitchViewMode;

  // 等待视图切换按钮渲染完成
  await nextTick()

  // 按 entry_info.mode 初始化当前视图按钮状态
  syncSwitchViewAfterLoad(currentView)

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
