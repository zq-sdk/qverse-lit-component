/*
 * @Description: 拉取 settings 并适配为 qspace.core.initData 所需结构
 */

import { adapter, prepareResourceUrls, getSettingsUrl } from './scan-scene-data-adapter'
import { fetchSettingsText } from '../utils/fetch-settings'

export async function loadAdaptedSceneData(bootData) {

  const args = JSON.parse(JSON.stringify(bootData))

  if (!args.id) {

    throw new Error('scene boot data 缺少 id')

  }

  if (args.type !== 'model') {

    throw new Error(`不支持的场景类型: ${args.type}`)

  }

  prepareResourceUrls(args.id, args.version, 'raw_settings')

  const settingsText = await fetchSettingsText(getSettingsUrl())
  const settings = JSON.parse(settingsText)

  if (args.entry_info) {

    settings.entry_info = {

      ...settings.entry_info,
      ...args.entry_info,

    }

  }

  const adapted = adapter(settings, {

    model_id: args.id,
    model_version: args.version,
    camera_fov: args.camera_fov,
    tile_render_config: args.tile_render_config,

  })

  if (!adapted) {

    throw new Error('场景数据适配失败')

  }

  return adapted

}
