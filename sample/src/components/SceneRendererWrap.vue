<!--
  qspace 渲染舞台容器：挂载 renderer-stage、启动场景、加载遮罩
-->
<template>
  <div
    ref="rendererWrapRef"
    class="renderer-wrap"
  >
    <div v-if="loadState === 'loading'" class="stage-overlay">
      <el-progress type="circle" :percentage="loadProgress" :width="72" />
      <span class="overlay-text">场景加载中…</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useQspaceScene } from '@/composables/useQspaceScene'
import { resolveQspace } from '@/sdk/resolve-qspace'
import { attachRendererStage, detachRendererStage } from '@/utils/renderer-stage-host.js'

const { loadState, loadProgress, startScene } = useQspaceScene()
const qspaceInstance: any = resolveQspace()
const rendererWrapRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

function resizeRenderer() {

  qspaceInstance?.core?.resize?.()
  window.dispatchEvent(new Event('resize'))

}

function onCoreLoaded() {

  console.log('onCoreLoaded')

  dealtCoreLoaded()
  resizeRenderer()

}

function dealtCoreLoaded() {

  qspaceInstance.dollhouseCamera.setZoomLimit({
    min: 1,
    max: 4
  })

  qspaceInstance.dollhouseCamera.enableZoomControl()

  qspaceInstance.floorplanCamera.setZoomLimit({
    min: 1,
    max: 4
  })

  qspaceInstance.floorplanCamera.enableZoomControl()

  qspaceInstance.floorplanCamera.enablePanControl()

}

onMounted(() => {

  if (rendererWrapRef.value) {

    attachRendererStage(rendererWrapRef.value)

    resizeObserver = new ResizeObserver(() => {

      resizeRenderer()

    })
    resizeObserver.observe(rendererWrapRef.value)

  }

  startScene()

  qspaceInstance?.core?.addEventListener?.('loaded', onCoreLoaded)

})

onBeforeUnmount(() => {

  resizeObserver?.disconnect()
  resizeObserver = null

  qspaceInstance?.core?.removeEventListener?.('loaded', onCoreLoaded)

  detachRendererStage()

})
</script>

<style scoped>
.renderer-wrap {
  position: relative;
  width: 100%;
  height: 100%;
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
</style>

<style>
.renderer-stage {
  width: 100%;
  height: 100%;
}
</style>
