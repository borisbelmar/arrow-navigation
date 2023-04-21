import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types.d'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextGroupElement from './findNextGroupElement'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState,
  inGroup?: boolean
}

export default function findNextElement ({
  direction,
  state,
  inGroup = false
}: Props): FocusableElement | null {
  const currentElement = state.currentElement as FocusableElement
  const currentGroup = state.groups.get(currentElement?.group) as FocusableGroup
  const currentGroupConfig = state.groupsConfig.get(currentElement?.group)
  let nextElement: FocusableElement | null = null

  if (currentElement?.nextElementByDirection) {
    const nextElementId = currentElement.nextElementByDirection[direction as Direction]

    if (nextElementId === null) return null

    nextElement = state.elements.get(nextElementId as string) as FocusableElement
  } else {
    nextElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(currentGroup?.elements.values() || []),
      currentFocusElement: currentElement,
      threshold: currentGroupConfig?.threshold,
      isViewportSafe: currentGroupConfig?.viewportSafe
    })
  }

  if (nextElement) {
    return nextElement
  }

  if (!inGroup && !currentGroupConfig?.keepFocus) {
    return findNextGroupElement({
      direction,
      state
    })
  }

  return null
}
