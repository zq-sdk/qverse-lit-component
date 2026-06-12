/**
 * Qspace 场景启动（adapter → qspace.core）
 */

import { ref } from 'vue'
import { SCENE_BOOT_DATA } from '@/config/scene-boot'
import { loadAdaptedSceneData } from '@/manager/scan-scene-init.js'

const loadState = ref<'idle' | 'loading' | 'loaded'>('idle')
const loadProgress = ref(0)
const adaptedSceneData = ref<unknown>(null)

let sceneStarted = false
let sceneLoadedOnce = false

function getQspace(): any {

  if (!window.THREE) {

    throw new Error('THREE 未加载')

  }
  const qspace = window.qspace
  if (!qspace?.core) {

    throw new Error('qspace 未加载')

  }
  return qspace

}

function initCoreConfig(qspace: any) {

  qspace.core!.initConfig({
    antialias: false,
    render_alpha: true,
  })

}

async function startScene() {

  if (sceneStarted) {

    if (sceneLoadedOnce) {

      loadState.value = 'loaded'
      loadProgress.value = 100

    }
    return

  }

  const stage = document.getElementById('renderer-stage')
  if (!stage) {

    console.error('[samples] 未找到渲染容器 #renderer-stage')
    return

  }

  try {

    const qspace = getQspace()
    sceneStarted = true
    loadState.value = 'loading'

    initCoreConfig(qspace)

    const adaptedData = await loadAdaptedSceneData(SCENE_BOOT_DATA)
    adaptedSceneData.value = adaptedData

    qspace.core!.initData(adaptedData)

    qspace.core!.beginRender({
      onProgress: (data: { progress?: number }) => {

        const percent = Math.round((data?.progress ?? 0) * 100)
        loadProgress.value = Number.isFinite(percent) ? percent : 0

      },
      onLoaded: () => {

        sceneLoadedOnce = true
        loadState.value = 'loaded'
        loadProgress.value = 100

      },
    })

  } catch (err) {

    console.error('[samples] 场景启动失败', err)
    sceneStarted = false
    adaptedSceneData.value = null
    loadState.value = 'idle'

  }

}

export function stopQspaceScene() {

  const core = window.qspace?.core
  if (core?.stopRender) {

    try {

      core.stopRender()

    } catch {
      // 销毁阶段忽略
    }

  }
  sceneStarted = false
  sceneLoadedOnce = false
  adaptedSceneData.value = null
  loadState.value = 'idle'
  loadProgress.value = 0

}

export function useQspaceScene() {

  return {
    loadState,
    loadProgress,
    adaptedSceneData,
    startScene,
  }

}
