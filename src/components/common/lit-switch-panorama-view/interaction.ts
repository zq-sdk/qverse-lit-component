/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 点击交互流程
 */

import { ViewMode } from '@/enum/view.mode'
import { dispatchClick, dispatchComplete } from './events.js'
import { turnToPanoramaView } from './logic.js'
import type { PanoramaSwitchOption } from './properties.js'

export type PanoramaViewHost = HTMLElement & {

  qspace: any
  option: PanoramaSwitchOption | null
  buttonEnabled: boolean
  setSwitching: (value: boolean) => void
  isSwitching: () => boolean
  setCurrentView: (value: boolean) => void
  isCurrentView: () => boolean

}

/** 点击交互：校验 → 派发 click → 执行 qspace 切换 → 派发 complete */
export function handlePanoramaClick(host: PanoramaViewHost, e: Event) {

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

  turnToPanoramaView(host.qspace, host.option, () => {

    dispatchComplete(host, e)

    host.setSwitching(false)
    host.setCurrentView(true)

  })

}

export function handelViewModeChange(host: PanoramaViewHost, mode: string) {

  // console.log('on mode change', mode);

  switch (mode) {

    case ViewMode.Transitioning:
      host.setSwitching(true)
      break

    case ViewMode.Panorama:
      host.setSwitching(false)
      host.setCurrentView(true)
      break

    case ViewMode.Dollhouse:
      host.setSwitching(false)
      host.setCurrentView(false)
      break

    case ViewMode.Floorplan:
      host.setSwitching(false)
      host.setCurrentView(false)
      break

    default:
      break

  }

}
