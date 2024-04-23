import type { ArrowNavigationState, Direction, FocusableElement } from '@/types'

interface SetFocusHandlerProps {
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement, direction?: Direction) => void
}

export default function setFocusHandler ({
  state,
  onChangeCurrentElement
}: SetFocusHandlerProps) {
  return (id: string) => {
    const focusableElement = state.elements.get(id)

    if (!focusableElement) {
      return
    }
    onChangeCurrentElement(focusableElement)
  }
}
