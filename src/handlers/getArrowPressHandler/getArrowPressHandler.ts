import findClosestElementInGroup from './findClosestElementInGroup'
import findClosestGroup from './findClosestGroup'
import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types.d'

const keyToDirection: { [x: string]: string } = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down'
}

export default function getArrowPressHandler (state: ArrowNavigationState) {
  return (event: KeyboardEvent) => {
    const currentElement = state.currentElement
    const group = currentElement?.group || ''
    const currentGroup = state.groups.get(group) as FocusableGroup

    if (!currentGroup) {
      console.warn(`Group ${group} does not exist`)
      return
    }

    const { key } = event

    const elements = state.groups.get(group)?.elements

    if (!currentElement && !elements) {
      console.warn(`Group ${group} does not have any elements`)
      return
    }

    const focusableElement = findClosestElementInGroup({
      direction: keyToDirection[key],
      candidateElements: elements || [],
      currentFocusElement: currentElement as FocusableElement
    })

    if (focusableElement) {
      // eslint-disable-next-line no-param-reassign
      state.currentElement = focusableElement
      focusableElement.el.focus()
    } else {
      const closestGroup = findClosestGroup({
        direction: keyToDirection[key],
        currentElement: currentElement as FocusableElement,
        candidateGroups: state.groups
      })

      if (closestGroup) {
        const firstGroupElement = closestGroup.firstElement || closestGroup.elements[0]
        if (!firstGroupElement) {
          console.warn(`Group ${closestGroup.el.id} does not have any elements`)
          return
        }
        // eslint-disable-next-line no-param-reassign
        state.currentElement = firstGroupElement
        state.currentElement?.el.focus()
      }
    }
  }
}
