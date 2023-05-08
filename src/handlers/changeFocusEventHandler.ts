import EVENTS from '@/config/events'
import type { ChangeFocusEventHandlerOptions, FocusableElement } from '@/types'

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
      if (prevGroup.saveLast) {
        state.groupsConfig.set(prevGroup.id, {
          ...prevGroup,
          lastElement: (prevElement as FocusableElement).id
        })
      }
      prevGroup.onBlur?.({
        current: prevGroup,
        next: nextGroup,
        direction
      })
      emit(EVENTS.GROUP_BLUR, prevGroup, direction, nextGroup)
    }

    if (nextGroup) {
      nextGroup.onFocus?.({
        current: nextGroup,
        prev: prevGroup,
        direction
      })
      emit(EVENTS.GROUP_FOCUS, nextGroup, direction, prevGroup)
      emit(EVENTS.CURRENT_GROUP_CHANGE, nextGroup, direction, prevGroup)
    }
  }
  if (prevElement) {
    prevElement.onBlur?.({
      current: prevElement,
      next: nextElement,
      direction
    })
    emit(EVENTS.ELEMENT_BLUR, prevElement, direction, nextElement)
  }
  nextElement.onFocus?.({
    current: nextElement,
    prev: prevElement,
    direction
  })
  emit(EVENTS.ELEMENT_FOCUS, nextElement, direction, prevElement)
  emit(EVENTS.CURRENT_ELEMENT_CHANGE, nextElement, direction, prevElement)
}
