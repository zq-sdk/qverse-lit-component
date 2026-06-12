/**
 * 数据类型校验（精简版，供场景数据适配使用）
 */

export function isObj(data, cmd) {

  if (Object.prototype.toString.call(data) === '[object Object]') {

    return true

  }
  if (cmd) {

    console.error(`${cmd} is not object`)

  }
  return false

}
