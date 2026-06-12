/*
 * @Author: ncz
 * @Date: 2026-01-06 12:25:21
 * @Description: Commitlint 配置
 */

export default {

  extends: ['@commitlint/config-conventional'],

  rules: {

    // type 类型定义
    'type-enum': [2, 'always', [
      'feat',     // 新功能
      'fix',      // 修复 bug
      'docs',     // 文档变更
      'style',    // 代码格式（不影响功能）
      'refactor', // 重构（既不是新功能也不是修复）
      'perf',     // 性能优化
      'test',     // 添加测试
      'chore',    // 构建过程或辅助工具变更
      'revert',   // 回滚
      'build',    // 构建系统或外部依赖变更
      'ci'        // CI 配置变更
    ]],

    // type 不能为空
    'type-empty': [2, 'never'],

    // type 小写
    'type-case': [2, 'always', 'lower-case'],

    // subject 不能为空
    'subject-empty': [2, 'never'],

    // subject 不以句号结尾
    'subject-full-stop': [2, 'never', '.'],

    // subject 大小写不限制
    'subject-case': [0],

    // header 最大长度 100
    'header-max-length': [2, 'always', 100],

    // body 每行最大长度
    'body-max-line-length': [0]
  }

}
