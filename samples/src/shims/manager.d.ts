declare module '@/manager/scan-scene-init.js' {
  export function loadAdaptedSceneData(bootData: unknown): Promise<unknown>
}

declare module '@/utils/renderer-stage-host.js' {
  export function attachRendererStage(container: HTMLElement): HTMLElement | null
  export function detachRendererStage(): void
}
