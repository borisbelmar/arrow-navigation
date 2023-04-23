import EVENTS from '@/config/events'
import type { ChangeFocusEventHandlerOptions } from '@/types.d'

export default function changeFocusEventHandler ({
  nextElement,
  prevElement,
  direction,
  state,
  emit
}: ChangeFocusEventHandlerOptions) {
  if (!nextElement) {
    return
  }
  const sameGroup = prevElement?.group === nextElement.group

  if (!sameGroup) {
    const prevGroup = state.groupsConfig.get(prevElement?.group as string)
    const nextGroup = state.groupsConfig.get(nextElement.group as string)

    if (prevGroup) {
      prevGroup.onBlur?.()
      emit(EVENTS.GROUP_BLUR, prevGroup, direction)
    }

    if (nextGroup) {
      nextGroup.onFocus?.()
      emit(EVENTS.GROUP_FOCUS, nextGroup, direction)
      emit(EVENTS.CURRENT_GROUP_CHANGE, nextGroup, direction)
    }
  }
  if (prevElement) {
    prevElement.onBlur?.()
    emit(EVENTS.ELEMENT_BLUR, prevElement, direction)
  }
  nextElement.onFocus?.()
  emit(EVENTS.ELEMENT_FOCUS, nextElement, direction)
  emit(EVENTS.CURRENT_ELEMENT_CHANGE, nextElement, direction)
}
