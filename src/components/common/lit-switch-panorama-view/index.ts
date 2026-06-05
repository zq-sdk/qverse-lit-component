/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 组件注册与属性声明
 */

import { LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { handlePanoramaClick, handelViewModeChange, handelCoreLoaded, syncEnabledFromMode, handelWaypointStart, handelWaypointComplete } from './interaction.js'
import { booleanAttr, type PanoramaSwitchOption } from './properties.js'
import { styles } from './styles.js'
import { renderPanoramaView } from './template.js'
import { ViewMode } from '@/enum/view.mode.js'

/** 切换到 panorama 视图；qspace 须由宿主通过 :qspace 传入 */
@safeCustomElement(TAG)
export class LitSwitchPanoramaView extends LitElement {

  /** qspace SDK 实例；仅 JS 属性绑定，不映射 HTML attribute（对象无法序列化） */
  @property({
    type: Object,
    attribute: false
  })
  qspace: any = null

  /**
   * 是否可点击；由 core.loaded / mode.change 自动同步，宿主亦可覆盖
   * HTML: enabled / Vue: :enabled
   */
  @property({
    type: Boolean, // 属性类型
    attribute: 'enabled', // HTML attribute
    reflect: true, // 反射属性到 HTML attribute
    converter: booleanAttr, // 布尔属性转换器
  })
  enabled = false

  /**
   * 切换全景视图参数；仅 JS 属性绑定
   * Vue: :option="{ locationId, quaternion }"
   */
  @property({
    type: Object,
    attribute: false
  })
  option: PanoramaSwitchOption = {}

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

  private _onSwitchWaypointStart = () => {

    handelWaypointStart(this);

  }

  private _onSwitchWaypointComplete = () => {

    handelWaypointComplete(this);

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

    console.log(`${ViewMode.Panorama} connectedCallback`)

    super.connectedCallback()

    if (this.qspace) {

      if (this.qspace.view) {

        // 待优化, 不错判断会报错
        if (null !== this.qspace.commonEvents.coreEvents.getCurrentMode()) {

          syncEnabledFromMode(this, this.qspace.view.mode);

        }

      }

      this.qspace.core.addEventListener('loaded', this._onCoreLoaded);

      this.qspace.view.addEventListener('mode.change', this._onViewModeChange);

      this.qspace.model.addEventListener('switch.waypoint.start', this._onSwitchWaypointStart);

      this.qspace.model.addEventListener('switch.waypoint.complete', this._onSwitchWaypointComplete);

    }

  }

  /**
   * 组件断开生命周期
   */
  disconnectedCallback() {

    console.log(`${ViewMode.Panorama} disconnectedCallback`)

    if (this.qspace) {

      this.qspace.core.removeEventListener('loaded', this._onCoreLoaded);

      this.qspace.view.removeEventListener('mode.change', this._onViewModeChange);

      this.qspace.model.removeEventListener('switch.waypoint.start', this._onSwitchWaypointStart);

      this.qspace.model.removeEventListener('switch.waypoint.complete', this._onSwitchWaypointComplete);

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
