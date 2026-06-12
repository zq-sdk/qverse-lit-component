/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 组件注册与属性声明
 */

import { LitElement, PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import { booleanAttr } from './properties.js'
import { styles } from './styles.js'
import { renderDollhouseView } from './template.js'
import { handleDollhouseClick, handelViewModeChange, handelCoreLoaded, syncEnabledFromMode, handelWaypointStart, handelWaypointComplete } from './interaction.js'

/** 切换到 dollhouse 视图；qspace 须由宿主通过 :qspace 传入 */
@safeCustomElement(TAG)
export class LitSwitchDollhouseView extends LitElement {

  /** qspace SDK 实例；仅 JS 属性绑定，不映射 HTML attribute（对象无法序列化） */
  @property({ attribute: false })
  public qspace: any = null

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
  public enabled = false

  /**
   * 设置是否可点击
   * @param value 是否可点击
   */
  public setEnabled(value: boolean) {

    this.enabled = value

    this.toggleAttribute('enabled', value)

  }

  /**
   * 样式
   */
  public static styles = styles

  /**
   * 点击事件
   * @param e 事件
   */
  public _onClick = (e: Event) => {

    handleDollhouseClick(this, e)

  }

  /**
   * core 加载事件
   */
  private _onCoreLoaded = () => {

    handelCoreLoaded(this)

  }

  /**
   * view 模式改变事件
   * @param mode 模式
   */
  private _onViewModeChange = (mode: string) => {

    handelViewModeChange(this, mode)

  }

  /**
   * 切换起点事件
   */
  private _onSwitchWaypointStart = () => {

    handelWaypointStart(this)

  }

  /**
   * 切换终点事件
   */
  private _onSwitchWaypointComplete = () => {

    handelWaypointComplete(this)

  }

  /**
   * 渲染模板
   */
  render() {

    return renderDollhouseView(this._onClick)

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

          syncEnabledFromMode(this, this.qspace.view.mode)

        }

      }

      this.qspace.core.addEventListener('loaded', this._onCoreLoaded)

      this.qspace.view.addEventListener('mode.change', this._onViewModeChange)

      this.qspace.model.addEventListener('switch.waypoint.start', this._onSwitchWaypointStart)

      this.qspace.model.addEventListener('switch.waypoint.complete', this._onSwitchWaypointComplete)

    }

  }

  /**
   * 组件断开生命周期
   */
  disconnectedCallback() {

    if (this.qspace) {

      this.qspace.core.removeEventListener('loaded', this._onCoreLoaded)

      this.qspace.view.removeEventListener('mode.change', this._onViewModeChange)

      this.qspace.model.removeEventListener('switch.waypoint.start', this._onSwitchWaypointStart)

      this.qspace.model.removeEventListener('switch.waypoint.complete', this._onSwitchWaypointComplete)

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

/**
 * 全局声明
 */
declare global {

  interface HTMLElementTagNameMap {

    [TAG]: LitSwitchDollhouseView

  }

}
