import type { ArrowNavigationState } from '@/types.d'

export default function setFocusHandler (state: ArrowNavigationState) {
  return (id: string) => {
    const focusableElement = state.elements.get(id)

    if (!focusableElement) {
      return
    }
    // eslint-disable-next-line no-param-reassign
    state.currentElement = focusableElement
    focusableElement.el.focus()
  }
}
