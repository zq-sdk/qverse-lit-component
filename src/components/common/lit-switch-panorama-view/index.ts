/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 组件注册与属性声明
 */

import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { handlePanoramaClick } from './interaction.js'
import { booleanAttr } from './properties.js'
import { styles } from './styles.js'
import { renderPanoramaView } from './template.js'

/** 切换到 panorama 视图；qspace 须由宿主通过 :qspace 传入；active 时隐藏 */
@safeCustomElement(TAG)
export class LitSwitchPanoramaView extends LitElement {

  @property({ attribute: false })
  qspace: any = null

  @property({
    type: Boolean,
    attribute: 'button-enabled',
    reflect: true,
    converter: booleanAttr,
  })
  buttonEnabled = false

  @property({ type: Boolean, reflect: true })
  active = false

  @property({ type: Boolean, reflect: true })
  switching = false

  static styles = styles

  private _onClick = (e: Event) => {

    handlePanoramaClick(this, e)

  }

  render() {

    return renderPanoramaView(this._onClick)

  }

}

declare global {

  interface HTMLElementTagNameMap {

    [TAG]: LitSwitchPanoramaView

  }

}
