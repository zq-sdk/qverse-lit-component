/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 自定义事件派发
 */

import { CLICK_EVENT, COMPLETE_EVENT } from './constants.js'

export function dispatchClick(
  host: HTMLElement,
  floor: number | 'all',
  originalEvent?: Event,
) {

  host.dispatchEvent(new CustomEvent(CLICK_EVENT, {
    bubbles: true,
    composed: true,
    detail: {
      floor,
      originalEvent,
    },
  }))

}

export function dispatchComplete(
  host: HTMLElement,
  floor: number | 'all',
) {

  host.dispatchEvent(new CustomEvent(COMPLETE_EVENT, {
    bubbles: true,
    composed: true,
    detail: {
      floor,
    },
  }))

}
