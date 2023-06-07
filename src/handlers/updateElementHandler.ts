/* eslint-disable no-param-reassign */
import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElement, FocusableElementOptions } from '@/types'
import type { EventEmitter } from '@/utils/createEventEmitter'

interface UpdateElementHandlerProps {
  state: ArrowNavigationState
  emit: EventEmitter['emit']
}

export default function updateElementHandler ({
  state,
  emit
}: UpdateElementHandlerProps) {
  return (
    id: string,
    options: FocusableElementOptions
  ) => {
    const existentElement = state.elements.get(id)

    if (!existentElement) {
      return
    }

    const updatedFocusableElement: FocusableElement = {
      ...existentElement,
      ...options
    }

    state.elements.set(id, updatedFocusableElement)
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)
  }
}
