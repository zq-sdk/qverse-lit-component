import type { DefineComponent } from 'vue'

type LitButtonProps = {

  variant?: 'primary' | 'success' | 'danger' | 'default'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  block?: boolean
  onClick?: (e: MouseEvent) => void
  onLitClick?: (e: CustomEvent<{ payload?: { variant?: string } }>) => void

}

type LitPanoramaSwitchOption = {

  locationId?: string
  quaternion?: {
    x: number
    y: number
    z: number
    w: number
  }

}

type LitSwitchViewProps = {

  enabled?: boolean
  qspace?: unknown
  option?: LitPanoramaSwitchOption | null
  onLitSwitchPanoramaClick?: (e: CustomEvent<{ view?: string }>) => void
  onLitSwitchPanoramaComplete?: (e: CustomEvent<{ view?: string }>) => void
  onLitSwitchDollhouseClick?: (e: CustomEvent<{ view?: string }>) => void
  onLitSwitchDollhouseComplete?: (e: CustomEvent<{ view?: string }>) => void
  onLitSwitchFloorplanClick?: (e: CustomEvent<{ view?: string }>) => void
  onLitSwitchFloorplanComplete?: (e: CustomEvent<{ view?: string }>) => void

}

type LitSwitchDollhouseFloorplanProps = Omit<LitSwitchViewProps, 'option'>

declare module 'vue' {

  export interface GlobalComponents {

    'lit-button': DefineComponent<LitButtonProps>
    'lit-switch-panorama-view': DefineComponent<LitSwitchViewProps>
    'lit-switch-dollhouse-view': DefineComponent<LitSwitchDollhouseFloorplanProps>
    'lit-switch-floorplan-view': DefineComponent<LitSwitchDollhouseFloorplanProps>

  }

}
