/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view 属性转换器
 */

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
