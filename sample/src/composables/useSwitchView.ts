/**
 * 全景切换 option 类型（演示页用）
 * 按钮 enabled 由 lit-switch-*-view 内部根据 qspace 事件自动管理
 */

export type PanoramaSwitchOption = {
  locationId?: string
  quaternion?: {
    x: number
    y: number
    z: number
    w: number
  }
}
