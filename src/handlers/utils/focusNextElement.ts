import type { ArrowNavigationEvents, ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types.d'
import findClosestElementInGroup from './findClosestElementInGroup'
import focusNextGroupElement from './focusNextGroupElement'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement) => void
  // TODO: onReachLastElement implementation pending
  arrowNavigationEvents?: ArrowNavigationEvents
}

export default function focusNextElement ({
  direction,
  state,
  onChangeCurrentElement,
  arrowNavigationEvents
}: Props) {
  const currentElement = state.currentElement as FocusableElement
  const currentGroup = state.groups.get(currentElement.group) as FocusableGroup
  const currentGroupConfig = state.groupsConfig.get(currentElement.group)
  let nextElement: FocusableElement | null = null

  if (currentElement.nextElementByDirection) {
    const nextElementId = currentElement.nextElementByDirection[direction as Direction]

    if (nextElementId === null) return

    nextElement = state.elements.get(nextElementId as string) as FocusableElement
  } else {
    nextElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(currentGroup.elements.values()),
      currentFocusElement: currentElement,
      threshold: currentGroupConfig?.threshold,
      isViewportSafe: currentGroupConfig?.viewportSafe
    })
  }

  if (nextElement) {
    onChangeCurrentElement(nextElement)
  } else if (!currentGroupConfig?.keepFocus) {
    focusNextGroupElement({
      direction,
      state,
      onChangeCurrentElement,
      arrowNavigationEvents
    })
  }
}
