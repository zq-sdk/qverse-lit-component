/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view qspace 视图切换逻辑
 */

export function turnToPanoramaView(qspace: any, complete: () => void) {

  const locationId = qspace.model?.waypoints?.[0]?.location_id

  qspace.view.turnToPanorama({
    location_id: locationId,
    complete,
  })

}
