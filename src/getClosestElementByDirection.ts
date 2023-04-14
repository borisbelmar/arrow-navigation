import findClosestElement from './findClosestElement'
import type { ArrowNavigationState } from './types'

const getClosestElementByDirection = (
  direction: string,
  state: ArrowNavigationState
): HTMLElement | null => {
  const { currentElement, elements } = state

  if (!currentElement) {
    return null
  }

  return findClosestElement(elements, currentElement, direction)
}

export default getClosestElementByDirection
