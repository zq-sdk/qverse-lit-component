import { defineConfig } from 'vite'
import { resolve } from 'node:path'

const src = (p: string) => resolve(__dirname, p)

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: src('src/index.ts'),
        'components/base/index': src('src/components/base/index.ts'),
        'components/common/index': src('src/components/common/index.ts'),
        'components/index': src('src/components/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['lit', /^lit\//],
      output: {
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: src('src'),
      },
    },
    sourcemap: true,
    minify: false,
  },
})
