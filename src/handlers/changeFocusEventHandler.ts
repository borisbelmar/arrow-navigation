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
      emit(EVENTS.GROUP_BLUR, {
        current: prevGroup,
        next: nextGroup,
        direction
      })
    }

    if (nextGroup) {
      nextGroup.onFocus?.({
        current: nextGroup,
        prev: prevGroup,
        direction
      })
      emit(EVENTS.GROUP_FOCUS, {
        current: nextGroup,
        prev: prevGroup,
        direction
      })
      emit(EVENTS.CURRENT_GROUP_CHANGE, {
        current: nextGroup,
        prev: prevGroup,
        direction
      })
    }
  }
  if (prevElement) {
    prevElement.onBlur?.({
      current: prevElement,
      next: nextElement,
      direction
    })
    emit(EVENTS.ELEMENT_BLUR, {
      current: prevElement,
      next: nextElement,
      direction
    })
  }
  nextElement.onFocus?.({
    current: nextElement,
    prev: prevElement,
    direction
  })
  emit(EVENTS.ELEMENT_FOCUS, {
    current: nextElement,
    prev: prevElement,
    direction
  })
  emit(EVENTS.CURRENT_ELEMENT_CHANGE, {
    current: nextElement,
    prev: prevElement,
    direction
  })
}
