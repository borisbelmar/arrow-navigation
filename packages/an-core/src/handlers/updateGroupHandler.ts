/* eslint-disable no-param-reassign */
import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableGroupConfig } from '@/types'
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
    config: Omit<FocusableGroupConfig, 'id'>
  ) => {
    const existentGroupConfig = state.groupsConfig.get(id)

    if (!existentGroupConfig) {
      return
    }

    const updatedFocusableGroup: FocusableGroupConfig = {
      ...existentGroupConfig,
      ...config
    }

    state.groupsConfig.set(id, updatedFocusableGroup)
    emit(EVENTS.GROUPS_CHANGED, state.elements)
  }
}
