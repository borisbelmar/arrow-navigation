import type { ArrowNavigationState, FocusableElement } from '@/types.d'
import focusNextElement from './utils/focusNextElement'

export default function unregisterElementHandler (
  state: ArrowNavigationState,
  onChangeCurrentElement: (element: FocusableElement) => void
) {
  return (element: HTMLElement | string) => {
    const elementId = typeof element === 'string' ? element : element.id
    const groupId = state.elements.get(elementId)?.group as string

    if (elementId === state.currentElement?.el.id) {
      focusNextElement({
        direction: undefined,
        state,
        onChangeCurrentElement
      })
    }

    state.elements.delete(elementId)

    const focusableGroup = state.groups.get(groupId)

    if (!focusableGroup) {
      return
    }

    focusableGroup.elements.delete(elementId)

    if (focusableGroup.elements.size === 0) {
      state.groups.delete(groupId)
    }
  }
}
