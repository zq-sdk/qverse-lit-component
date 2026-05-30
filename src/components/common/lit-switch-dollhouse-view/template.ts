/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 渲染模板
 */

import { html, type TemplateResult } from 'lit'
import { VIEW } from './constants.js'

export function renderDollhouseView(onClick: (e: Event) => void): TemplateResult {

  return html`
    <div
      class="mode-item ${VIEW}"
      part="button"
      role="button"
      tabindex="0"
      aria-label=${VIEW}
      @click=${onClick}
    ></div>
  `

}
