import type { ArrowNavigationState, Direction, FocusableElement } from '@/types'
import getCurrentElement from '@/utils/getCurrentElement'
import findNextElement from './utils/findNextElement'

interface DirectionPressHandlerProps {
  state: ArrowNavigationState
  direction: Direction
  onChangeCurrentElement: (element: FocusableElement, dir: Direction) => void
  repeat: boolean
}

export const ERROR_MESSAGES = {
  NO_ELEMENT_FOCUSED: 'No element is focused. Check if you have registered any elements'
}

export default function directionPressHandler ({
  state,
  direction,
  repeat,
  onChangeCurrentElement
}: DirectionPressHandlerProps) {
  const currentElement = getCurrentElement(state)
  if (!currentElement) {
    const initialElement = state.elements.get(state.initialFocusElement || '')
    if (initialElement) {
      onChangeCurrentElement(initialElement, direction)
      return
    }
    const firstRegisteredElement = state.elements.values().next().value
    if (firstRegisteredElement) {
      onChangeCurrentElement(firstRegisteredElement, direction)
    } else {
      console.warn(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
    }
    return
  }
  const currentGroupConfig = state.groupsConfig.get(currentElement.group)

  if (currentGroupConfig?.arrowDebounce && repeat) {
    return
  }

  const nextElement = findNextElement({ direction, state, fromElement: currentElement })

  if (nextElement) {
    onChangeCurrentElement(nextElement, direction as Direction)
  }
}
