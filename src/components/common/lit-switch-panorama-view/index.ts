/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 组件注册与属性声明
 */

import { LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { handlePanoramaClick, handelViewModeChange, handelCoreLoaded } from './interaction.js'
import { booleanAttr, type PanoramaSwitchOption } from './properties.js'
import { styles } from './styles.js'
import { renderPanoramaView } from './template.js'

/** 切换到 panorama 视图；qspace 须由宿主通过 :qspace 传入 */
@safeCustomElement(TAG)
export class LitSwitchPanoramaView extends LitElement {

  /** qspace SDK 实例；仅 JS 属性绑定，不映射 HTML attribute（对象无法序列化） */
  @property({ attribute: false })
  qspace: any = null

  /**
   * 是否可点击；由 core.loaded / mode.change 自动同步，宿主亦可覆盖
   * HTML: enabled / Vue: :enabled
   */
  @property({
    type: Boolean,
    attribute: 'enabled',
    reflect: true,
    converter: booleanAttr,
  })
  enabled = false

  /**
   * 切换全景视图参数；仅 JS 属性绑定
   * Vue: :option="{ locationId, quaternion }"
   */
  @property({ attribute: false })
  option: PanoramaSwitchOption | null = null

  setEnabled(value: boolean) {

    this.enabled = value

    this.toggleAttribute('enabled', value)

  }

  static styles = styles

  private _onClick = (e: Event) => {

    handlePanoramaClick(this, e)

  }

  private _onCoreLoaded = () => {

    handelCoreLoaded(this);

  }

  private _onViewModeChange = (mode: string) => {

    handelViewModeChange(this, mode);

  }

  /**
   * 渲染模板
   */
  render() {

    return renderPanoramaView(this._onClick)

  }

  /**
   * 组件连接生命周期
   */
  connectedCallback() {

    super.connectedCallback()

    if (this.qspace) {

      this.qspace.core.addEventListener('loaded', this._onCoreLoaded);

      this.qspace.view.addEventListener('mode.change', this._onViewModeChange);

    }

  }

  /**
   * 组件断开生命周期
   */
  disconnectedCallback() {

    if (this.qspace) {

      this.qspace.core.removeEventListener('loaded', this._onCoreLoaded);

      this.qspace.view.removeEventListener('mode.change', this._onViewModeChange);

    }

    super.disconnectedCallback()

  }

  /**
   * 第一次更新
   */
  firstUpdated(changed: Map<string, unknown>) {

    super.firstUpdated(changed)

  }

  /**
   * 组件更新
   */
  updated(changed: Map<string, unknown>) {

    super.updated(changed)

  }

  /**
   * 将要更新
   */
  protected willUpdate(_changedProperties: PropertyValues): void {

  }

}

declare global {

  interface HTMLElementTagNameMap {

    [TAG]: LitSwitchPanoramaView

  }

}
