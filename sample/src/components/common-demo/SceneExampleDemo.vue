<!--
  3D 场景 · 整合示例：楼层切换（左中）+ 视图切换（右下）浮层
-->
<template>
  <div class="scene-example-overlay">
    <div v-if="overlayControls?.floorSwitchVisible ?? true" class="overlay-floor">
      <lit-switch-floor
        ref="litSwitchFloorRef"
        :qspace="qspaceInstance"
        :option="floorSwitchOption"
        @lit-click="onFloorSwitchClick"
        @lit-switch-complete="onFloorSwitchComplete"
      />
    </div>

    <div class="overlay-view">
      <lit-switch-dollhouse-view
        v-if="overlayControls?.dollhouseVisible ?? true"
        :qspace="qspaceInstance"
        @lit-click="onSwitchDollhouseViewClick"
        @lit-switch-complete="onSwitchDollhouseViewComplete"
      />
      <lit-switch-floorplan-view
        v-if="overlayControls?.floorplanVisible ?? true"
        :qspace="qspaceInstance"
        @lit-click="onSwitchFloorplanViewClick"
        @lit-switch-complete="onSwitchFloorplanViewComplete"
      />
      <lit-switch-panorama-view
        v-if="overlayControls?.panoramaVisible ?? true"
        ref="litSwitchPanoramaViewRef"
        :qspace="qspaceInstance"
        :option="panoramaOption"
        @lit-click="onSwitchPanoramaViewClick"
        @lit-switch-complete="onSwitchPanoramaViewComplete"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PanoramaSwitchOption } from '@/composables/useSwitchView'
import { useSceneExampleOverlay } from '@/composables/useSceneExampleViewSwitch'
import { useQspaceScene } from '@/composables/useQspaceScene'
import { resolveFloorOptionFromAdaptedData } from '@/manager/scan-scene-init.js'
import { resolveQspace } from '@/sdk/resolve-qspace'

type FloorOptionItem = {
  idx: number
  name: string
}

type FloorSwitchOption = {
  floors?: FloorOptionItem[]
  currentFloor?: number | 'all'
  allLabel?: string
}

const qspaceInstance: any = resolveQspace()
const { adaptedSceneData } = useQspaceScene()
const overlayControls = useSceneExampleOverlay()
const panoramaOption = ref<PanoramaSwitchOption>({})
const floorSwitchOption = ref<FloorSwitchOption>({ floors: [], currentFloor: 'all' })
const litSwitchPanoramaViewRef = ref<any>(null)
const litSwitchFloorRef = ref<any>(null)
;(window as any).litSwitchPanoramaViewRef = litSwitchPanoramaViewRef // 控制台测试用
;(window as any).litSwitchFloorRef = litSwitchFloorRef // 控制台测试用

watch(adaptedSceneData, (data) => {

  if (!data) {

    return

  }
  floorSwitchOption.value = {
    ...floorSwitchOption.value,
    floors: resolveFloorOptionFromAdaptedData(data),
    // allLabel: 'xxx',
  }

}, { immediate: true })

function onSwitchDollhouseViewClick(_e: CustomEvent) {
  // demo overlay
}

function onSwitchFloorplanViewClick(_e: CustomEvent) {
  // demo overlay
}

function onSwitchPanoramaViewClick(_e: CustomEvent) {

  if (litSwitchPanoramaViewRef.value?.option) {

    litSwitchPanoramaViewRef.value.option.locationId = 'location_10'
    litSwitchPanoramaViewRef.value.option.quaternion = {
      x: -0.0009091443452219972,
      y: -0.7159943957430044,
      z: -0.0009324420121733712,
      w: 0.6981048125267894,
    }

  }

}

function onSwitchPanoramaViewComplete(_e: CustomEvent) {
  // demo overlay
}

function onSwitchDollhouseViewComplete(_e: CustomEvent) {
  // demo overlay
}

function onSwitchFloorplanViewComplete(_e: CustomEvent) {
  // demo overlay
}

function onFloorSwitchClick(e: CustomEvent<{ floor?: number | 'all' }>) {

  console.log('onFloorSwitchClick', e)

}

function onFloorSwitchComplete(e: CustomEvent<{ floor?: number | 'all' }>) {

  console.log('onFloorSwitchComplete', e)

}
</script>

<style scoped>
.scene-example-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.overlay-floor,
.overlay-view {
  pointer-events: auto;
}

.overlay-floor {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
}

.overlay-view {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}
</style>
