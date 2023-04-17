import { ArrowNavigationState } from './types.d'

export default function registerElementHandler (state: ArrowNavigationState) {
  return (element: HTMLElement, group: string) => {
    if (!group) {
      throw new Error('Group is required')
    }

    const focusableElement = {
      el: element,
      group,
      cachedNextElementByDirection: {}
    }

    state.elements.add(element)
    const existentGroup = state.groups.get(group)

    if (!existentGroup) {
      state.groups.set(group, {
        elements: [focusableElement],
        el: null as unknown as HTMLElement
      })
    } else if (!existentGroup.elements.find(el => el.el === element)) {
      existentGroup.elements.push(focusableElement)
    }

    if (!state.currentElement) {
      state.currentElement = focusableElement
      element.focus()
    }
  }
}
