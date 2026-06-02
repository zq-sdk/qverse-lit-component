/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floorplan-view 点击交互流程
 */

import { ViewMode } from '@/enum/view.mode'
import { dispatchClick, dispatchComplete } from './events.js'
import { turnToFloorplanView } from './logic.js'

export type FloorplanViewHost = HTMLElement & {

  qspace: any
  buttonEnabled: boolean
  setSwitching: (value: boolean) => void
  isSwitching: () => boolean
  setCurrentView: (value: boolean) => void
  isCurrentView: () => boolean

}

export function handleFloorplanClick(host: FloorplanViewHost, e: Event) {

  if (!host.buttonEnabled || host.isSwitching() || host.isCurrentView()) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  dispatchClick(host, e)

  if (!host.qspace) {

    return

  }

  host.setSwitching(true)

  turnToFloorplanView(host.qspace, () => {

    dispatchComplete(host, e)
    host.setSwitching(false)
    host.setCurrentView(true)

  })

}

export function handelViewModeChange(host: FloorplanViewHost, mode: string) {

  // console.log('on mode change', mode);

  switch (mode) {

    case ViewMode.Transitioning:
      host.setSwitching(true)
      break

    case ViewMode.Floorplan:
      host.setSwitching(false)
      host.setCurrentView(true)
      break

    case ViewMode.Dollhouse:
      host.setSwitching(false)
      host.setCurrentView(false)
      break

    case ViewMode.Panorama:
      host.setSwitching(false)
      host.setCurrentView(false)
      break

    default:
      break

  }

}
