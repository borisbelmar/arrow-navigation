import type { ArrowNavigationState, FocusableElement, FocusableGroupConfig } from '@/types'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextGroup from './findNextGroup'
import isElementDisabled from './isElementDisabled'
import findNextElementByDirection from './findNextElementByDirection'

interface Props {
  fromElement: FocusableElement
  direction: string | undefined
  state: ArrowNavigationState
}

export default function findNextGroupElement ({
  fromElement,
  direction,
  state
}: Props): FocusableElement | null {
  const nextGroup = findNextGroup({ fromElement, direction, state })

  if (nextGroup) {
    let nextElement: FocusableElement | null = null
    const config = state.groupsConfig.get(nextGroup.el.id) as FocusableGroupConfig

    if (config?.firstElement) {
      nextElement = state.elements.get(config.firstElement) as FocusableElement
      if (nextElement) {
        if (isElementDisabled(nextElement.el)) {
          nextElement = findNextElementByDirection({
            fromElement: nextElement,
            direction,
            state
          }) as FocusableElement
          if (nextElement === null) return null
        }
      }
    }

    if (nextElement) return nextElement

    nextElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(nextGroup.elements.values()),
      currentFocusElement: fromElement,
      threshold: config?.threshold,
      isViewportSafe: config?.viewportSafe,
      allValidCandidates: true
    })

    return nextElement
  }
  return null
}
