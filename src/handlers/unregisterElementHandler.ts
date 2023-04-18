import type { ArrowNavigationState } from '@/types.d'

export default function unregisterElementHandler (state: ArrowNavigationState) {
  return (element: HTMLElement | string) => {
    const elementId = typeof element === 'string' ? element : element.id
    const groupId = state.elements.get(elementId)?.group as string

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
