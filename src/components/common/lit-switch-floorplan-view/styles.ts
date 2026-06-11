/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floorplan-view 样式
 */

import { css, unsafeCSS } from 'lit'
import iconUrl from './assets/icon.png?url'

export const styles = css`
  :host {
    display: inline-block;
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

  .mode-item.floorplan {
    background-color: rgba(0, 0, 0, 0);
    background-image: var(--lit-mode-floorplan-icon, url(${unsafeCSS(iconUrl)}));
  }

  :host(:not([enabled])) {
    pointer-events: none;
    opacity: 0.5;
  }

  :host(:not([enabled])) .mode-item {
    cursor: not-allowed;
  }
`
