import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableGroup, FocusableGroupOptions } from '@/types'
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
  GROUP_ID_REQUIRED: 'Group ID is required',
  GROUP_DOES_NOT_EXIST: (id: string) => `Group with id ${id} does not exist. Check if you are not registering a group that does not exist.`
}

interface RegisterGroupHandlerProps {
  state: ArrowNavigationState
  emit: EventEmitter['emit']
}

export default function registerGroupHandler ({
  state,
  emit
}: RegisterGroupHandlerProps) {
  return (
    id: string,
    options?: FocusableGroupOptions
  ) => {
    if (!id) {
      throw new Error(ERROR_MESSAGES.GROUP_ID_REQUIRED)
    }

    const element = state.adapter.getNodeRef({ id }) as HTMLElement
    if (!element) {
      throw new Error(ERROR_MESSAGES.GROUP_DOES_NOT_EXIST(id))
    }

    const existentGroup = state.groups.get(id)

    const prevElements: FocusableGroup['elements'] = existentGroup?.elements || new Set()
    const prevConfig = state.groupsConfig.get(id)

    state.groups.set(id, {
      id,
      elements: prevElements,
      _ref: element
    })
    emit(EVENTS.GROUPS_CHANGED, state.groups)

    state.groupsConfig.set(id, {
      ...defaultGroupConfig,
      ...options,
      id,
      lastElement: prevConfig?.lastElement || undefined,
      _ref: element
    })
    emit(EVENTS.GROUPS_CONFIG_CHANGED, state.groupsConfig)
  }
}
