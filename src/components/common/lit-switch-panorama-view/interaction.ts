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
  enabled: boolean
  setEnabled: (value: boolean) => void

}

/** 根据 qspace.view.mode 同步 enabled：当前视图或过渡中不可点 */
export function syncEnabledFromMode(host: PanoramaViewHost, mode: string | undefined) {

  switch (mode) {

    case ViewMode.Transitioning:
    case ViewMode.Panorama:
      host.setEnabled(false)
      break

    case ViewMode.Dollhouse:
    case ViewMode.Floorplan:
      host.setEnabled(true)
      break

    default:
      break

  }

}

/** 点击交互：校验 → 派发 click → 执行 qspace 切换 → 派发 complete */
export function handlePanoramaClick(host: PanoramaViewHost, e: Event) {

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

  console.log('host.option', host.option);

  turnToPanoramaView(host.qspace, host.option, () => {

    dispatchComplete(host, e)

  })

}

export function handelCoreLoaded(host: PanoramaViewHost) {

  syncEnabledFromMode(host, host.qspace?.view?.mode)

}

export function handelViewModeChange(host: PanoramaViewHost, mode: string) {

  syncEnabledFromMode(host, mode)

}
