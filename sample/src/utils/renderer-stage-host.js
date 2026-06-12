/**
 * 渲染舞台 DOM：挂载到 .renderer-wrap，卸载时移到隐藏容器保留画布
 */

let stageEl = null
let parkingEl = null

function preventRendererWheelDefault(event) {

  event.preventDefault()

}

export function ensureRendererStage() {

  if (!stageEl) {

    stageEl = document.createElement('div')
    stageEl.id = 'renderer-stage'
    stageEl.className = 'renderer-stage'
    stageEl.addEventListener('wheel', preventRendererWheelDefault, { passive: false })

  }
  return stageEl

}

/** @param {HTMLElement} container */
export function attachRendererStage(container) {

  if (!container) {

    return null

  }
  const stage = ensureRendererStage()
  if (stage.parentElement !== container) {

    container.appendChild(stage)

  }
  return stage

}

export function detachRendererStage() {

  if (!stageEl) {

    return

  }
  if (!parkingEl) {

    parkingEl = document.createElement('div')
    parkingEl.id = 'renderer-stage-parking'
    parkingEl.setAttribute('aria-hidden', 'true')
    parkingEl.style.display = 'none'
    document.body.appendChild(parkingEl)

  }
  if (stageEl.parentElement !== parkingEl) {

    parkingEl.appendChild(stageEl)

  }

}
