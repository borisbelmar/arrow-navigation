import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextGroupElement from './findNextGroupElement'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState,
  inGroup?: boolean
  fromElement?: FocusableElement
}

export default function findNextElement ({
  fromElement,
  direction,
  state,
  inGroup = false
}: Props): FocusableElement | null {
  const selectedElement = fromElement || state.currentElement as FocusableElement
  const fromGroup = state.groups.get(selectedElement?.group) as FocusableGroup
  const fromGroupConfig = state.groupsConfig.get(selectedElement?.group)
  let nextElement: FocusableElement | null = null

  if (selectedElement?.nextElementByDirection) {
    const nextElementId = selectedElement.nextElementByDirection[direction as Direction]

    if (nextElementId === null) return null

    nextElement = state.elements.get(nextElementId as string) as FocusableElement
  } else {
    nextElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(fromGroup?.elements.values() || []),
      currentFocusElement: selectedElement,
      threshold: fromGroupConfig?.threshold,
      isViewportSafe: fromGroupConfig?.viewportSafe
    })
  }

  if (nextElement) {
    return nextElement
  }

  if (inGroup || fromGroupConfig?.keepFocus) {
    return null
  }

  return findNextGroupElement({
    fromElement: selectedElement,
    direction,
    state
  })
}
