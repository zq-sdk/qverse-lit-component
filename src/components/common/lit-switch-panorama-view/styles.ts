/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 样式
 */

import { css, unsafeCSS } from 'lit'
import panoramaIcon from './assets/panorama-btn.svg?raw'

const defaultIcon = `url("data:image/svg+xml,${encodeURIComponent(panoramaIcon)}")`

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
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    background-repeat: no-repeat;
    background-size: 26px 26px;
    background-position: center;
    cursor: pointer;
    background-image: var(--lit-mode-panorama-icon, ${unsafeCSS(defaultIcon)});
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
