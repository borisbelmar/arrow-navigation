import EVENTS from '@/config/events'
import type { ArrowNavigationState, FocusableElement, FocusableElementOptions } from '@/types'
import type { EventEmitter } from '@/utils/createEventEmitter'
import getElementIdByOrder from '@/utils/getElementIdByOrder'
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
  onChangeCurrentElement: (element: FocusableElement) => void,
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

    const existentGroup = state.groups.get(group)
    const existentGroupConfig = state.groupsConfig.get(group)

    const isByOrder = existentGroupConfig?.byOrder
      && options?.order !== undefined

    if (!element.id && !isByOrder) {
      throw new Error(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
    }

    if (!isFocusableElement(element)) {
      throw new Error(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
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

    if (!state.currentElement && !isElementDisabled(focusableElement.el)) {
      onChangeCurrentElement(focusableElement)
    }
  }
}
