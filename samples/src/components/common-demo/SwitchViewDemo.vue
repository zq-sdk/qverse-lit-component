<!--
  视图切换 · 组件说明
-->
<template>
  <el-card shadow="never" class="lit-demo-panel">
    <template #header>
      <div class="panel-header">
        <span>视图切换</span>
        <el-text type="info" size="small">lit-switch-*-view</el-text>
      </div>
    </template>

    <div class="panel-desc">
      <p class="panel-desc-title">业务逻辑</p>
      <ul class="panel-desc-list">
        <li>
          提供三个独立 Lit 组件：
          <code>lit-switch-dollhouse-view</code>、
          <code>lit-switch-floorplan-view</code>、
          <code>lit-switch-panorama-view</code>，分别切换到 3D（dollhouse）、平面（floorplan）、全景（panorama）视图。
        </li>
        <li>宿主通过 <code>:qspace</code> 传入 SDK 实例；全景切换可额外通过 <code>:option</code> 传入 <code>locationId</code>、<code>quaternion</code>。</li>
        <li>按钮是否可点（<code>enabled</code>）由组件内部根据场景状态自动维护，宿主无需手动控制。</li>
      </ul>

      <p class="panel-desc-title">交互逻辑</p>
      <ul class="panel-desc-list">
        <li><strong>场景未就绪：</strong><code>core.loaded</code> 前，按钮 <code>enabled=false</code>，点击无效。</li>
        <li>
          <strong>场景加载完成：</strong>监听 <code>core.loaded</code>，按当前
          <code>qspace.view.mode</code> 同步 <code>enabled</code>——已在目标视图或处于
          <code>transitioning</code> 时，对应按钮禁用，避免重复切换。
        </li>
        <li>
          <strong>点击切换：</strong>可用状态下点击 → 派发 <code>lit-click</code> → 调用 SDK 切换视图 → 切换过程中禁用按钮 → 完成后派发
          <code>lit-switch-complete</code>，并根据新模式恢复 <code>enabled</code>。
        </li>
        <li>
          <strong>模式变化：</strong>监听 <code>view.mode.change</code>，外部切视图后按钮状态自动同步。
        </li>
        <li>
          <strong>全景点位切换：</strong>监听 <code>switch.waypoint.start</code> / <code>complete</code>，点位切换进行中 temporarily 禁用全部视图按钮，完成后恢复。
        </li>
      </ul>

      <p class="panel-desc-title">代码示例</p>
      <DemoCodeBlock title="基础用法（3D / 平面 / 全景）" :code="basicUsageCode" />
      <DemoCodeBlock title="全景切换（:option 传入 locationId / quaternion）" :code="panoramaOptionCode" />
      <DemoCodeBlock title="事件监听" :code="eventHandlerCode" />

      <p class="panel-desc-note">
        交互演示请前往左侧导航「3D 场景工具栏 → 示例」。
      </p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import DemoCodeBlock from '@/components/common-demo/DemoCodeBlock.vue'

const basicUsageCode = `<!-- 3D -->
<lit-switch-dollhouse-view
  :qspace="qspaceInstance"
  @lit-click="onSwitchDollhouseViewClick"
  @lit-switch-complete="onSwitchDollhouseViewComplete"
/>
<!-- 平面 -->
<lit-switch-floorplan-view
  :qspace="qspaceInstance"
  @lit-click="onSwitchFloorplanViewClick"
  @lit-switch-complete="onSwitchFloorplanViewComplete"
/>
<!-- 全景 -->
<lit-switch-panorama-view
  :qspace="qspaceInstance"
  :option="panoramaOption"
  @lit-click="onSwitchPanoramaViewClick"
  @lit-switch-complete="onSwitchPanoramaViewComplete"
/>`

const panoramaOptionCode = `const panoramaOption = ref({
  locationId: 'location_10',
  quaternion: { x: -0.0009, y: -0.716, z: -0.0009, w: 0.698 },
})

function onSwitchPanoramaViewClick() {
  panoramaOption.value = { locationId: 'location_10', quaternion: { x: 0, y: 0, z: 0, w: 1 } }
}`

const eventHandlerCode = `function onSwitchDollhouseViewClick(e: CustomEvent) {
  console.log('lit-click', e.detail)
}
function onSwitchDollhouseViewComplete(e: CustomEvent) {
  console.log('lit-switch-complete', e.detail)
}`
</script>

<style scoped>
.panel-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem 1rem;
}

.panel-desc {
  margin: 0;
  font-size: 13px;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
}

.panel-desc-title {
  margin: 0 0 0.35rem;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

.panel-desc-title:not(:first-child) {
  margin-top: 0.75rem;
}

.panel-desc-list {
  margin: 0;
  padding-left: 1.25rem;
}

.panel-desc-list li + li {
  margin-top: 0.35rem;
}

.panel-desc-note {
  margin: 0.75rem 0 0;
  font-size: 12px;
  color: var(--el-text-color-placeholder);
}

.panel-desc code {
  font-size: 0.92em;
  background: var(--el-fill-color-light);
  padding: 0.1rem 0.35rem;
  border-radius: 4px;
}

.lit-demo-panel {
  flex-shrink: 0;
}
</style>
