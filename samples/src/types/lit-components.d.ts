import type { DefineComponent } from 'vue'

type LitButtonProps = {

  variant?: 'primary' | 'success' | 'danger' | 'default'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  block?: boolean
  onClick?: (e: MouseEvent) => void
  onLitClick?: (e: CustomEvent<{ payload?: { variant?: string } }>) => void

}

type LitSwitchViewProps = {

  buttonEnabled?: boolean
  active?: boolean
  switching?: boolean
  qspace?: unknown

}

declare module 'vue' {

  export interface GlobalComponents {

    'lit-button': DefineComponent<LitButtonProps>
    'lit-switch-panorama-view': DefineComponent<LitSwitchViewProps>
    'lit-switch-dollhouse-view': DefineComponent<LitSwitchViewProps>
    'lit-switch-floorplan-view': DefineComponent<LitSwitchViewProps>

  }

}
