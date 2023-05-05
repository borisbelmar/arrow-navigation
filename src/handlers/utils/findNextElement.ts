import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextElementByDirection from './findNextElementByDirection'
import findNextGroup from './findNextGroup'

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
  const currentElement = state.elements.get(state.currentElement as string) as FocusableElement
  const selectedElement = fromElement || currentElement
  const fromGroup = state.groups.get(selectedElement?.group) as FocusableGroup
  const fromGroupConfig = state.groupsConfig.get(selectedElement?.group)
  let nextElement: FocusableElement | null | undefined

  if (selectedElement?.nextElementByDirection) {
    nextElement = findNextElementByDirection({
      fromElement: selectedElement,
      direction,
      state
    })
    if (nextElement === null) return null
  }

  if (!nextElement) {
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

  const nextGroupAndElement = findNextGroup({
    direction,
    fromElement: selectedElement,
    state
  })

  if (!nextGroupAndElement) return null

  return nextGroupAndElement.element
}
