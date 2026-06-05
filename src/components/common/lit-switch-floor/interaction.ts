/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 交互与状态同步
 */

import {
  DEFAULT_ALL_LABEL,
  FLOOR_ITEM_HEIGHT,
  SCROLLABLE_FLOOR_COUNT,
} from './constants.js'
import { dispatchClick, dispatchComplete } from './events.js'
import {
  applyFloorSelection,
  applyFloorVisibilityInModelView,
  getViewMode,
  isPanoramaViewMode,
  resolveCurrentPanoramaLocationId,
  resolveFirstFloorIdx,
  resolveFloorIdxByLocationId,
  resolvePanoramaCurrentFloor,
} from './logic.js'
import type { FloorItem, FloorSwitchOption } from './properties.js'
import { ViewMode } from '@/enum/view.mode'

/** 记录最近一次非 transitioning 的 view.mode，用于全景切走时重置选中层 */
const lastStableViewMode = new WeakMap<FloorSwitchHost, string>()

/** 用户点击具体楼层后待 SDK 完成切换（全景 switch.waypoint.complete 时派发 complete） */
const pendingUserFloorSwitch = new WeakMap<FloorSwitchHost, number>()

/** 记录最近一次非 transitioning 的 view.mode */
function rememberStableViewMode(host: FloorSwitchHost, mode?: string): void {

  const resolved = mode ?? getViewMode(host.qspace)

  if (resolved && resolved !== ViewMode.Transitioning) {

    lastStableViewMode.set(host, resolved)

  }

}

/** 当前选中层（唯一数据源：option.currentFloor） */
export function getCurrentFloor(host: FloorSwitchHost): number | 'all' {

  return host.option?.currentFloor ?? 'all'

}

/** 更新选中层并触发重绘 */
export function setCurrentFloor(host: FloorSwitchHost, floor: number | 'all'): void {

  if (`${getCurrentFloor(host)}` === `${floor}`) {

    return

  }

  host.option.currentFloor = floor
  host.requestUpdate()

}

/** 过渡模式：立即选中全部，恢复全部楼层启用且不透明 */
function resetToAllOnTransitioning(host: FloorSwitchHost): void {

  pendingUserFloorSwitch.delete(host)

  const floors = host.option.floors ?? []

  setCurrentFloor(host, 'all')

  if (host.qspace && floors.length > 0) {

    applyFloorVisibilityInModelView(host.qspace, 'all', floors)

  }

}

export type FloorSwitchHost = HTMLElement & {

  qspace: any
  option: FloorSwitchOption
  enabled: boolean
  scrollOffset: number
  upActive: boolean
  downActive: boolean
  requestUpdate: () => void
  toggleAttribute: (name: string, force?: boolean) => void
  setEnabled: (value: boolean) => void
  onSelectFloor?: (floorIndex: number | 'all', e: Event) => void
  onScrollUp?: () => void
  onScrollDown?: () => void

}

export function setFloorSwitchEnabled(host: FloorSwitchHost, value: boolean): void {

  host.setEnabled(value)

}

/** 按 view.mode 同步 enabled：视图过渡中禁用，稳定视图下可点 */
export function syncEnabledFromViewMode(host: FloorSwitchHost, mode?: string): void {

  const resolved = mode ?? getViewMode(host.qspace)

  switch (resolved) {

    case ViewMode.Panorama:
    case ViewMode.Dollhouse:
    case ViewMode.Floorplan:
      setFloorSwitchEnabled(host, true)
      break

    case ViewMode.Transitioning:
      setFloorSwitchEnabled(host, false)
      break

    default:
      break

  }

}

/** 有楼层数据即显示（含单层） */
export function isFloorSwitchVisible(host: FloorSwitchHost): boolean {

  return (host.option.floors?.length ?? 0) > 0

}

/** 楼层显示名：优先 floors[].name，否则 F{n} / B{n} */
export function getFloorLabel(host: FloorSwitchHost, idx: number): string {

  const item = host.option.floors?.find((floor) => floor.idx === idx)

  if (item?.name) {

    return item.name

  }

  if (idx >= 0) {

    return `F${idx + 1}`

  }

  return `B${-idx}`

}

export function getAllLabel(host: FloorSwitchHost): string {

  return host.option?.allLabel ?? DEFAULT_ALL_LABEL

}

