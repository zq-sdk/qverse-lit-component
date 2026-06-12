/**
 * 从 theme/tokens.json 生成：
 * - theme/generated/element-plus-vars.css  → 各 Vue 应用覆盖 --el-*
 * - src/styles/tokens.generated.ts         → Lit 组件 --lit-* 令牌
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const pkgRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const tokensPath = join(pkgRoot, 'theme/tokens.json')
const outCss = join(pkgRoot, 'theme/generated/element-plus-vars.css')
const outLit = join(pkgRoot, 'src/styles/tokens.generated.ts')

/** tokens.json 路径 → Element Plus CSS 变量名 */
const EP_MAP = {
  'elementPlus.color.primary': '--el-color-primary',
  'elementPlus.color.primaryLight3': '--el-color-primary-light-3',
  'elementPlus.color.primaryLight5': '--el-color-primary-light-5',
  'elementPlus.color.primaryLight7': '--el-color-primary-light-7',
  'elementPlus.color.primaryLight8': '--el-color-primary-light-8',
  'elementPlus.color.primaryLight9': '--el-color-primary-light-9',
  'elementPlus.color.primaryDark2': '--el-color-primary-dark-2',
  'elementPlus.color.success': '--el-color-success',
  'elementPlus.color.successLight3': '--el-color-success-light-3',
  'elementPlus.color.successLight5': '--el-color-success-light-5',
  'elementPlus.color.successDark2': '--el-color-success-dark-2',
  'elementPlus.color.warning': '--el-color-warning',
  'elementPlus.color.danger': '--el-color-danger',
  'elementPlus.color.dangerLight3': '--el-color-danger-light-3',
  'elementPlus.color.dangerLight5': '--el-color-danger-light-5',
  'elementPlus.color.dangerDark2': '--el-color-danger-dark-2',
  'elementPlus.color.info': '--el-color-info',
  'elementPlus.color.textPrimary': '--el-text-color-primary',
  'elementPlus.color.textRegular': '--el-text-color-regular',
  'elementPlus.color.textSecondary': '--el-text-color-secondary',
  'elementPlus.color.textPlaceholder': '--el-text-color-placeholder',
  'elementPlus.color.border': '--el-border-color',
  'elementPlus.color.borderLight': '--el-border-color-light',
  'elementPlus.color.borderLighter': '--el-border-color-lighter',
  'elementPlus.color.fill': '--el-fill-color',
  'elementPlus.color.fillBlank': '--el-fill-color-blank',
  'elementPlus.color.bg': '--el-bg-color',
  'elementPlus.color.bgPage': '--el-bg-color-page',
  'elementPlus.borderRadius.base': '--el-border-radius-base',
  'elementPlus.borderRadius.small': '--el-border-radius-small',
  'elementPlus.borderRadius.round': '--el-border-radius-round',
  'elementPlus.borderRadius.circle': '--el-border-radius-circle',
  'elementPlus.font.family': '--el-font-family',
  'elementPlus.font.sizeBase': '--el-font-size-base',
  'elementPlus.font.sizeSmall': '--el-font-size-small',
  'elementPlus.font.sizeLarge': '--el-font-size-large',
  'elementPlus.font.lineHeightPrimary': '--el-font-line-height-primary',
  'elementPlus.component.size': '--el-component-size',
  'elementPlus.component.sizeSmall': '--el-component-size-small',
  'elementPlus.component.sizeLarge': '--el-component-size-large',
  'elementPlus.card.borderColor': '--el-card-border-color',
  'elementPlus.card.borderRadius': '--el-card-border-radius',
  'elementPlus.card.padding': '--el-card-padding',
  'elementPlus.card.bgColor': '--el-card-bg-color',
  'elementPlus.shadow.light': '--el-box-shadow-light',
  'elementPlus.transition.duration': '--el-transition-duration',
}

