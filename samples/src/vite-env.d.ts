/// <reference types="vite/client" />

declare module '*.md' {
  const html: string
  export default html
}

/** index.html 通过 /lib/THREE.js 注入 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThreeGlobal = any

interface Window {
  THREE?: ThreeGlobal
  qspace?: any
}
