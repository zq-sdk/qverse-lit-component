/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 样式
 */

import { css, unsafeCSS } from 'lit'
import arrowUrl from './assets/bottom-arrow.png?url'

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
  :host(:not([enabled])) .up-arrow,
  :host(:not([enabled])) .down-arrow {
    cursor: not-allowed;
  }

  .switch-floor-wrap {
    width: 56px;
    height: auto;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0px 4px 8px 1px rgba(255, 255, 255, 0.1);
    border-radius: 29px;
    padding: 0.13rem 0;
  }

  .floor-list-wrap {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

  .floor-list-wrap li.all-floor.disabled {
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.5;
  }

  .floor-list-wrap li.all-floor.disabled .floor-label {
    cursor: not-allowed;
    color: rgba(255, 255, 255, 0.3);
  }

  .floor-list-wrap li.all-floor.disabled .floor-label.active {
    color: rgba(255, 255, 255, 0.3);
  }

  .floor-label {
    display: block;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family:
      PingFang SC-Bold,
      PingFang SC,
      sans-serif;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.3);
    line-height: 22px;
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
    position: relative;
    transition: transform 0.3s;
  }

  .translate li {
    height: 22px;
  }

  .up-arrow,
  .down-arrow {
    width: 20px;
    height: 20px;
    background-image: url(${unsafeCSS(arrowUrl)});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.7;
    margin: 0 auto;
    cursor: pointer;
  }

  .up-arrow {
    transform: rotate(180deg);
  }

  .up-arrow-active,
  .down-arrow-active {
    opacity: 1;
  }
`
