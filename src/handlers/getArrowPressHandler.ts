import type { ArrowNavigationEvents, ArrowNavigationState, FocusableElement } from '@/types.d'
import focusNextElement from './utils/focusNextElement'

const keyToDirection: { [x: string]: string } = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down'
}

export const ERROR_MESSAGES = {
  NO_ELEMENT_FOCUSED: 'No element is focused. Check if you have registered any elements'
}

export default function getArrowPressHandler (
  state: ArrowNavigationState,
  onChangeCurrentElement: (element: FocusableElement) => void,
  arrowNavigationEvents: ArrowNavigationEvents
) {
  return (event: KeyboardEvent) => {
    const { key } = event
    const direction = keyToDirection[key]

    if (!direction) return

    const currentElement = state.currentElement
    if (!currentElement) {
      console.warn(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
      return
    }

    focusNextElement({
      direction,
      state,
      onChangeCurrentElement,
      arrowNavigationEvents
    })
  }
}
