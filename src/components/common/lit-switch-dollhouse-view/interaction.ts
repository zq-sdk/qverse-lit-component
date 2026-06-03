/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 点击交互流程
 */

import { ViewMode } from '@/enum/view.mode'
import { dispatchClick, dispatchComplete } from './events.js'
import { turnToDollhouseView } from './logic.js'

export type DollhouseViewHost = HTMLElement & {

  qspace: any
  enabled: boolean
  setEnabled: (value: boolean) => void

}

/** 根据 qspace.view.mode 同步 enabled：当前视图或过渡中不可点 */
export function syncEnabledFromMode(host: DollhouseViewHost, mode: string | undefined) {

  switch (mode) {

    case ViewMode.Transitioning:
    case ViewMode.Dollhouse:
      host.setEnabled(false)
      break

    case ViewMode.Floorplan:
    case ViewMode.Panorama:
      host.setEnabled(true)
      break

    default:
      break

  }

}

export function handleDollhouseClick(host: DollhouseViewHost, e: Event) {

  if (!host.enabled) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  dispatchClick(host, e)

  if (!host.qspace) {

    return

  }

  host.setEnabled(false)

  turnToDollhouseView(host.qspace, () => {

    dispatchComplete(host, e)

  })

}

/** 核心加载完成：按当前 view.mode 恢复 enabled */
export function handelCoreLoaded(host: DollhouseViewHost) {

  syncEnabledFromMode(host, host.qspace?.view?.mode)

}

/** 视图模式改变：按新模式恢复 enabled */
export function handelViewModeChange(host: DollhouseViewHost, mode: string) {

  syncEnabledFromMode(host, mode)

}

/** 全景点位切换开始：禁用视图切换按钮 */
export function handelWaypointStart(host: DollhouseViewHost) {

  console.log('handelWaypointStart')

  host.setEnabled(false)

}

/** 全景点位切换完成：按当前 view.mode 恢复 enabled */
export function handelWaypointComplete(host: DollhouseViewHost) {

  console.log('handelWaypointStart')

  syncEnabledFromMode(host, host.qspace?.view?.mode)

}
