import { ArrowNavigationState } from './types.d'

export default function setFocusHandler (state: ArrowNavigationState) {
  return (id: string, group: string) => {
    if (!group) {
      throw new Error('Group is required')
    }
    const groupElements = state.groups.get(group)?.elements

    if (!groupElements) {
      console.warn(`Group ${group} does not exist or not have any elements`)
      return
    }

    const focusableElement = groupElements.find(el => el?.el?.id === id)

    if (!focusableElement) {
      console.warn(`Element with ID ${id} is not in group ${group}`)
      return
    }
    // eslint-disable-next-line no-param-reassign
    state.currentElement = focusableElement
    focusableElement.el.focus()
  }
}
