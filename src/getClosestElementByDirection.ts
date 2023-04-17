import findClosestElement from './findClosestElementInGroup'
import type { ArrowNavigationState, FocusableElement } from './types'

const getClosestElementByDirection = (
  direction: string,
  state: ArrowNavigationState,
  group: string
): FocusableElement | null => {
  const { currentElement } = state

  const elements = state.groups.get(group)?.elements

  if (!currentElement || !elements) {
    return null
  }

  return findClosestElement({
    direction,
    candidateElements: elements,
    currentFocusElement: currentElement
  })
}

export default getClosestElementByDirection
