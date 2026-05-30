/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 点击交互流程
 */

import { dispatchClick, dispatchComplete } from './events.js'
import { turnToPanoramaView } from './logic.js'

export type PanoramaViewHost = HTMLElement & {

  qspace: any
  buttonEnabled: boolean
  switching: boolean

}

/** 点击交互：校验 → 派发 click → 执行 qspace 切换 → 派发 complete */
export function handlePanoramaClick(host: PanoramaViewHost, e: Event) {

  if (!host.buttonEnabled || host.switching) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  dispatchClick(host, e)

  if (!host.qspace) {

    return

  }

  turnToPanoramaView(host.qspace, () => {

    dispatchComplete(host, e)

  })

}
