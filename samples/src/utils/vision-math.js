/**
 * 扫描模型原始坐标 → THREE 坐标系（依赖 index.html 引入的全局 THREE）
 */

function getTHREE() {
  const three = globalThis.THREE
  if (!three) {
    throw new Error('THREE 未加载，请在 index.html 中引入 /lib/THREE.js')
  }
  return three
}

/** 转换原始数据四元数（含 Y 轴 90° 校正） */
export function convertVisionQuaternion(quaternion) {
  const THREE = getTHREE()
  const q = new THREE.Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w)
  const rotated = q.multiply(
    new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(90)),
  )
  return {
    x: rotated.x,
    y: rotated.y,
    z: rotated.z,
    w: rotated.w,
  }
}

/** 将初始四元数转换为 THREE 坐标系四元数 */
export function convertVisionQuaternion2(quaternion) {
  const THREE = getTHREE()
  const _quaternion = new THREE.Quaternion(quaternion.x, quaternion.z, -quaternion.y, quaternion.w)
  return {
    x: _quaternion.x,
    y: _quaternion.y,
    z: _quaternion.z,
    w: _quaternion.w,
  }
}

/** 转换原始三维向量 */
export function convertVisionVector(vec3) {
  return {
    x: vec3.x,
    y: vec3.z,
    z: -vec3.y,
  }
}
