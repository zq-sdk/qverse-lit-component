/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floorplan-view 组件注册与属性声明
 */

import { LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { handleFloorplanClick, handelViewModeChange, handelCoreLoaded, syncEnabledFromMode, handelWaypointStart, handelWaypointComplete } from './interaction.js'
import { booleanAttr } from './properties.js'
import { styles } from './styles.js'
import { renderFloorplanView } from './template.js'

/** 切换到 floorplan 视图；qspace 须由宿主通过 :qspace 传入 */
@safeCustomElement(TAG)
export class LitSwitchFloorplanView extends LitElement {

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

  setEnabled(value: boolean) {

    this.enabled = value

    this.toggleAttribute('enabled', value)

  }

  static styles = styles

  private _onClick = (e: Event) => {

    handleFloorplanClick(this, e)

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

    return renderFloorplanView(this._onClick)

  }

  /**
   * 组件连接生命周期
   */
  connectedCallback() {

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

    [TAG]: LitSwitchFloorplanView

  }

}