/** 倒序楼层列表，对齐作品编辑端 floorListReverse */
export function getFloorListReverse(host: FloorSwitchHost): FloorItem[] {

  return (host.option.floors ?? []).slice().reverse()

}

export function syncVisibility(host: FloorSwitchHost): void {

  host.toggleAttribute('hidden', !isFloorSwitchVisible(host))

}

/** 按当前视图模式同步默认选中层 */
function syncDefaultFloorForViewMode(
  host: FloorSwitchHost,
  mode?: string,
  options?: { forceFloorplan?: boolean; forcePanorama?: boolean },
): void {

  const resolved = mode ?? getViewMode(host.qspace)

  if (resolved === ViewMode.Panorama) {

    applyPanoramaCurrentFloorFromModel(host, {
      force: options?.forcePanorama ?? false,
    })

  } else if (resolved === ViewMode.Floorplan) {

    applyFloorplanDefaultFloor(host, resolved, {
      force: options?.forceFloorplan ?? false,
    })

  }

}

/** 全景视图：按当前点位 / model.floor.idx 同步选中层 */
export function applyPanoramaCurrentFloorFromModel(
  host: FloorSwitchHost,
  options?: { force?: boolean },
): void {

  if (!host.qspace) {

    return

  }

  if (isPanoramaViewMode(host.qspace)) {

    rememberStableViewMode(host, ViewMode.Panorama)

  }

  const floors = host.option.floors ?? []

  if (floors.length === 0) {

    return

  }

  if (!options?.force) {

    const explicitFloor = host.option?.currentFloor

    if (explicitFloor !== undefined && explicitFloor !== 'all') {

      return

    }

  }

  const idx = resolvePanoramaCurrentFloor(host.qspace, floors)

  if (idx === null) {

    return

  }

  setCurrentFloor(host, idx)

}

/** 平面视图：默认选中第一层并同步 SDK 楼层透明度与启用状态 */
export function applyFloorplanDefaultFloor(
  host: FloorSwitchHost,
  mode?: string,
  options?: { force?: boolean },
): void {

  const floors = host.option.floors ?? []

  if (!host.qspace || floors.length === 0) {

    return

  }

  const resolved = mode ?? getViewMode(host.qspace)

  if (resolved !== ViewMode.Floorplan) {

    return

  }

  if (!options?.force) {

    const explicitFloor = host.option?.currentFloor

    if (explicitFloor !== undefined && explicitFloor !== 'all') {

      return

    }

  }

  const firstIdx = resolveFirstFloorIdx(floors)

  if (firstIdx === null) {

    return

  }

  setCurrentFloor(host, firstIdx)

  applyFloorSelection(host.qspace, firstIdx, floors)

}

/** 首入视图：core.loaded 后，当前为平面视图时默认选中第一层 */
function applyInitialEntryView(host: FloorSwitchHost, mode?: string): void {

  const resolved = mode ?? getViewMode(host.qspace)

  if (resolved !== ViewMode.Floorplan) {

    return

  }

  applyFloorplanDefaultFloor(host, resolved, { force: true })

}

/** core.loaded：同步 enabled；平面视图首入默认第一层 */
export function handleCoreLoaded(host: FloorSwitchHost): void {

  syncVisibility(host)

  const mode = host.qspace?.view?.mode

  rememberStableViewMode(host, mode)

  syncEnabledFromViewMode(host, mode)

  applyInitialEntryView(host, mode)

  host.requestUpdate()

}

/** 视图模式变化：过渡中禁用并恢复全部楼层；切到全景 / 平面时同步默认楼层 */
export function handleViewModeChange(host: FloorSwitchHost, mode: string): void {

  if (mode === ViewMode.Transitioning) {

    resetToAllOnTransitioning(host)

  } else {

    rememberStableViewMode(host, mode)

  }

  syncEnabledFromViewMode(host, mode)

  if (mode !== ViewMode.Transitioning) {

    syncDefaultFloorForViewMode(host, mode, {
      forceFloorplan: mode === ViewMode.Floorplan,
      forcePanorama: mode === ViewMode.Panorama,
    })

    if (mode === ViewMode.Panorama) {

      queueMicrotask(() => {

        if (!isPanoramaViewMode(host.qspace)) {

          return

        }

        applyPanoramaCurrentFloorFromModel(host, { force: true })
        host.requestUpdate()

      })

    } else if (mode === ViewMode.Floorplan) {

      queueMicrotask(() => {

        if (getViewMode(host.qspace) !== ViewMode.Floorplan) {

          return

        }

        applyFloorplanDefaultFloor(host, ViewMode.Floorplan, { force: true })
        host.requestUpdate()

      })

    }

  }

  host.requestUpdate()

}

