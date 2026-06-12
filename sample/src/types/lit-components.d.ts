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

type LitSwitchViewEventDetail = {

  view?: string

}

type LitSwitchViewBaseProps = {

  enabled?: boolean
  qspace?: unknown
  onLitClick?: (e: CustomEvent<LitSwitchViewEventDetail>) => void
  onLitSwitchComplete?: (e: CustomEvent<LitSwitchViewEventDetail>) => void

}

type LitSwitchViewProps = LitSwitchViewBaseProps & {

  option?: LitPanoramaSwitchOption | null

}

type LitSwitchFloorOption = {

  floors?: Array<{
    idx: number
    name: string
  }>
  currentFloor?: number | 'all'
  allLabel?: string

}

type LitSwitchFloorEventDetail = {

  floor?: number | 'all'

}

type LitSwitchFloorProps = {

  qspace?: unknown
  option?: LitSwitchFloorOption
  enabled?: boolean
  onLitClick?: (e: CustomEvent<LitSwitchFloorEventDetail>) => void
  onLitSwitchComplete?: (e: CustomEvent<LitSwitchFloorEventDetail>) => void

}

declare module 'vue' {

  export interface GlobalComponents {

    'lit-button': DefineComponent<LitButtonProps>
    'lit-switch-panorama-view': DefineComponent<LitSwitchViewProps>
    'lit-switch-dollhouse-view': DefineComponent<LitSwitchViewBaseProps>
    'lit-switch-floorplan-view': DefineComponent<LitSwitchViewBaseProps>
    'lit-switch-floor': DefineComponent<LitSwitchFloorProps>

  }

}
