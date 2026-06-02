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

export function handelCoreLoaded(host: DollhouseViewHost) {

  syncEnabledFromMode(host, host.qspace?.view?.mode)

}

export function handelViewModeChange(host: DollhouseViewHost, mode: string) {

  syncEnabledFromMode(host, mode)

}
