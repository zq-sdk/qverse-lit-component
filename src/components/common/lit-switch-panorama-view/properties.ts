/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 属性转换器与类型
 */

/** 切换全景视图四元数；由宿主通过 :option 传入 */
export type PanoramaSwitchQuaternion = {

  x: number
  y: number
  z: number
  w: number

}

/** 切换全景视图参数；由宿主通过 :option 传入 */
export type PanoramaSwitchOption = {

  locationId?: string
  quaternion?: PanoramaSwitchQuaternion

}

/** 布尔属性转换器 */
export const booleanAttr = {
  fromAttribute(value: string | null): boolean {

    if (value === null) return false
    if (value === 'false' || value === '0') return false

    return true

  },
  toAttribute(value: boolean): string | null {

    return value ? '' : null

  },
}
