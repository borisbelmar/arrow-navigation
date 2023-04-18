import type { ArrowNavigationState, FocusableGroup, FocusableGroupConfig } from '@/types.d'

type Options = Omit<FocusableGroupConfig, 'el'>

const defaultGroupConfig: Options = {
  firstElement: undefined,
  nextGroupByDirection: undefined,
  saveLast: false,
  viewportSafe: true,
  threshold: 0
}

export const ERROR_MESSAGES = {
  GROUP_ID_REQUIRED: 'Group ID is required'
}

export default function registerGroupHandler (state: ArrowNavigationState) {
  return (
    element: HTMLElement,
    options?: Options
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

    state.groupsConfig.set(id, {
      ...defaultGroupConfig,
      ...options,
      el: element
    })
  }
}