/** 点位切换开始：全景下禁用按钮 */
export function handleWaypointStart(host: FloorSwitchHost): void {

  if (isPanoramaViewMode(host.qspace)) {

    setFloorSwitchEnabled(host, false)

    host.requestUpdate()

  }

}

/** 点位切换完成：同步选中层；楼层与选中态不一致或用户点击楼层切换完成后派发 complete */
export function handleWaypointComplete(
  host: FloorSwitchHost,
  data?: { current_pano_id?: string },
): void {

  const pending = pendingUserFloorSwitch.get(host)

  if (isPanoramaViewMode(host.qspace)) {

    const floors = host.option.floors ?? []
    const locationId = data?.current_pano_id
      ?? resolveCurrentPanoramaLocationId(host.qspace)
      ?? ''
    const idx = locationId
      ? resolveFloorIdxByLocationId(host.qspace, locationId, floors)
      : null

    if (idx !== null) {

      if (`${getCurrentFloor(host)}` !== `${idx}`) {

        setCurrentFloor(host, idx)
        dispatchComplete(host, idx)

      } else if (pending !== undefined) {

        dispatchComplete(host, pending)

      }

      pendingUserFloorSwitch.delete(host)

    } else {

      applyPanoramaCurrentFloorFromModel(host, { force: true })

      if (pending !== undefined) {

        dispatchComplete(host, pending)
        pendingUserFloorSwitch.delete(host)

      }

    }

  }

  syncEnabledFromViewMode(host)

  host.requestUpdate()

}

/** 点击某一楼层（或全部） */
export function handleSelectFloor(
  host: FloorSwitchHost,
  floorIndex: number | 'all',
  e: Event,
): void {

  if (!host.enabled) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  if (`${floorIndex}` === `${getCurrentFloor(host)}`) {

    return

  }

  dispatchClick(host, floorIndex, e)

  setCurrentFloor(host, floorIndex)

  if (host.qspace) {

    if (isPanoramaViewMode(host.qspace)) {

      setFloorSwitchEnabled(host, false)

    }

    applyFloorSelection(host.qspace, floorIndex, host.option.floors ?? [])

    if (floorIndex !== 'all' && !isPanoramaViewMode(host.qspace)) {

      dispatchComplete(host, floorIndex)

    } else if (floorIndex !== 'all' && isPanoramaViewMode(host.qspace)) {

      pendingUserFloorSwitch.set(host, floorIndex)

    }

  } else if (floorIndex !== 'all') {

    dispatchComplete(host, floorIndex)

  }

  host.requestUpdate()

}

export function handleScrollUp(host: FloorSwitchHost): void {

  if (!host.enabled || host.scrollOffset === 0) {

    return

  }

  host.downActive = true
  host.scrollOffset += 1

  host.requestUpdate()

}

export function handleScrollDown(host: FloorSwitchHost): void {

  if (!host.enabled) {

    return

  }

  const floorList = host.option.floors ?? []
  const { scrollOffset } = host

  if (-scrollOffset + SCROLLABLE_FLOOR_COUNT >= floorList.length) {

    return

  }

  if (-scrollOffset + SCROLLABLE_FLOOR_COUNT === floorList.length - 1) {

    host.downActive = false

  }

  host.upActive = true
  host.scrollOffset -= 1

  host.requestUpdate()

}

export function getTranslateStyle(host: FloorSwitchHost): string {

  return `transform: translateY(${host.scrollOffset * FLOOR_ITEM_HEIGHT}px)`

}

export function isAllFloorActive(host: FloorSwitchHost): boolean {

  return `${getCurrentFloor(host)}` === 'all'

}

export function isFloorActive(host: FloorSwitchHost, idx: number): boolean {

  return `${idx}` === `${getCurrentFloor(host)}`

}

export function showScrollArrows(host: FloorSwitchHost): boolean {

  return (host.option.floors?.length ?? 0) > SCROLLABLE_FLOOR_COUNT

}

export function isUpArrowActive(host: FloorSwitchHost): boolean {

  return host.upActive && host.scrollOffset !== 0

}
