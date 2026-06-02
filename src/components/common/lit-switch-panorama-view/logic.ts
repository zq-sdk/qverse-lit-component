/*
 * @Author: ncz
 * @Date: 2026-05-30
 * @Description: lit-switch-panorama-view qspace 视图切换逻辑
 */

import type { PanoramaSwitchOption } from './properties.js'

export function turnToPanoramaView(
  qspace: any,
  option: PanoramaSwitchOption | null,
  complete: () => void,
) {

  const locationId = option?.locationId;

  const params: Record<string, unknown> = {
    location_id: locationId,
    complete,
  }

  if (option?.quaternion) {

    params.quaternion = option.quaternion

  }

  qspace.view.turnToPanorama(params)

}
