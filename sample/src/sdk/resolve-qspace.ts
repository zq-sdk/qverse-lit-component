/**
 * 解析全局 qspace（由 index.html UMD 注入）
 */
export function resolveQspace(): any {

  return window.qspace ?? null

}
