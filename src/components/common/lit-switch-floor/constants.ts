/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 常量（标签、事件名、布局）
 */

export const TAG = 'lit-switch-floor' as const

export const CLICK_EVENT = 'lit-click' as const

export const COMPLETE_EVENT = 'lit-switch-complete' as const

/** 单行高度（px），与 styles 中 .floors max-height / 3 一致 */
export const FLOOR_ITEM_HEIGHT = 36

/** 超过该数量时显示上下滚动箭头 */
export const SCROLLABLE_FLOOR_COUNT = 3

/** 非选中楼层默认透明度，对齐 SDK switchFloor */
export const INACTIVE_FLOOR_OPACITY = 0.2

/** 「全部」选项默认文案 */
export const DEFAULT_ALL_LABEL = '全部'
