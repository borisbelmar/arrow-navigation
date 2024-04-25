import EVENTS from '@/config/events'
import type { ArrowNavigationState } from '@/types'
import { EventEmitter } from '@/utils/createEventEmitter'

interface UnregisterElementHandlerProps {
  state: ArrowNavigationState
  emit: EventEmitter['emit']
}

export default function unregisterElementHandler ({
  state,
  emit
}: UnregisterElementHandlerProps) {
  return (id: string) => {
    const groupId = state.elements.get(id)?.group as string

    state.elements.delete(id)
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)

    const focusableGroup = state.groups.get(groupId)

    if (!focusableGroup) {
      return
    }

    focusableGroup.elements.delete(id)

    if (focusableGroup.elements.size === 0) {
      state.groups.delete(groupId)
      emit(EVENTS.GROUPS_CHANGED, state.groups)
    }

    if (state.currentElement === id) {
      // eslint-disable-next-line no-param-reassign
      state.currentElement = null
    }
  }
}
