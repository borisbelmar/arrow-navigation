import type { ArrowNavigationState, Direction, FocusableElement } from '@/types.d'

export default function setFocusHandler (
  state: ArrowNavigationState,
  onChangeCurrentElement: (element: FocusableElement, direction?: Direction) => void
) {
  return (id: string) => {
    const focusableElement = state.elements.get(id)

    if (!focusableElement) {
      return
    }
    onChangeCurrentElement(focusableElement)
  }
}
