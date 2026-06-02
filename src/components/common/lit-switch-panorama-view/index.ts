/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 组件注册与属性声明
 */

import { LitElement, PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { handlePanoramaClick, handelViewModeChange } from './interaction.js'
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
   * 是否允许点击；默认 false，场景就绪后由宿主设为 true
   * HTML: button-enabled / Vue: :button-enabled
   */
  @property({
    type: Boolean,
    attribute: 'button-enabled',
    reflect: true,
    converter: booleanAttr,
  })
  buttonEnabled = false

  /**
   * 切换全景视图参数；仅 JS 属性绑定
   * Vue: :option="{ locationId, quaternion }"
   */
  @property({ attribute: false })
  option: PanoramaSwitchOption | null = null

  /** 切换进行中（内部状态）；调用 qspace 前禁用，complete 后恢复 */
  @state()
  private _switching = false

  /** 切换完成后禁用当前按钮，避免重复切换 */
  @state()
  private _isCurrentView = false

  setSwitching(value: boolean) {

    this._switching = value
    this.toggleAttribute('switching', value)

  }

  isSwitching() {

    return this._switching

  }

  setCurrentView(value: boolean) {

    this._isCurrentView = value
    this.toggleAttribute('current-view', value)

  }

  isCurrentView() {

    return this._isCurrentView

  }

  static styles = styles

  private _onClick = (e: Event) => {

    handlePanoramaClick(this, e)

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

    // console.log('connectedCallback', this);

    this.qspace.view.addEventListener('mode.change', this._onViewModeChange);

    super.connectedCallback()

  }

  /**
   * 组件断开生命周期
   */
  disconnectedCallback() {

    // console.log('disconnectedCallback', this);

    this.setSwitching(false)
    this.setCurrentView(false)

    this.qspace.view.removeEventListener('mode.change', this._onViewModeChange);

    super.disconnectedCallback()

  }

  /**
   * 第一次更新
   */
  firstUpdated(changed: Map<string, unknown>) {

    // console.log('firstUpdated', this, changed);

    super.firstUpdated(changed)

  }

  /**
   * 组件更新
   */
  updated(changed: Map<string, unknown>) {

    // console.log('updated', this, changed);

    super.updated(changed)

  }

  /**
   * 将要更新
   */
  protected willUpdate(_changedProperties: PropertyValues): void {

    // console.log('willUpdate', this, _changedProperties);

  }

}

declare global {

  interface HTMLElementTagNameMap {

    [TAG]: LitSwitchPanoramaView

  }

}
