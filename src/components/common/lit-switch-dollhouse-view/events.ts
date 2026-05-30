/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 自定义事件派发
 */

import { CLICK_EVENT, COMPLETE_EVENT, VIEW } from './constants.js'

export function dispatchClick(host: HTMLElement, originalEvent: Event) {

  host.dispatchEvent(new CustomEvent(CLICK_EVENT, {
    bubbles: true,
    composed: true,
    detail: {
      view: VIEW,
      originalEvent,
    },
  }))

}

export function dispatchComplete(host: HTMLElement, originalEvent: Event) {

  host.dispatchEvent(new CustomEvent(COMPLETE_EVENT, {
    bubbles: true,
    composed: true,
    detail: {
      view: VIEW,
      originalEvent,
    },
  }))

}
