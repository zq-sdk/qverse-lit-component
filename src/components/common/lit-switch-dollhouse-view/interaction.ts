/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 点击交互流程
 */

import { dispatchClick, dispatchComplete } from './events.js'
import { turnToDollhouseView } from './logic.js'

export type DollhouseViewHost = HTMLElement & {

  qspace: any
  buttonEnabled: boolean
  switching: boolean

}

export function handleDollhouseClick(host: DollhouseViewHost, e: Event) {

  if (!host.buttonEnabled || host.switching) {

    e.preventDefault()
    e.stopPropagation()

    return

  }

  dispatchClick(host, e)

  if (!host.qspace) {

    return

  }

  turnToDollhouseView(host.qspace, () => {

    dispatchComplete(host, e)

  })

}
