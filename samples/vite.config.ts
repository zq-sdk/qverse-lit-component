import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const samplesRoot = fileURLToPath(new URL('.', import.meta.url))
const litPkgRoot = fileURLToPath(new URL('..', import.meta.url))

export default defineConfig(({ mode }) => ({

  plugins: [
    vue({
      template: {
        compilerOptions: {

          isCustomElement: (tag) => /^lit-[\w-]+$/.test(tag),

        },
      },
    }),
  ],
  resolve: {

    alias: [
      ...(mode === 'development'
        ? [
            {
              find: /^@qverse\/lit-components\/theme\.css$/,
              replacement: `${litPkgRoot}/theme/generated/element-plus-vars.css`,
            },
            {
              find: /^@qverse\/lit-components\/base$/,
              replacement: `${litPkgRoot}/src/components/base/index.ts`,
            },
            {
              find: /^@qverse\/lit-components\/common$/,
              replacement: `${litPkgRoot}/src/components/common/index.ts`,
            },
            {
              find: /^@qverse\/lit-components$/,
              replacement: `${litPkgRoot}/src/index.ts`,
            },
          ]
        : []),
      {

        find: /^@\//,
        replacement: `${samplesRoot}/src/`,

      },
    ],

  },
  server: {

    host: true,
    port: 3100,
    strictPort: false,
    open: false,
    fs: {

      allow: [samplesRoot, litPkgRoot],

    },

  },
  optimizeDeps: {

    exclude: ['@qverse/lit-components'],

  },

}))
