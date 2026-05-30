/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 样式
 */

import { css, unsafeCSS } from 'lit'
import iconUrl from './assets/icon.png?url'

export const styles = css`
  :host {
    display: inline-block;
  }

  :host([active]) {
    display: none;
  }

  .mode-item {
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    background-repeat: no-repeat;
    background-size: 26px 26px;
    background-position: center;
    cursor: pointer;
  }

  .mode-item.dollhouse {
    background-color: rgba(255, 0, 0, 0.4);
    background-image: var(--lit-mode-dollhouse-icon, url(${unsafeCSS(iconUrl)}));
  }

  :host(:not([button-enabled])),
  :host([switching]) {
    pointer-events: none;
    opacity: 0.5;
  }

  :host(:not([button-enabled])) .mode-item,
  :host([switching]) .mode-item {
    cursor: not-allowed;
  }
`
