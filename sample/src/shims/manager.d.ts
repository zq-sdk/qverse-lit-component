declare module '@/manager/scan-scene-init.js' {
  export function loadAdaptedSceneData(bootData: unknown): Promise<unknown>
  export function resolveFloorOptionFromAdaptedData(adaptedData: unknown): Array<{
    idx: number
    name: string
  }>
}

declare module '@/utils/renderer-stage-host.js' {
  export function attachRendererStage(container: HTMLElement): HTMLElement | null
  export function detachRendererStage(): void
}
