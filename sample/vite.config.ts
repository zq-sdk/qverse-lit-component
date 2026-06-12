import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { viteMarkdown } from './src/plugins/vite-markdown'

const samplesRoot = fileURLToPath(new URL('.', import.meta.url))
const litPkgRoot = fileURLToPath(new URL('..', import.meta.url))
const litDistRoot = `${litPkgRoot}/dist`

/** 监听组件库 dist 变更并触发 samples 整页刷新（file:.. 链接包默认不在 watch 范围内） */
function watchLitPackageDist() {

  return {
    name: 'watch-lit-package-dist',
    configureServer(server: { watcher: { add: (p: string) => void; on: (e: string, cb: (p: string) => void) => void }; ws: { send: (payload: unknown) => void } }) {

      server.watcher.add(litDistRoot)
      server.watcher.on('change', (file) => {

        if (file.startsWith(litDistRoot)) {

          server.ws.send({ type: 'full-reload' })

        }

      })

    },
  }

}

export default defineConfig({

  plugins: [
    viteMarkdown(),
    vue({
      template: {
        compilerOptions: {

          isCustomElement: (tag) => /^lit-[\w-]+$/.test(tag),

        },
      },
    }),
    watchLitPackageDist(),
  ],
  resolve: {

    alias: {
      '@': `${samplesRoot}/src`,
      '@lit-docs': `${litPkgRoot}/docs/common`,
    },

  },
  optimizeDeps: {

    /** 避免预构建缓存 file:.. 链接包，dist 更新后仍用旧产物 */
    exclude: ['@qverse-ui/lit-components'],

  },
  server: {

    host: true,
    port: 3100,
    strictPort: false,
    open: false,
    fs: {

      allow: [samplesRoot, litPkgRoot],

    },
    watch: {

      /** file:.. 在 node_modules 内，默认被忽略；显式纳入监听 */
      ignored: ['!**/node_modules/@qverse-ui/lit-components/dist/**'],

    },

  },

})
