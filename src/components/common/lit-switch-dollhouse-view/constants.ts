/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-dollhouse-view 常量（标签、事件名、CSS 变量）
 */

import { ViewMode } from '@/enum/view.mode'

export const TAG = 'lit-switch-dollhouse-view' as const

export const VIEW = ViewMode.Dollhouse as const

export const ICON_CSS_VAR = '--lit-mode-dollhouse-icon' as const

export const CLICK_EVENT = 'lit-click' as const

export const COMPLETE_EVENT = 'lit-switch-complete' as const
