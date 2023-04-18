import type { ArrowNavigationState, FocusableGroup } from '@/types.d'

export default function registerGroupHandler (state: ArrowNavigationState) {
  return (
    element: HTMLElement,
    options?: Pick<FocusableGroup, 'firstElement' | 'nextGroupByDirection' | 'saveLast' | 'focusType'>
  ) => {
    const id = element.id
    if (!id) {
      throw new Error('Group ID is required')
    }

    const existentGroup = state.groups.get(id)

    const prevElements: FocusableGroup['elements'] = existentGroup?.elements || []

    if (existentGroup) {
      state.groups.delete(id)
    }

    state.groups.set(id, {
      elements: prevElements,
      el: element,
      ...(options || {})
    })
  }
}
