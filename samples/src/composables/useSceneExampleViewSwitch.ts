import {
  inject,
  provide,
  reactive,
  toRefs,
  type InjectionKey,
  type ToRefs,
} from 'vue'

export type SceneExampleOverlayVisibility = {

  floorSwitchVisible: boolean
  dollhouseVisible: boolean
  floorplanVisible: boolean
  panoramaVisible: boolean

}

export const SCENE_EXAMPLE_OVERLAY_KEY: InjectionKey<SceneExampleOverlayVisibility> = Symbol('sceneExampleOverlay')

export function provideSceneExampleOverlay(): ToRefs<SceneExampleOverlayVisibility> {

  const state = reactive<SceneExampleOverlayVisibility>({
    floorSwitchVisible: true,
    dollhouseVisible: true,
    floorplanVisible: true,
    panoramaVisible: true,
  })

  provide(SCENE_EXAMPLE_OVERLAY_KEY, state)

  return toRefs(state)

}

export function useSceneExampleOverlay() {

  return inject(SCENE_EXAMPLE_OVERLAY_KEY, null)

}
