/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 楼层切换（数据由宿主传入，按视图模式调用 SDK）
 */

import { ViewMode } from '@/enum/view.mode'
import type { FloorItem } from './properties.js'
import { INACTIVE_FLOOR_OPACITY } from './constants.js'

/**
 * 模型 API：Lit 组件接收 raw qspace（space.qspace），楼层能力在 qspace.model
 * 编辑端 Service 层使用 space.core.model 包装，此处与之对齐到同一底层 model
 */
export function resolveModel(qspace: any): any {

  return qspace?.model ?? qspace?.core?.model ?? null

}

/** 当前视图模式 */
export function getViewMode(qspace: any): string {

  try {

    return qspace?.view?.mode ?? ''

  } catch {

    return ''

  }

}

export function isPanoramaViewMode(qspace: any): boolean {

  return getViewMode(qspace) === ViewMode.Panorama

}

/** 第一层：floorList 中 idx 最小项（通常为 F1 / idx 0） */
export function resolveFirstFloorIdx(floors: FloorItem[]): number | null {

  if (floors.length === 0) {

    return null

  }

  return floors.reduce((first, floor) => (floor.idx < first.idx ? floor : first)).idx

}

/** 全景当前点位 location_id（兼容 SDK 多种字段） */
export function resolveCurrentPanoramaLocationId(qspace: any): string | null {

  const model = resolveModel(qspace)

  if (!model) {

    return null

  }

  const candidates = [
    model.pano?.location_id,
    model.pano?.id,
    model.current_pano_id,
    model.waypoint?.location_id,
    model.currentWaypoint?.location_id,
  ]

  for (const id of candidates) {

    if (typeof id === 'string' && id.length > 0) {

      return id

    }

  }

  return null

}

/** 全景视图下同步当前楼层：优先当前点位 flooridx，其次 model.floor.idx */
export function resolvePanoramaCurrentFloor(
  qspace: any,
  floors: FloorItem[],
): number | null {

  if (!isPanoramaViewMode(qspace)) {

    return null

  }

  const locationId = resolveCurrentPanoramaLocationId(qspace)

  if (locationId) {

    const fromWaypoint = resolveFloorIdxByLocationId(qspace, locationId, floors)

    if (fromWaypoint !== null) {

      return fromWaypoint

    }

  }

  const idx = resolveModel(qspace)?.floor?.idx

  if (typeof idx !== 'number') {

    return null

  }

  if (!floors.some((floor) => floor.idx === idx)) {

    return null

  }

  return idx

}

/** 根据点位 location_id 解析所在楼层 idx（须在 option.floors 内） */
export function resolveFloorIdxByLocationId(
  qspace: any,
  locationId: string,
  floors: FloorItem[],
): number | null {

  if (!locationId || floors.length === 0) {

    return null

  }

  const waypoints = resolveModel(qspace)?.waypoints

  if (!Array.isArray(waypoints)) {

    return null

  }

  const waypoint = waypoints.find(
    (item: { location_id?: string }) => item.location_id === locationId,
  )

  if (!waypoint) {

    return null

  }

  const flooridx = waypoint.flooridx

  if (typeof flooridx !== 'number') {

    return null

  }

  if (!floors.some((floor) => floor.idx === flooridx)) {

    return null

  }

  return flooridx

}

/** 全景视图：调用 model.switchFloor 切换楼层 */
export function switchFloorInPanorama(qspace: any, index: number | 'all'): void {

  const model = resolveModel(qspace)

  if (!model?.switchFloor) {

    return

  }

  if (index === 'all') {

    model.switchFloor('all')

    return

  }

  model.switchFloor(index)

}

/**
 * 3D / 平面视图：选中层 enable + 不透明，其余 disable + 半透明
 * 对齐作品编辑端 SDK Core/model.switchFloor 中非全景分支
 */
export function applyFloorVisibilityInModelView(
  qspace: any,
  index: number | 'all',
  floors: FloorItem[],
): void {

  const model = resolveModel(qspace)

  if (!model) {

    return

  }

  floors.forEach((floor) => {

    const isActive = index === 'all' || floor.idx === index

    if (isActive) {

      model.enableFloor?.(floor.idx)
      model.showFloor?.(floor.idx)
      model.setFloorOpacity?.(floor.idx, 1)

      return

    }

    model.disableFloor?.(floor.idx)
    model.setFloorOpacity?.(floor.idx, INACTIVE_FLOOR_OPACITY)

  })

}

/** 按当前视图模式执行楼层操作 */
export function applyFloorSelection(
  qspace: any,
  index: number | 'all',
  floors: FloorItem[],
): void {

  if (isPanoramaViewMode(qspace)) {

    switchFloorInPanorama(qspace, index)

    return

  }

  applyFloorVisibilityInModelView(qspace, index, floors)

}
