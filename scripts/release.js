/*
 * @Author: ncz
 * @Date: 2026-01-08 19:17:09
 * @Description: 自定义发布脚本
 *
 * 执行流程:
 *   1. 读取 package.json（获取当前版本，如 1.0.4）
 *                        ↓
 *   2. 计算新版本号（1.0.4 → 1.0.5）
 *                        ↓
 *   3. 更新 package.json（写入 1.0.5）
 *                        ↓
 *   4. Git commit（自动触发 husky + commitlint）
 *                        ↓
 *   5. 创建 tag
 *                        ↓
 *   6. 推送
 *
 * 用法:
 *   node scripts/release.js patch                          - 发布补丁版本 (1.0.0 → 1.0.1)
 *   node scripts/release.js minor                          - 发布次版本 (1.0.0 → 1.1.0)
 *   node scripts/release.js major                          - 发布主版本 (1.0.0 → 2.0.0)
 *   node scripts/release.js tag                            - 仅打 tag，不更新版本号
 *   node scripts/release.js tag "tag说明"                   - 仅打 tag，自定义 tag 消息
 *   node scripts/release.js tag "tag说明" "commit消息"      - 仅打 tag，分别定义 tag 消息和 commit 消息
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { createInterface } from 'readline'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 获取当前文件的目录
const __dirname = dirname(fileURLToPath(import.meta.url))

// 获取 package.json 路径
const pkgPath = join(__dirname, '../package.json')

// 读取 package.json
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
const { version, name } = pkg

// 版本类型
const VERSION_TYPES = ['patch', 'minor', 'major', 'tag']

/**
 * 检查本地 tag 是否存在
 */
function checkLocalTagExists(tagName) {

  try {

    execSync(`git rev-parse ${tagName}`, { stdio: 'pipe' })

    return true

  } catch {

    return false

  }

}

/**
 * 检查远程 tag 是否存在
 */
function checkRemoteTagExists(tagName) {

  try {

    const result = execSync(`git ls-remote --tags origin refs/tags/${tagName}`, { encoding: 'utf-8' })

    return result.trim().length > 0

  } catch {

    return false

  }

}

/**
 * 用户确认提示
 */
function confirm(question) {

  return new Promise((resolve) => {

    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    rl.question(question, (answer) => {

      rl.close()
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes')

    })

  })

}

/**
 * 解析命令行参数
 * 支持格式:
 *   release:patch                          - 发布补丁版本
 *   release:tag                            - 仅打 tag
 *   release:tag "tag说明"                   - 仅打 tag，自定义 tag 消息
 *   release:tag "tag说明" "commit消息"      - 仅打 tag，分别定义 tag 消息和 commit 消息
 */
function parseArgs() {

  const args = process.argv.slice(2)
  // console.log('args:', args);

  // process.exit();

  const type = args[0]
  const commitMessage = args[1] || ''

  return { type, commitMessage }

}

// 获取参数
const { type, commitMessage } = parseArgs()

// 是否仅打 tag 模式
const tagOnly = type === 'tag'

if (!VERSION_TYPES.includes(type)) {

  console.error(`❌ 无效的版本类型，请使用: ${VERSION_TYPES.join(' | ')}`)

  process.exit(1)

}

// 检查是否提供 commit 消息
if (!commitMessage) {

  console.error('❌ 必须提供 commit 消息')
  console.error(`   示例: npm run release:${type} "fix: 修复xxx"`)

  process.exit(1)

}

// 计算新版本号
const [majorNum, minorNum, patchNum] = version.split('.').map(Number)

let newVersion = version // 默认不变

if (!tagOnly) {

  switch (type) {

    case 'major':
      newVersion = `${majorNum + 1}.0.0`
      break
    case 'minor':
      newVersion = `${majorNum}.${minorNum + 1}.0`
      break
    case 'patch':
    default:
      newVersion = `${majorNum}.${minorNum}.${patchNum + 1}`
      break

  }

}

// 生成 tag 名称
const tagName = `v${newVersion}-${name}`

if (tagOnly) {

  console.log('\n🏷️  仅打 Tag 模式')
  console.log(`📦 当前版本: ${version}`)

} else {

  console.log(`\n📦 发布版本: ${version} → ${newVersion}`)

}

console.log(`🏷️  Tag 名称: ${tagName}\n`)

/**
 * 主函数
 */
async function main() {

  try {

    // 1. 更新 package.json 版本（仅非 tag-only 模式）
    if (!tagOnly) {

      pkg.version = newVersion

      writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

      console.log(`✅ 更新 package.json 版本: ${newVersion}`)

    }

    // 2. Git 提交（如果有改动）
    execSync('git add .', { stdio: 'inherit' })

    // 检查是否有待提交的内容
    const hasChanges = (() => {

      try {

        execSync('git diff --cached --quiet', { stdio: 'pipe' })

        return false // 命令成功表示没有变更

      } catch {

        return true // 命令失败表示有变更

      }

    })()

    if (hasChanges) {

      try {

        execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' })

        console.log('✅ Git 提交完成')

      } catch {

        console.log('❌ 提交失败')

        // 回退 package.json 版本
        if (!tagOnly) {

          pkg.version = version // 恢复原版本

          writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

          console.log(`⏪ 已回退 package.json 版本: ${version}`)

        }

        process.exit(1)

      }

    } else {

      console.log('ℹ️  没有待提交的内容，跳过 commit')

    }

    // 4. 创建 tag（如果已存在则先确认删除）
    const localTagExists = checkLocalTagExists(tagName)
    const remoteTagExists = checkRemoteTagExists(tagName)

    if (localTagExists || remoteTagExists) {

      console.log(`\n⚠️  Tag ${tagName} 已存在！`)
      console.log(`   本地: ${localTagExists ? '✅ 存在' : '❌ 不存在'}`)
      console.log(`   远程: ${remoteTagExists ? '✅ 存在' : '❌ 不存在'}`)

    }

    // 处理本地 tag
    if (localTagExists) {

      const shouldDeleteLocal = await confirm('\n是否删除本地 Tag？(y/n): ')

      if (shouldDeleteLocal) {

        execSync(`git tag -d ${tagName}`, { stdio: 'inherit' })

        console.log(`✅ 已删除本地 Tag: ${tagName}`)

      } else {

        console.log('❌ 用户取消删除本地 Tag，无法继续创建')

        // 成功退出
        process.exit(0)

      }

    }

    // 处理远程 tag
    if (remoteTagExists) {

      const shouldDeleteRemote = await confirm('\n是否删除远程 Tag？(y/n): ')

      if (shouldDeleteRemote) {

        execSync(`git push origin :refs/tags/${tagName}`, { stdio: 'inherit' })
        console.log(`✅ 已删除远程 Tag: ${tagName}`)

      } else {

        console.log('⚠️  保留远程 Tag，推送时可能会冲突')

      }

    }

    // tag 消息：优先使用自定义消息，否则使用默认消息
    const tagMsg = `Release ${tagName}`

    execSync(`git tag ${tagName} -m "${tagMsg}"`, { stdio: 'inherit' })

    console.log(`✅ 创建 Tag: ${tagName}`)

    // 5. 推送
    execSync('git push -u origin HEAD --follow-tags', { stdio: 'inherit' })

    console.log('✅ 推送完成')

    console.log(`\n🎉 发布成功! ${tagName}\n`)

    // 成功退出
    process.exit(0)

  } catch (error) {

    console.error('\n❌ 发布失败:', error.message)

    // 失败/错误退出
    process.exit(1)

  }

}

main()
