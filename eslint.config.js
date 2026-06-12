import eslint from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'
export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '.history/**',
      '.cursor/**',
      'theme/generated/**',
      'sample/public/**',
      '**/*.d.ts',
      '**/*.map',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {

      /* ============ 缩进与空格 ============ */
      'indent': ['error', 2, { SwitchCase: 1 }],        // 2空格缩进, case 缩进1级（2空格）
      'no-tabs': 'error',                               // 禁止使用 tab
      'no-trailing-spaces': 'error',                    // 禁止行尾空格
      'no-multiple-empty-lines': ['error', { max: 1 }], // 最多1个空行
      'no-mixed-spaces-and-tabs': 'error',              // 禁止混合使用空格和制表符
      'no-irregular-whitespace': 'off',                 // 禁止使用不规则的空白

      /* ============ 引号与分号 ============ */
      'quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],

      /* ============ 逗号与括号 ============ */
      'comma-dangle': 'off',                            // 允许尾随逗号
      'comma-spacing': ['error', { before: false, after: true }],
      'brace-style': ['error', '1tbs'],                // 大括号风格
      'object-curly-spacing': ['error', 'always'],     // 对象花括号内加空格 { a: 1 }
      'array-bracket-spacing': ['error', 'never'],     // 数组括号内不加空格 [1, 2]

      /* ============ 函数风格 ============ */
      'arrow-spacing': ['error', { before: true, after: true }], // 箭头函数空格
      'arrow-parens': 'off',                            // 不限制箭头函数参数括号
      'space-before-function-paren': ['error', {       // 函数括号前空格
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'getter-return': 'error',                        // 强制 getter 返回值
      'constructor-super': 'error',                    // 强制在子类的构造函数中使用 super()
      'no-this-before-super': 'error',                 // 禁止在构造函数中调用 super() 之前使用 this

      /* ============ 变量声明 ============ */
      'no-var': 'off',                                 // 允许使用 var 声明变量
      'prefer-const': 'off',                           // 不强制使用 const 声明变量
      'no-undef': 'error',                             // 禁止使用未定义的变量
      'no-unused-vars': ['error', {                    // 不允许未使用的变量
        vars: 'all',                                   // 检查所有变量
        args: 'none',                                  // 不检查函数参数
        // varsIgnorePattern: '^i[A-Z]'                   // 忽略 i开头的变量
      }],
      'no-redeclare': 'error',                         // 禁止重复声明变量
      'no-const-assign': 'error',                      // 禁止修改 const 声明的变量

      /* ============ 变量命名 ============ */
      'camelcase': ['error', {
        properties: 'never',                           // 不检查属性命名
        allow: [
          '^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$',             // 允许 UPPER_SNAKE_CASE 常量命名
          '^[a-z]+(_[a-z0-9]+)+$'                      // 允许 snake_case（兼容外部 API 参数）
        ]
      }],
      'new-cap': ['error', {
        newIsCap: true,                                // 构造函数大写开头
        capIsNew: false                                // 不强制大写函数必须用 new 调用
      }],

      /* ============ 关键字空格 ============ */
      'keyword-spacing': ['error', { before: true, after: true }], // if/else/for 等关键字空格
      'space-infix-ops': 'error',                      // 操作符两侧空格 a + b
      'space-before-blocks': 'error',                  // 块语句前空格 if (x) {

      /* ============ 条件与循环（tseslint 会关闭部分 core 规则，此处重新启用） ============ */
      'no-unreachable': 'error',                       // 禁止无法到达的代码

      /* ============ 函数与参数 ============ */
      'no-dupe-args': 'error',                         // 禁止重复的参数
      'no-func-assign': 'error',                       // 禁止对函数声明重新赋值
      'no-inner-declarations': 'error',                // 禁止在嵌套块中声明函数

      /* ============ 类与对象 ============ */
      'no-class-assign': 'error',                      // 禁止修改类声明的变量
      'no-dupe-keys': 'error',                         // 禁止重复的键
      'no-obj-calls': 'error',                         // 禁止对 Math/JSON 等对象使用 new 运算符

      /* ============ 注释 ============ */
      'spaced-comment': ['error', 'always'],           // 注释后加空格 // comment
      'multiline-comment-style': 'off',                // 不限制多行注释风格
      'lines-around-comment': ['error', {
        beforeBlockComment: true,                      // 块注释前要有空行
        beforeLineComment: false,                      // 行注释前不要求空行
        allowBlockStart: true,                         // 允许块开头紧跟注释
        allowBlockEnd: true,                           // 允许块结尾紧跟注释
        allowObjectStart: true,                        // 允许对象开头紧跟注释
        allowObjectEnd: true,                          // 允许对象结尾紧跟注释
        allowArrayStart: true,                         // 允许在数组开头紧跟注释
        allowArrayEnd: true,                           // 允许在数组结尾紧跟注释
        allowClassStart: true,                         // 允许类开头紧跟注释
        allowClassEnd: true                            // 允许类结尾紧跟注释
      }],
      'padded-blocks': ['error', 'always'],            // 所有块必须有空行

      // ============ TypeScript ============
      '@typescript-eslint/no-explicit-any': 'off',     // 禁止使用 any
      '@typescript-eslint/no-unused-vars': [           // 禁止未使用的变量
        'warn',
        {
          argsIgnorePattern: '^_',                  // 忽略以 _ 开头的参数
          varsIgnorePattern: '^_',                  // 忽略以 _ 开头的变量
        },
      ],
      '@typescript-eslint/explicit-member-accessibility': ['error', { // 显式声明成员可见性
        accessibility: 'explicit',  // 要求所有成员必须显式声明
        overrides: {
          constructors: 'no-public',  // 构造函数不需要 public
          methods: 'off'              // 方法不强制要求访问修饰符
        }
      }],
    },
  },
  {
    files: [
      'src/**/*.ts',
      'sample/src/**/*.ts',
      'vite.config.ts',
      'sample/vite.config.ts',
      'eslint.config.js',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
  ...pluginVue.configs['flat/essential'],
  {
    files: ['sample/src/**/*.vue'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs}', 'sample/src/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
)
