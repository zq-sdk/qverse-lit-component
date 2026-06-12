/**
 * 拉取模型 settings 文本（参考 goods-shelf sample Http.getSettingsData）
 */

export function fetchSettingsText(url) {

  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'text'
    xhr.onload = () => {

      if (xhr.readyState === 4 && xhr.status === 200) {

        resolve(xhr.response)
        return

      }
      reject(new Error(`settings 请求失败: ${xhr.status}`))

    }
    xhr.onerror = () => {

      reject(new Error('settings 网络错误'))

    }
    xhr.send()

  })

}
