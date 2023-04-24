import type { ArrowNavigationState, FocusableElement, FocusableGroupConfig } from '@/types'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextGroup from './findNextGroup'

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
    const config = state.groupsConfig.get(nextGroup.el.id) as FocusableGroupConfig

    if (config?.firstElement) {
      const firstElement = state.elements.get(config.firstElement) as FocusableElement
      return firstElement
    }

    const closestElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(nextGroup.elements.values()),
      currentFocusElement: fromElement,
      threshold: config?.threshold,
      isViewportSafe: config?.viewportSafe,
      allValidCandidates: true
    })

    if (closestElement) {
      return closestElement
    }
  }
  return null
}
