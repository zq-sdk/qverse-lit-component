/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 样式
 */

import { css } from 'lit'

export const styles = css`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none;
  }

  :host(:not([enabled])) {
    pointer-events: none;
    opacity: 0.5;
  }

  :host(:not([enabled])) .floor-list-wrap li,
  :host(:not([enabled])) .scroll-arrow {
    cursor: not-allowed;
  }

  .switch-floor-wrap {
    width: 56px;
    /* background: rgba(41, 41, 41, 0.77); */
    background: rgba(255, 0, 0, 0.4);
    box-shadow: 0 4px 8px 1px rgba(255, 255, 255, 0.1);
    border-radius: 29px;
    padding: 2px 0;
  }

  .floor-list-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .floor-list-wrap li {
    list-style: none;
    cursor: pointer;
    margin: 7px 0;
    width: 56px;
  }

  .floor-label {
    display: block;
    margin: 0 auto;
    width: 80%;
    font-size: 14px;
    font-weight: bold;
    line-height: 22px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.3);
  }

  .floor-label.active {
    color: rgba(255, 255, 255, 1);
  }

  .floors {
    max-height: 108px;
    overflow: hidden;
  }

  .translate {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s;
  }

  .translate li {
    height: 22px;
  }

  .scroll-arrow {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    opacity: 0.7;
    cursor: pointer;
  }

  .scroll-arrow.up {
    border-bottom: 8px solid rgba(255, 255, 255, 0.7);
  }

  .scroll-arrow.down {
    border-top: 8px solid rgba(255, 255, 255, 0.7);
  }

  .scroll-arrow.active {
    opacity: 1;
  }
`
