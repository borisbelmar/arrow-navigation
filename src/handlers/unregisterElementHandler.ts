import type { ArrowNavigationState } from '@/types.d'

export default function unregisterElementHandler (state: ArrowNavigationState) {
  return (element: HTMLElement, group: string) => {
    if (!group) {
      throw new Error('Group is required')
    }

    state.elements.delete(element)

    const focusableGroup = state.groups.get(group)

    if (!focusableGroup) {
      return
    }

    focusableGroup.elements = state.groups
      .get(group)?.elements
      .filter(el => el.el !== element) || []

    if (focusableGroup.elements.length === 0 && !focusableGroup.keepAlive) {
      state.groups.delete(group)
    }
  }
}
