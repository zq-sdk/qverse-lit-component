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
      <div class="switch-panel">
        <el-checkbox-group v-model="visibleSwitchViews" class="switch-checkbox-row">
          <el-checkbox value="dollhouse">3D视图</el-checkbox>
          <el-checkbox value="floorplan">平面视图</el-checkbox>
          <el-checkbox value="panorama">全景视图</el-checkbox>
        </el-checkbox-group>
        <div class="switch-btn-row">
          <lit-switch-dollhouse-view
            ref="litSwitchDollhouseViewRef"
            :qspace="qspaceInstance"
            @lit-click="onSwitchDollhouseViewClick"
            @lit-switch-complete="onSwitchDollhouseViewComplete"
            v-if="visibleSwitchViews.includes('dollhouse')"
          />
          <lit-switch-floorplan-view
            ref="litSwitchFloorplanViewRef"
            :qspace="qspaceInstance"
            @lit-click="onSwitchFloorplanViewClick"
            @lit-switch-complete="onSwitchFloorplanViewComplete"
            v-if="visibleSwitchViews.includes('floorplan')"
          />
          <lit-switch-panorama-view
            ref="litSwitchPanoramaViewRef"
            :qspace="qspaceInstance"
            :option="panoramaOption"
            @lit-click="onSwitchPanoramaViewClick"
            @lit-switch-complete="onSwitchPanoramaViewComplete"
            @click.stop="onSwitchPanoramaViewClick2"
            v-if="visibleSwitchViews.includes('panorama')"
          />
        </div>
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

type SwitchViewMode = 'dollhouse' | 'floorplan' | 'panorama'

/** 场景加载进度与启动 */
const { loadState, loadProgress, startScene } = useQspaceScene()

/** 全局 qspace 实例（由 index.html 注入） */
const qspaceInstance: any = resolveQspace()

/** 全景视图切换参数 */
const panoramaOption = ref<PanoramaSwitchOption>({})

const litSwitchPanoramaViewRef = ref<any>(null)
const litSwitchFloorplanViewRef = ref<any>(null)
const litSwitchDollhouseViewRef = ref<any>(null)
;(window as any).litSwitchPanoramaViewRef = litSwitchPanoramaViewRef
;(window as any).litSwitchFloorplanViewRef = litSwitchFloorplanViewRef
;(window as any).litSwitchDollhouseViewRef = litSwitchDollhouseViewRef

/** 勾选的视图类型；默认全部勾选 */
const visibleSwitchViews = ref<SwitchViewMode[]>(['dollhouse', 'floorplan', 'panorama'])

const sceneModelLabel = computed(
  () => `${SCENE_BOOT_DATA.id} · ${SCENE_BOOT_DATA.version}`,
)

const rendererWrapRef = ref<HTMLElement | null>(null)

/** core loaded：初始化 panorama option */
function onCoreLoaded() {


}

/** 3D 视图切换点击事件 */
function onSwitchDollhouseViewClick(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchDollhouseViewClick', e);

}

/** 平面视图切换点击事件 */
function onSwitchFloorplanViewClick(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchFloorplanViewClick', e);

}

/** 全景视图切换点击事件 */
function onSwitchPanoramaViewClick(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchPanoramaViewClick', e);

  // 直接改参数
  // panoramaOption!.value!.locationId = 'location_10'

  // panoramaOption!.value!.quaternion = {
  //   x: -0.0009091443452219972,
  //   y: -0.7159943957430044,
  //   z: -0.0009324420121733712,
  //   w: 0.6981048125267894,
  // }

  // 通过 ref 直接修改 option
  litSwitchPanoramaViewRef.value.option.locationId = 'location_10'

  litSwitchPanoramaViewRef.value.option.quaternion = {
    x: -0.0009091443452219972,
    y: -0.7159943957430044,
    z: -0.0009324420121733712,
    w: 0.6981048125267894,
  }

  console.log('litSwitchPanoramaViewRef.value.option', litSwitchPanoramaViewRef.value.option);

}

/**
 * Vue 点击事件
 * 测试直接修改 option 是否生效
 * 时机是否正确
 * 结论：lit事件先于 vue 事件执行，这里修改 option 后，lit 内部的点击事件无法获取 option
 */
function onSwitchPanoramaViewClick2(e: Event) {

  console.log('onSwitchPanoramaViewClick2', e);

  // litSwitchPanoramaViewRef.value.option.locationId = 'location_10'

  // litSwitchPanoramaViewRef.value.option.quaternion = {
  //   x: -0.0009091443452219972,
  //   y: -0.7159943957430044,
  //   z: -0.0009324420121733712,
  //   w: 0.6981048125267894,
  // }

  // console.log('litSwitchPanoramaViewRef.value.option', litSwitchPanoramaViewRef.value.option);

}

/** 全景视图切换完成事件 */
function onSwitchPanoramaViewComplete(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchPanoramaViewComplete', e);

}

/** 3D 视图切换完成事件 */
function onSwitchDollhouseViewComplete(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchDollhouseViewComplete', e);

}

/** 平面视图切换完成事件 */
function onSwitchFloorplanViewComplete(e: CustomEvent<{ view?: string }>) {

  console.log('onSwitchFloorplanViewComplete', e);

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

.switch-panel {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.switch-checkbox-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  align-items: center;
}

.switch-btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  min-height: 26px;
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
