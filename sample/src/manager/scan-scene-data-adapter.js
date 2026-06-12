/*
 * @Description: 扫描场景模型数据适配（参考 QspaceSDK goods-shelf model.data.js）
 */

import { isObj } from '../utils/data-types'
import {
  convertVisionQuaternion,
  convertVisionQuaternion2,
  convertVisionVector,
} from '../utils/vision-math'

const CDN_CONFIG = {

  model_base_url: '//modelcdn2.3dnest.cn/',
  info_base_url: '//infocdn2.3dnest.cn/',
  template_url: '//template2.3dnest.cn/',
  picture_url: '//material.3dnest.cn/e100_sdk/',

}

const DEFAULT_WAYPOINT_PIC = '//material.3dnest.cn/1067/10000041/35e7024cccf74aea_120_120.png'
const SUPPORT_ENTRY_MODES = ['panorama', 'dollhouse', 'floorplan', 'dollhouse.flyto.panorama']
const resourceUrls = {

  modelId: '',
  settingName: '',
  version: null,
  settingsUrl: '',
  nestUrl: '',
  textureUrl: '',
  tileUrl: '',
  infoBaseUrl: CDN_CONFIG.info_base_url,

}

const modelState = {

  type: 'model',
  alonePanoramaPoints: 0,
  basic: {},
  building: { blocks: [], floors: [] },
  waypoints: [],
  entry_info: {

    mode: 'panorama',
    lon_lat: null,
    floorplan_rotate_angle: null,
  },

}

function createResourceUrls(params = { id: '' }) {

  if (!params.id) {

    console.error('create urls failure, reason: unget modelId')
    return

  }

  resourceUrls.modelId = params.id
  resourceUrls.settingName = params.setting_type ?? 'raw_settings'

}

function convertResourceVersion(params) {

  const { modelId, settingName } = resourceUrls
  const { model_base_url, info_base_url } = CDN_CONFIG
  const ver = params.version
  resourceUrls.version = ver
  resourceUrls.settingsUrl = `${info_base_url}${modelId}/${ver}/${settingName}.txt`
  resourceUrls.nestUrl = `${model_base_url}${modelId}/${ver}/model.nest`
  resourceUrls.textureUrl = `${model_base_url}${modelId}/${ver}/texture_high/`
  resourceUrls.tileUrl = `${model_base_url}${modelId}/${ver}/`

}

export function getSettingsUrl() {

  return resourceUrls.settingsUrl

}

export function prepareResourceUrls(modelId, version, settingType = 'raw_settings') {

  createResourceUrls({ id: modelId, setting_type: settingType })
  convertResourceVersion({ version })

}

function failValidation(message) {

  console.error(message)
  return null

}

export function adapter(data, options = {}) {

  if (options.model_id && options.model_version) {

    createResourceUrls({ id: options.model_id, setting_type: options.setting_type })
    convertResourceVersion({ version: options.model_version })

  }

  const requiredFields = [
    { field: 'basic', msg: '模型数据缺少 basic 字段' },
    { field: 'building', msg: '模型数据缺少 building 字段' },
    { field: 'locations', msg: '模型数据缺少 locations 字段' },
  ]
  for (const { field, msg } of requiredFields) {

    if (!data[field]) {

      return failValidation(msg)

    }

  }

  if (!data.locations?.points) {

    return failValidation('模型缺少点位数据')

  }

  const { basic, building, locations } = data
  adapterBasic(basic, options)
  adapterBuildings(building)
  adapterWaypoints(locations.points)
  adapterEntryInfo(data)
  adapterEntryPoint(data)
  adapterRenderSet(options)
  return getAdaptedModel()

}

function adapterBasic(basic, options) {

  console.info('> adapter model basic data')
  if (!basic.lod) {

    basic.lod = ['1024-512', '2048-512']

  }

  if (!basic.not_lod) {

    basic.not_lod = ['512', '1024']

  }

  const lodSupport = ['1024-512', '2048-512']
  const cubeSupport = ['512', '1024']
  if (basic.lod.includes('4096-512')) {

    lodSupport.push('4096-512')

  }

  if (basic.lod.includes('2048-1024')) {

    lodSupport.push('2048-1024')

  }

  if (basic.not_lod.includes('2048')) {

    cubeSupport.push('2048')

  }

  let straightPano = false
  if (basic.menu) {

    if (basic.menu.straight_enable !== undefined) {

      straightPano = basic.menu.straight_enable

    }

  } else {

    console.error('invalid basic.menu!')

  }

  modelState.basic = {

    version: basic.version,
    model_id: basic.model?.modelid,
    model_nest_url: resourceUrls.nestUrl,
    model_texture_url: resourceUrls.textureUrl,
    pano_tile_url: resourceUrls.tileUrl,
    pure_3d: false,
    lod_support: lodSupport,
    cube_support: cubeSupport,
    straight_pano: straightPano,
    camera_fov: options.camera_fov ?? 70,

  }

}

