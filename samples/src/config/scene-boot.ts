/**
 * 场景启动参数（参考 goods-shelf sample bootData）
 */

export const SCENE_BOOT_DATA = {
  type: 'model',
  // 单层
  // id: 'b25cf01c_a3v5_b6f9',
  // version: '2023-01-11-17-10-03',
  // 多层
  id: '79b468f0_1BIL_b6f9_IoNvcm',
  version: '2026-03-26-09-30-35',
  entry_info: {
    // mode: 'panorama',
    mode: 'dollhouse',
    // mode: 'floorplan',
    rotation: null,
    // point: 'location_01',
  },
  tile_render_config: {
    mode: 'lod',
    set: '2048-512',
    zoom_render_2k_trigger: 1,
    zoom_render_4k_trigger: 1,
  },
  camera_fov: 82,
} as const
