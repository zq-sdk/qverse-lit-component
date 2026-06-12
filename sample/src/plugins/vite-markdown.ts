import MarkdownIt from 'markdown-it'
import type { Plugin } from 'vite'

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
})

/** 构建时将 .md 转为 HTML 字符串模块 */
export function viteMarkdown(): Plugin {

  return {
    name: 'vite-markdown',
    enforce: 'pre',
    transform(source, id) {

      if (!id.endsWith('.md')) {

        return null

      }

      const html = md.render(source)

      return {
        code: `export default ${JSON.stringify(html)}`,
        map: null,
      }

    },
  }

}
