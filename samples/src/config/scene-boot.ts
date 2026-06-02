/**
 * 场景启动参数（参考 goods-shelf sample bootData）
 */

export const SCENE_BOOT_DATA = {
  type: 'model',
  id: 'b25cf01c_a3v5_b6f9',
  version: '2023-01-11-17-10-03',
  entry_info: {
    mode: 'dollhouse',
    rotation: null,
    point: 'location_02',
  },
  tile_render_config: {
    mode: 'lod',
    set: '2048-512',
    zoom_render_2k_trigger: 1,
    zoom_render_4k_trigger: 1,
  },
  camera_fov: 82,
} as const
