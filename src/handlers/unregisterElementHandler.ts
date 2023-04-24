import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElement } from '@/types'
import { EventEmitter } from '@/utils/createEventEmitter'
import focusNextElement from './utils/focusNextElement'

export default function unregisterElementHandler (
  state: ArrowNavigationState,
  onChangeCurrentElement: (element: FocusableElement) => void,
  emit: EventEmitter['emit']
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
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)

    const focusableGroup = state.groups.get(groupId)

    if (!focusableGroup) {
      return
    }

    focusableGroup.elements.delete(elementId)

    if (focusableGroup.elements.size === 0) {
      state.groups.delete(groupId)
      emit(EVENTS.GROUPS_CHANGED, state.groups)
    }
  }
}
