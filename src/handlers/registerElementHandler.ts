import type { ArrowNavigationState, FocusableElement } from '@/types.d'
import isFocusableElement from './utils/isFocusableElement'

type Options = Omit<FocusableElement, 'el' | 'group'>

export const ERROR_MESSAGES = {
  GROUP_REQUIRED: 'Group is required',
  ELEMENT_ID_REQUIRED: 'Element ID is required',
  ELEMENT_ID_ALREADY_REGISTERED: (id: string) => `Element with id ${id} is already registered. Check if you are not registering the same element twice. If you are, use the "unregisterElement" method to unregister it first.`,
  ELEMENT_NOT_FOCUSABLE: (id: string) => `Element with id ${id} is not focusable. Check if you are not registering an element that is not focusable.`
}

export default function registerElementHandler (state: ArrowNavigationState) {
  return (
    element: HTMLElement,
    group: string,
    options?: Options
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
    const existentGroup = state.groups.get(group)
    const existentGroupConfig = state.groupsConfig.get(group)

    if (!existentGroup) {
      const elementsMap = new Map().set(element.id, focusableElement)
      state.groups.set(group, {
        elements: elementsMap,
        el: existentGroupConfig?.el || null as unknown as HTMLElement
      })
    } else {
      existentGroup.elements.set(element.id, focusableElement)
    }

    if (!state.currentElement) {
      // eslint-disable-next-line no-param-reassign
      state.currentElement = focusableElement
      element.focus()
    }
  }
}
