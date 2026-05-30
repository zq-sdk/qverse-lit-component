/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-floorplan-view qspace 视图切换逻辑
 */

export function turnToFloorplanView(qspace: any, complete: () => void) {

  qspace.view.turnToFloorplan({ complete })

}
