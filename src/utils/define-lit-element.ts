type CustomElementClass = new (...args: any[]) => HTMLElement

/**
 * 安全注册自定义元素：微前端多应用 / HMR 重复加载同一模块时跳过已注册标签
 */
export function safeCustomElement(tag: string) {

  return <T extends CustomElementClass>(
    cls: T,
    _context?: ClassDecoratorContext,
  ): T => {

    if (!customElements.get(tag)) {

      customElements.define(tag, cls)

    }

    return cls

  }

}
