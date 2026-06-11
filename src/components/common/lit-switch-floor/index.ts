/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 组件注册与属性声明
 */

import { LitElement } from 'lit'
import { property, state } from 'lit/decorators.js'
import { safeCustomElement } from '../../../utils/define-lit-element.js'
import { TAG } from './constants.js'
import {
  handleCoreLoaded,
  handleScrollDown,
  handleScrollUp,
  handleSelectFloor,
  handleViewModeChange,
  handleWaypointComplete,
  handleWaypointStart,
  syncAllFloorEnabledFromViewMode,
  syncVisibility,
  trySyncIfCoreAlreadyLoaded,
  type FloorSwitchHost,
} from './interaction.js'
import type { FloorSwitchOption } from './properties.js'
import { booleanAttr } from './properties.js'
import { styles } from './styles.js'
import { renderFloorSwitch } from './template.js'

/**
 * 楼层切换
 * - 楼层列表、选中层由宿主通过 :option 传入；选中高亮由组件写 option.currentFloor 维护
 * - :qspace 可选，点击后按 view.mode 调用 SDK；亦可完全由宿主监听 lit-click 处理
 */
@safeCustomElement(TAG)
export class LitSwitchFloor extends LitElement implements FloorSwitchHost {

  /** qspace SDK 实例；可选，用于按视图模式调用 SDK */
  @property({ attribute: false })
  qspace: any = null

  /** 楼层配置；Vue: :option="{ floors: [{ idx, name }], currentFloor, allLabel }" */
  @property({ attribute: false })
  option: FloorSwitchOption = { currentFloor: 'all' }

  /**
   * 是否可点击；视图过渡（transitioning）、全景楼层/点位切换进行中为 false
   * HTML: enabled / Vue: :enabled
   */
  @property({
    type: Boolean,
    attribute: 'enabled',
    reflect: true,
    converter: booleanAttr,
  })
  enabled = false

  @state()
  allFloorEnabled = true

  @state()
  scrollOffset = 0

  @state()
  upActive = false

  @state()
  downActive = false

  static styles = styles

  setEnabled(value: boolean) {

    this.enabled = value

    this.toggleAttribute('enabled', value)

  }

  setAllFloorEnabled(value: boolean) {

    if (this.allFloorEnabled === value) {

      return

    }

    this.allFloorEnabled = value

  }

  onSelectFloor = (floorIndex: number | 'all', e: Event) => {

    handleSelectFloor(this, floorIndex, e)

  }

  onScrollUp = () => {

    handleScrollUp(this)

  }

  onScrollDown = () => {

    handleScrollDown(this)

  }

  private _onCoreLoaded = () => {

    handleCoreLoaded(this)

  }

  private _onViewModeChange = (payload: string) => {

    handleViewModeChange(this, payload)

  }

  private _onSwitchWaypointStart = () => {

    handleWaypointStart(this)

  }

  private _onSwitchWaypointComplete = (data?: { current_pano_id?: string }) => {

    handleWaypointComplete(this, data)

  }

  render() {

    return renderFloorSwitch(this)

  }

  connectedCallback() {

    console.log('switch floor comp connected')

    super.connectedCallback()

    this.setEnabled(false)

    this.toggleAttribute('hidden', true)

    syncVisibility(this)

    if (this.qspace) {

      this._bindQspaceEvents()

    }

  }

  disconnectedCallback() {

    console.log('switch floor comp disconnected')

    if (this.qspace) {

      this._unbindQspaceEvents()

    }

    super.disconnectedCallback()

  }

  updated(changed: Map<string, unknown>) {

    if (changed.has('option')) {

      syncVisibility(this)

      syncAllFloorEnabledFromViewMode(this)

    }

  }

  private _bindQspaceEvents() {

    this.qspace.core?.addEventListener?.('loaded', this._onCoreLoaded)

    this.qspace.view?.addEventListener?.('mode.change', this._onViewModeChange)

    this.qspace.model?.addEventListener?.('switch.waypoint.start', this._onSwitchWaypointStart)

    this.qspace.model?.addEventListener?.('switch.waypoint.complete', this._onSwitchWaypointComplete)

    trySyncIfCoreAlreadyLoaded(this)

  }

  private _unbindQspaceEvents() {

    this.qspace.core?.removeEventListener?.('loaded', this._onCoreLoaded)

    this.qspace.view?.removeEventListener?.('mode.change', this._onViewModeChange)

    this.qspace.model?.removeEventListener?.('switch.waypoint.start', this._onSwitchWaypointStart)

    this.qspace.model?.removeEventListener?.('switch.waypoint.complete', this._onSwitchWaypointComplete)

  }

}

declare global {

  interface HTMLElementTagNameMap {

    [TAG]: LitSwitchFloor

  }

}
