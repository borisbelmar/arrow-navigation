import EVENTS from '@/config/events'
import type { EventEmitter } from '@/utils/createEventEmitter'
import type { ArrowNavigationState, FocusableElement } from '@/types.d'

export default function changeFocusEventHandler (
  nextElement: FocusableElement,
  state: ArrowNavigationState,
  emit: EventEmitter['emit']
) {
  const prevElement = state.currentElement
  const sameGroup = prevElement?.group === nextElement.group

  if (!sameGroup) {
    const prevGroup = state.groupsConfig.get(prevElement?.group as string)
    const nextGroup = state.groupsConfig.get(nextElement.group)

    if (prevGroup) {
      prevGroup.onBlur?.()
      emit(EVENTS.GROUP_BLUR, prevGroup)
    }

    if (nextGroup) {
      nextGroup.onFocus?.()
      emit(EVENTS.GROUP_FOCUS, nextGroup)
      emit(EVENTS.CURRENT_GROUP_CHANGE, nextGroup)
    }
  }
  if (prevElement) {
    prevElement.onBlur?.()
    emit(EVENTS.ELEMENT_BLUR, prevElement)
  }
  nextElement.onFocus?.()
  emit(EVENTS.ELEMENT_FOCUS, nextElement)
  emit(EVENTS.CURRENT_ELEMENT_CHANGE, nextElement)
}