function adapterBuildings(_building) {

  console.info('> adapter model building data')
  const blocks = (_building.blocks ?? []).map((block) => ({

    flooridx: block.flooridx,
    blockidx: block.blockidx,
    type: block.category || 'building',
  }))
  const floors = (_building.floors ?? []).map((floor) => ({
    idx: floor.flooridx,
    name: floor.name || (floor.flooridx >= 0 ? `F${floor.flooridx + 1}` : `B${-floor.flooridx}`),
  }))
  if (!floors.length) {

    floors.push({ idx: 0 })

  }

  modelState.building = { blocks, floors }

}

function adapterWaypoints(_points) {

  console.info('> adapter model waypoints data')
  const newPoints = []
  modelState.alonePanoramaPoints = 0
  for (const point of _points) {

    if (!point.enable) {

      console.warn('模型数据，存在禁用的点位', point.locationid)

    }

    if (point.type === 2) {

      modelState.alonePanoramaPoints++
      console.warn('模型数据，存在独立全景点', point.locationid)
      continue

    }

    if (point.type !== 1) {

      console.error('模型数据，存在未知类型点位', point.locationid)
      continue

    }

    const spot = convertVisionVector(point.spot)
    spot.y += 0.001
    newPoints.push({

      type: point.type,
      enable: point.enable,
      visible: point.visible ?? true,
      flooridx: point.flooridx,
      location_id: point.locationid,
      rotation: convertVisionQuaternion(point.rotation),
      orientation: convertVisionQuaternion2(point.rotation),
      viewpoint: convertVisionVector(point.viewpoint),
      spot,
      neighbour: point.neighbour ?? point.vps,
      neighbour_visible: point.neighbour_visible ?? [],
      pic: DEFAULT_WAYPOINT_PIC,
      scale: 1,
    })

  }

  modelState.waypoints = newPoints

}

function adapterEntryInfo(data) {

  console.info('> adapter model entry info')
  const _entryInfo = data.entry_info ?? {}
  if (_entryInfo.mode && !SUPPORT_ENTRY_MODES.includes(_entryInfo.mode)) {

    console.error('model data adapter entry info failure, reason: invalid entry_info.mode!')

  }

  modelState.entry_info = {

    mode: _entryInfo.mode || 'panorama',
    lon_lat: _entryInfo.lon_lat ?? null,
    floorplan_rotate_angle: _entryInfo.floorplan_rotate_angle ?? null,

  }

}

function adapterEntryPoint(data) {

  const entryInfo = data.entry_info ?? {}
  let originPoint
  if (!entryInfo.point) {

    originPoint = modelState.waypoints.find((p) => p.enable)
    if (originPoint) {

      entryInfo.point = originPoint.location_id

    }

  } else {

    originPoint = modelState.waypoints.find((p) => p.location_id === entryInfo.point)

  }

  if (!originPoint) {

    console.error(`adapter entry point failure, reason: invalid point:${entryInfo.point}`)
    return

  }

  if (!originPoint.enable) {

    console.error('adapter entry point failure, reason: point disabled!')

  }

  modelState.entry_point = {

    location_id: entryInfo.point,
    rotation: entryInfo.rotation ?? originPoint.orientation,

  }

}

function adapterRenderSet(options) {

  const FAILURE_MSG = 'adapter render config failure'
  const tileConfig = options.tile_render_config
  if (!isObj(tileConfig, 'tile_render_config')) {

    console.error(`${FAILURE_MSG}, reason: invalid tile_render_config`)
    return

  }

  let renderMode = tileConfig.mode ?? 'lod'
  let renderSet = tileConfig.set ?? '2048-512'
  if (renderMode !== 'lod' && renderMode !== 'not-lod') {

    console.error(`${FAILURE_MSG}, reason: invalid tile_render_config.mode`)
    renderMode = 'lod'

  }

  const basic = modelState.basic
  if (renderMode === 'lod') {

    if (!basic.lod_support?.includes(renderSet)) {

      console.error(`${FAILURE_MSG}, reason: invalid tile_render_config.set`)
      renderSet = '2048-512'

    }

  } else if (renderMode === 'not-lod') {

    if (!basic.cube_support?.includes(renderSet)) {

      console.error(`${FAILURE_MSG}, reason: invalid tile_render_config.set`)
      renderMode = 'lod'
      renderSet = '2048-512'

    } else {

      renderMode = '6cube'

    }

  }

  basic.render_mode = renderMode
  basic.render_set = renderSet
  modelState.zoom = {

    tile_2k_trigger: tileConfig.zoom_render_2k_trigger ?? 1,
    tile_4k_trigger: tileConfig.zoom_render_4k_trigger ?? 2,

  }

}

function getAdaptedModel() {

  return JSON.parse(JSON.stringify(modelState))

}
