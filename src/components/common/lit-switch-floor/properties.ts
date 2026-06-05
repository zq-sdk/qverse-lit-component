/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floor 属性类型
 */

/** 渲染用楼层项（来自宿主 option.floors） */
export type FloorItem = {

  idx: number

  name?: string

}

/** 宿主传入的楼层项；Vue: :option="{ floors: [{ idx, name }] }" */
export type FloorOptionItem = {

  idx: number

  name: string

}

/** 宿主配置；楼层数据须由宿主获取后传入，组件内部不拉取 model */
export type FloorSwitchOption = {

  /** 楼层列表（idx、name） */
  floors?: FloorOptionItem[]

  /** 当前选中楼层；默认「全部」，组件在点击 / SDK 同步时写入 */
  currentFloor?: number | 'all'

  /** 「全部」文案，默认「全部」 */
  allLabel?: string

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
