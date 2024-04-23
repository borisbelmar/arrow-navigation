import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableGroupOptions } from '@/types'
import { EventEmitter } from '@/utils/createEventEmitter'

const defaultGroupConfig: FocusableGroupOptions = {
  firstElement: undefined,
  lastElement: undefined,
  nextGroupByDirection: undefined,
  saveLast: false,
  viewportSafe: true,
  threshold: 0,
  arrowDebounce: true
}

export const ERROR_MESSAGES = {
  GROUP_ID_REQUIRED: 'Group ID is required'
}

interface RegisterGroupHandlerProps {
  state: ArrowNavigationState
  emit: EventEmitter['emit']
}

export default function resetGroupStateHandler ({
  state,
  emit
}: RegisterGroupHandlerProps) {
  return (
    id: string
  ) => {
    if (!id) {
      throw new Error(ERROR_MESSAGES.GROUP_ID_REQUIRED)
    }

    const element = state.adapter.getNodeRef({ id }) as HTMLElement

    const prevConfig = state.groupsConfig.get(id)

    state.groupsConfig.set(id, {
      ...defaultGroupConfig,
      ...prevConfig,
      lastElement: undefined,
      id,
      _ref: element
    })
    emit(EVENTS.GROUPS_CONFIG_CHANGED, state.groupsConfig)
  }
}
