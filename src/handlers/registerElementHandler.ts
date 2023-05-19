/* eslint-disable no-param-reassign */
import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElement, FocusableElementOptions } from '@/types'
import type { EventEmitter } from '@/utils/createEventEmitter'
import getElementIdByOrder from '@/utils/getElementIdByOrder'

export const ERROR_MESSAGES = {
  GROUP_REQUIRED: 'Group is required',
  ELEMENT_ID_REQUIRED: 'Element ID is required',
  ELEMENT_DOES_NOT_EXIST: (id: string) => `Element with id ${id} does not exist. Check if you are not registering an element that does not exist.`,
  ELEMENT_ID_ALREADY_REGISTERED: (id: string) => `Element with id ${id} is already registered. Check if you are not registering the same element twice. If you are, use the "unregisterElement" method to unregister it first.`,
  ELEMENT_NOT_FOCUSABLE: (id: string) => `Element with id ${id} is not focusable. Check if you are not registering an element that is not focusable.`
}

export const TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED = 500
let timeout: ReturnType<typeof setTimeout>

interface RegisterElementHandlerProps {
  state: ArrowNavigationState
  emit: EventEmitter['emit']
}

export default function registerElementHandler ({
  state,
  emit
}: RegisterElementHandlerProps) {
  return (
    id: string,
    group: string,
    options?: FocusableElementOptions
  ) => {
    if (!group) {
      throw new Error(ERROR_MESSAGES.GROUP_REQUIRED)
    }

    const existentGroup = state.groups.get(group)
    const existentGroupConfig = state.groupsConfig.get(group)

    const isByOrder = existentGroupConfig?.byOrder
      && options?.order !== undefined

    const element = state.adapter.getNodeRef({ id }) as HTMLElement

    if (!id && !isByOrder) {
      throw new Error(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
    }

    if (!element) {
      throw new Error(ERROR_MESSAGES.ELEMENT_DOES_NOT_EXIST(id))
    }

    if (state.elements.get(id)) {
      console.warn(ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(id))
      return
    }

    const finalId = isByOrder
      ? getElementIdByOrder(group, options.order || 0)
      : id

    element.setAttribute('id', finalId)

    const focusableElement: FocusableElement = {
      id: finalId,
      _ref: element,
      group,
      ...options
    }

    if (!state.adapter.isNodeFocusable(focusableElement)) {
      throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
    }

    clearTimeout(timeout)

    state.elements.set(finalId, focusableElement)
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)

    if (!existentGroup) {
      const elementsSet = new Set<string>().add(finalId)
      state.groups.set(group, {
        id: group,
        elements: elementsSet,
        // eslint-disable-next-line no-underscore-dangle
        _ref: existentGroupConfig?._ref || null as unknown as HTMLElement
      })
      emit(EVENTS.GROUPS_CHANGED, state.groups)
    } else {
      existentGroup.elements.add(finalId)
    }

    timeout = setTimeout(() => {
      emit(EVENTS.ELEMENTS_REGISTER_END)
    }, state.registerCooldown || TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)
  }
}
