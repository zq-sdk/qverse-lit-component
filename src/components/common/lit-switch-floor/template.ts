/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 渲染模板
 */

import { html, nothing } from 'lit'
import {
  getAllLabel,
  getFloorLabel,
  getFloorListReverse,
  getTranslateStyle,
  isAllFloorActive,
  isFloorActive,
  isFloorSwitchVisible,
  isUpArrowActive,
  showScrollArrows,
  type FloorSwitchHost,
} from './interaction.js'

export function renderFloorSwitch(host: FloorSwitchHost) {

  if (!isFloorSwitchVisible(host)) {

    return nothing

  }

  const floorListReverse = getFloorListReverse(host)
  const scrollable = showScrollArrows(host)

  return html`
    <div class="switch-floor-wrap">
      <ul class="floor-list-wrap">
        ${scrollable ? html`
          <li>
            <div
              class="scroll-arrow up ${isUpArrowActive(host) ? 'active' : ''}"
              @click=${() => host.onScrollUp?.()}
            ></div>
          </li>
        ` : nothing}

        <li @click=${(e: Event) => host.onSelectFloor?.('all', e)}>
          <span class="floor-label ${isAllFloorActive(host) ? 'active' : ''}">
            ${getAllLabel(host)}
          </span>
        </li>

        <div class="floors">
          <div class="translate" style=${getTranslateStyle(host)}>
            ${floorListReverse.map((item) => html`
              <li @click=${(e: Event) => host.onSelectFloor?.(item.idx, e)}>
                <span class="floor-label ${isFloorActive(host, item.idx) ? 'active' : ''}">
                  ${getFloorLabel(host, item.idx)}
                </span>
              </li>
            `)}
          </div>
        </div>

        ${scrollable ? html`
          <li>
            <div
              class="scroll-arrow down ${host.downActive ? 'active' : ''}"
              @click=${() => host.onScrollDown?.()}
            ></div>
          </li>
        ` : nothing}
      </ul>
    </div>
  `

}
