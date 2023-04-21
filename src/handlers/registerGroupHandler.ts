import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableGroup, FocusableGroupOptions } from '@/types.d'
import { EventEmitter } from '@/utils/createEventEmitter'

const defaultGroupConfig: FocusableGroupOptions = {
  firstElement: undefined,
  nextGroupByDirection: undefined,
  saveLast: false,
  viewportSafe: true,
  threshold: 0
}

export const ERROR_MESSAGES = {
  GROUP_ID_REQUIRED: 'Group ID is required'
}

export default function registerGroupHandler (
  state: ArrowNavigationState,
  emit: EventEmitter['emit']
) {
  return (
    element: HTMLElement,
    options?: FocusableGroupOptions
  ) => {
    const id = element.id
    if (!id) {
      throw new Error(ERROR_MESSAGES.GROUP_ID_REQUIRED)
    }

    const existentGroup = state.groups.get(id)

    const prevElements: FocusableGroup['elements'] = existentGroup?.elements || new Map()

    state.groups.set(id, {
      elements: prevElements,
      el: element
    })
    emit(EVENTS.GROUPS_CHANGED, state.groups)

    state.groupsConfig.set(id, {
      ...defaultGroupConfig,
      ...options,
      el: element
    })
    emit(EVENTS.GROUPS_CONFIG_CHANGED, state.groupsConfig)
  }
}
