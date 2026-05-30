/**
 * @qverse/lit-components — 组件聚合入口
 */
import './base/index.js'
import './common/index.js'

export * from './base/index.js'
export * from './common/index.js'

export const LIT_ALL_TAGS = [
  'lit-button',
  'lit-switch-panorama-view',
  'lit-switch-dollhouse-view',
  'lit-switch-floorplan-view',
] as const

export function isLitCommonElement(tag: string): boolean {

  return /^lit-[\w-]+$/.test(tag)

}
