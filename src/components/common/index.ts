/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: @qverse-ui/lit-components/common 聚合入口与导出
 */

import './lit-switch-panorama-view/index.js'
import './lit-switch-dollhouse-view/index.js'
import './lit-switch-floorplan-view/index.js'
import './lit-switch-floor/index.js'

export { LitSwitchPanoramaView } from './lit-switch-panorama-view/index.js'
export { LitSwitchDollhouseView } from './lit-switch-dollhouse-view/index.js'
export { LitSwitchFloorplanView } from './lit-switch-floorplan-view/index.js'
export { LitSwitchFloor } from './lit-switch-floor/index.js'

export const LIT_COMMON_TAGS = [
  'lit-switch-panorama-view',
  'lit-switch-dollhouse-view',
  'lit-switch-floorplan-view',
  'lit-switch-floor',
] as const

export type LitSwitchViewMode = 'panorama' | 'dollhouse' | 'floorplan'
