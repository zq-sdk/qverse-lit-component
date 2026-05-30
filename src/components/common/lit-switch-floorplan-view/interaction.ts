/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floorplan-view 点击交互流程
 */

import { dispatchClick, dispatchComplete } from './events.js'
import { turnToFloorplanView } from './logic.js'

export type FloorplanViewHost = HTMLElement & {

  qspace: any
  buttonEnabled: boolean
  switching: boolean

}

export function handleFloorplanClick(host: FloorplanViewHost, e: Event) {

  if (!host.buttonEnabled || host.switching) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  dispatchClick(host, e)

  if (!host.qspace) {

    return

  }

  turnToFloorplanView(host.qspace, () => {

    dispatchComplete(host, e)

  })

}
