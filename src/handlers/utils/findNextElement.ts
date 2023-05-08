import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types'
import getCurrentElement from '@/utils/getCurrentElement'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextElementByDirection from './findNextElementByDirection'
import findNextGroup from './findNextGroup'
import findNextByDirection from './findNextByDirection'

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
  const selectedElement = fromElement || getCurrentElement(state) as FocusableElement
  const fromGroup = state.groups.get(selectedElement?.group) as FocusableGroup
  const fromGroupConfig = state.groupsConfig.get(selectedElement?.group)
  let nextElement: FocusableElement | null | undefined

  if (selectedElement?.nextByDirection
    || (fromGroupConfig?.byOrder || selectedElement?.order !== undefined)
  ) {
    nextElement = findNextByDirection({
      direction,
      fromElement: selectedElement,
      state
    })
    if (nextElement === null) return null
  } else if (selectedElement?.nextElementByDirection) {
    /**
     * If the current element has a nextElementByDirection property, we use it
     * to find the next element.
     * This will be removed in the next major version.
     */
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
      candidateElements: fromGroup?.elements,
      state,
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
