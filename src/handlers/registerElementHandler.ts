/* eslint-disable no-param-reassign */
import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElementOptions } from '@/types'
import type { EventEmitter } from '@/utils/createEventEmitter'
import getElementIdByOrder from '@/utils/getElementIdByOrder'

export const ERROR_MESSAGES = {
  GROUP_REQUIRED: 'Group is required',
  ELEMENT_ID_REQUIRED: 'Element ID is required',
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
    element: HTMLElement,
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

    if (!element.id && !isByOrder) {
      throw new Error(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
    }

    if (state.elements.get(element.id)) {
      console.warn(ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id))
      return
    }

    const id = isByOrder
      ? getElementIdByOrder(group, options.order || 0)
      : element.id

    element.setAttribute('id', id)

    const focusableElement = {
      id,
      el: element,
      group,
      ...options
    }

    if (!state.adapter.isNodeFocusable(focusableElement)) {
      throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
    }

    clearTimeout(timeout)

    state.elements.set(id, focusableElement)
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)

    if (!existentGroup) {
      const elementsSet = new Set<string>().add(id)
      state.groups.set(group, {
        id: group,
        elements: elementsSet,
        el: existentGroupConfig?.el || null as unknown as HTMLElement
      })
      emit(EVENTS.GROUPS_CHANGED, state.groups)
    } else {
      existentGroup.elements.add(id)
    }

    timeout = setTimeout(() => {
      emit(EVENTS.ELEMENTS_REGISTER_END)
    }, TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)
  }
}
