import { LitElement, css, html } from 'lit'
import { property } from 'lit/decorators.js'
import { safeCustomElement } from '../../utils/define-lit-element.js'
import { designTokens } from '../../styles/tokens.js'

export type LitButtonVariant = 'primary' | 'success' | 'danger' | 'default'
export type LitButtonSize = 'small' | 'medium' | 'large'

@safeCustomElement('lit-button')
export class LitButton extends LitElement {

  @property({ type: String, reflect: true })
  public variant: LitButtonVariant = 'default'

  @property({ type: String, reflect: true })
  public size: LitButtonSize = 'medium'

  @property({ type: Boolean, reflect: true })
  public disabled = false

  @property({ type: Boolean, reflect: true })
  public block = false

  public static styles = [
    designTokens,
    css`
      :host {
        display: inline-block;
      }
      :host([block]) {
        display: block;
      }
      button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        box-sizing: border-box;
        border: 1px solid var(--lit-border);
        border-radius: var(--lit-radius);
        background: var(--lit-bg);
        color: var(--lit-text-regular);
        cursor: pointer;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: 1;
        padding: 0 15px;
        transition:
          background-color 0.15s,
          border-color 0.15s,
          color 0.15s;
        width: 100%;
      }
      button:hover:not(:disabled) {
        border-color: var(--lit-color-primary);
        color: var(--lit-color-primary);
        background: var(--lit-color-primary-light-9, #ecf5ff);
      }
      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host([variant='primary']) button {
        background: var(--lit-color-primary);
        border-color: var(--lit-color-primary);
        color: #fff;
      }
      :host([variant='primary']) button:hover:not(:disabled) {
        background: var(--lit-color-primary-hover);
        border-color: var(--lit-color-primary-hover);
        color: #fff;
      }
      :host([variant='success']) button {
        background: var(--lit-color-success);
        border-color: var(--lit-color-success);
        color: #fff;
      }
      :host([variant='success']) button:hover:not(:disabled) {
        background: var(--lit-color-success-hover);
        border-color: var(--lit-color-success-hover);
        color: #fff;
      }
      :host([variant='danger']) button {
        background: var(--lit-color-danger);
        border-color: var(--lit-color-danger);
        color: #fff;
      }
      :host([variant='danger']) button:hover:not(:disabled) {
        background: var(--lit-color-danger-hover);
        border-color: var(--lit-color-danger-hover);
        color: #fff;
      }
      :host([size='small']) button {
        height: var(--lit-button-height-small);
        padding: 0 11px;
        font-size: 12px;
      }
      :host([size='medium']) button {
        height: var(--lit-button-height);
      }
      :host([size='large']) button {
        height: var(--lit-button-height-large);
        padding: 0 19px;
        font-size: 16px;
      }
    `,
  ]

  private _onClick(event: MouseEvent) {

    if (this.disabled) {

      event.preventDefault()
      event.stopPropagation()

      return

    }

    event.stopPropagation()

    this.dispatchEvent(

      new MouseEvent('click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: event.detail,
      }),

    )

    this.dispatchEvent(

      new CustomEvent('lit-click', {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          originalEvent: event,
          payload: { variant: this.variant },
        },
      }),

    )

  }

  render() {

    return html`
      <button type="button" ?disabled=${this.disabled} part="button" @click=${this._onClick}>
        <slot></slot>
      </button>
    `

  }

}

declare global {

  interface HTMLElementTagNameMap {

    'lit-button': LitButton

  }

}
