import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElementOptions } from '@/types'
import { EventEmitter } from '@/utils/createEventEmitter'
import isElementDisabled from './utils/isElementDisabled'
import isFocusableElement from './utils/isFocusableElement'

export const ERROR_MESSAGES = {
  GROUP_REQUIRED: 'Group is required',
  ELEMENT_ID_REQUIRED: 'Element ID is required',
  ELEMENT_ID_ALREADY_REGISTERED: (id: string) => `Element with id ${id} is already registered. Check if you are not registering the same element twice. If you are, use the "unregisterElement" method to unregister it first.`,
  ELEMENT_NOT_FOCUSABLE: (id: string) => `Element with id ${id} is not focusable. Check if you are not registering an element that is not focusable.`
}

export default function registerElementHandler (
  state: ArrowNavigationState,
  emit: EventEmitter['emit']
) {
  return (
    element: HTMLElement,
    group: string,
    options?: FocusableElementOptions
  ) => {
    if (!group) {
      throw new Error(ERROR_MESSAGES.GROUP_REQUIRED)
    }

    if (!element.id) {
      throw new Error(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
    }

    if (!isFocusableElement(element)) {
      throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
    }

    if (state.elements.get(element.id)) {
      console.warn(ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id))
      return
    }

    const focusableElement = {
      el: element,
      group,
      ...options
    }

    state.elements.set(element.id, focusableElement)
    emit(EVENTS.ELEMENTS_CHANGED, state.elements)

    const existentGroup = state.groups.get(group)
    const existentGroupConfig = state.groupsConfig.get(group)

    if (!existentGroup) {
      const elementsMap = new Map().set(element.id, focusableElement)
      state.groups.set(group, {
        elements: elementsMap,
        el: existentGroupConfig?.el || null as unknown as HTMLElement
      })
      emit(EVENTS.GROUPS_CHANGED, state.groups)
    } else {
      existentGroup.elements.set(element.id, focusableElement)
    }

    if (!state.currentElement && !isElementDisabled(focusableElement.el)) {
      // eslint-disable-next-line no-param-reassign
      state.currentElement = focusableElement
      element.focus()
      emit(EVENTS.CURRENT_ELEMENT_CHANGE, focusableElement)
      emit(EVENTS.CURRENT_GROUP_CHANGE, state.groupsConfig.get(group))
    }
  }
}
