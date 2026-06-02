/**
 * Lit 视图切换按钮状态管理
 *
 * 切换调用在 lit-switch-*-view 内完成；本 composable 只负责：
 * - 场景 loaded 后启用 button-enabled
 * - click 时立即禁用其他按钮（setCurrentView）
 * - complete 后同步 current-view 互斥
 *
 * 演示页先监听 Lit 事件，再调用 handleViewSwitchClick / handleViewSwitchComplete
 */

import { ref, watch, type Ref } from 'vue'

/** qspace.view.mode 对应的三类视图 */
export type SwitchViewMode = 'dollhouse' | 'floorplan' | 'panorama'

/** Lit 切换按钮实例（通过 ref 绑定，调用 setCurrentView 同步禁用态） */
export type SwitchViewElement = HTMLElement & {

  setCurrentView?: (value: boolean) => void

}

/** 三个切换按钮的 ref 集合，key 与 SwitchViewMode 一致 */
export type SwitchViewRefs = Record<SwitchViewMode, Ref<SwitchViewElement | null>>

export type PanoramaSwitchOption = {
  locationId?: string
  quaternion?: {
    x: number
    y: number
    z: number
    w: number
  }
}

const SWITCH_VIEW_MODES: SwitchViewMode[] = ['dollhouse', 'floorplan', 'panorama']

/** 规范化事件 detail.view 或 qspace.view.mode */
export function normalizeSwitchViewMode(mode: unknown): SwitchViewMode | null {

  const raw = String(mode ?? '').toLowerCase()

  if (raw === 'dollhouse' || raw === 'floorplan' || raw === 'panorama') {

    return raw

  }

  return null

}

/** 仅 activeView 对应按钮 setCurrentView(true)，其余 false */
function syncCurrentView(activeView: SwitchViewMode, refs: SwitchViewRefs) {

  for (const mode of SWITCH_VIEW_MODES) {

    refs[mode].value?.setCurrentView?.(mode === activeView)

  }

}

/** 点击后立即禁用除当前点击项外的其他按钮，避免切换过程中重复点击 */
function disableOtherButtonsOnClick(clickedView: SwitchViewMode, refs: SwitchViewRefs) {

  for (const mode of SWITCH_VIEW_MODES) {

    refs[mode].value?.setCurrentView?.(mode !== clickedView)

  }

}

/**
 * @param loadState useQspaceScene 的加载状态
 * @param refs 演示页 template ref 传入的三个 lit-switch-*-view
 */
export function useSwitchView(
  loadState: Ref<'idle' | 'loading' | 'loaded'>,
  refs: SwitchViewRefs,
) {

  /** 场景就绪后为 true，映射到各按钮 :button-enabled */
  const switchButtonsEnabled = ref(false)

  /** 当前已切换完成的视图，与 qspace.view.mode 保持一致 */
  const currentView = ref<SwitchViewMode | null>(null)

  /** core loaded 后调用：启用按钮并按初始视图禁用对应项 */
  function syncSwitchViewAfterLoad(initialView: SwitchViewMode) {

    switchButtonsEnabled.value = true
    currentView.value = initialView
    syncCurrentView(initialView, refs)

  }

  /** 演示页在 @lit-switch-*-click 回调中调用 */
  function handleViewSwitchClick(event: CustomEvent<{ view?: string }>) {

    const view = normalizeSwitchViewMode(event.detail?.view)

    if (!view || currentView.value === view) {

      return

    }

    disableOtherButtonsOnClick(view, refs)

  }

  /** 演示页在 @lit-switch-*-complete 回调中调用 */
  function handleViewSwitchComplete(event: CustomEvent<{ view?: string }>) {

    const view = normalizeSwitchViewMode(event.detail?.view)

    if (!view) {

      return

    }

    currentView.value = view
    syncCurrentView(view, refs)

  }

  watch(loadState, (state) => {

    if (state === 'loaded') {

      switchButtonsEnabled.value = true

    }

  })

  return {
    switchButtonsEnabled,
    currentView,
    syncSwitchViewAfterLoad,
    handleViewSwitchClick,
    handleViewSwitchComplete,
  }

}