/** Lit 内部变量 → 优先继承 Element Plus 同名语义 */
const LIT_MAP = {
  '--lit-color-primary': { el: '--el-color-primary', path: 'elementPlus.color.primary' },
  '--lit-color-success': { el: '--el-color-success', path: 'elementPlus.color.success' },
  '--lit-color-danger': { el: '--el-color-danger', path: 'elementPlus.color.danger' },
  '--lit-color-primary-hover': {
    el: '--el-color-primary-light-3',
    path: 'elementPlus.color.primaryLight3',
  },
  '--lit-color-success-hover': {
    el: '--el-color-success-light-3',
    path: 'elementPlus.color.successLight3',
  },
  '--lit-color-danger-hover': {
    el: '--el-color-danger-light-3',
    path: 'elementPlus.color.dangerLight3',
  },
  '--lit-text-regular': { el: '--el-text-color-regular', path: 'elementPlus.color.textRegular' },
  '--lit-border': { el: '--el-border-color', path: 'elementPlus.color.border' },
  '--lit-bg': { el: '--el-bg-color', path: 'elementPlus.color.bg' },
  '--lit-radius': { el: '--el-border-radius-base', path: 'elementPlus.borderRadius.base' },
  '--lit-font': { el: '--el-font-family', path: 'elementPlus.font.family' },
  '--lit-font-size': { el: '--el-font-size-base', path: 'elementPlus.font.sizeBase' },
  '--lit-button-height': { el: '--el-component-size', path: 'elementPlus.component.size' },
  '--lit-button-height-small': {
    el: '--el-component-size-small',
    path: 'elementPlus.component.sizeSmall',
  },
  '--lit-button-height-large': {
    el: '--el-component-size-large',
    path: 'elementPlus.component.sizeLarge',
  },
  '--lit-color-primary-light-9': {
    el: '--el-color-primary-light-9',
    path: 'elementPlus.color.primaryLight9',
  },
}

function getByPath(obj, path) {

  return path.split('.').reduce((o, k) => o?.[k], obj)

}

function generateElementPlusCss(tokens) {

  const lines = Object.entries(EP_MAP).map(([path, cssVar]) => {

    const value = getByPath(tokens, path)
    if (value == null) throw new Error(`Missing token: ${path}`)
    return `  ${cssVar}: ${value};`

  })
  return `/* AUTO-GENERATED from theme/tokens.json — do not edit */
/* Run: npm run generate-theme (in Qverse-Lit-Component) */
:root {
${lines.join('\n')}
}

/* 全站统一 EP 正文字体 */
html,
body {
  font-family: var(--el-font-family);
  font-size: var(--el-font-size-base);
  line-height: var(--el-font-line-height-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

}

function generateLitTokens(tokens) {

  const hostVars = Object.entries(LIT_MAP)
    .map(([litVar, { el, path }]) => {

      const fallback = getByPath(tokens, path)
      return `    ${litVar}: var(${el}, ${fallback});`

    })
    .join('\n')

  return `/**
 * AUTO-GENERATED from theme/tokens.json — do not edit
 * Run: npm run generate-theme (in Qverse-Lit-Component)
 */
import { css } from 'lit'

/** @lit-common 设计令牌（与 Element Plus --el-* 对齐） */
export const designTokens = css\`
  :host {
${hostVars}
    box-sizing: border-box;
    font-family: var(--lit-font);
    font-size: var(--lit-font-size);
  }
\`
`

}

function main() {

  const tokens = JSON.parse(readFileSync(tokensPath, 'utf8'))
  mkdirSync(dirname(outCss), { recursive: true })
  mkdirSync(dirname(outLit), { recursive: true })

  writeFileSync(outCss, generateElementPlusCss(tokens), 'utf8')
  writeFileSync(outLit, generateLitTokens(tokens), 'utf8')

  console.log('[generate-theme] wrote', outCss)
  console.log('[generate-theme] wrote', outLit)

}

main()
