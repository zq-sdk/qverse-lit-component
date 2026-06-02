/// <reference types="vite/client" />

/** index.html 通过 /lib/THREE.js 注入 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThreeGlobal = any

interface Window {
  THREE?: ThreeGlobal
  qspace?: any
}
