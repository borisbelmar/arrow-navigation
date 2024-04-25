import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types'
import findClosestElementInGroup from './findClosestElementInGroup'
import findNextByDirection from './findNextByDirection'

interface Props {
  fromElement: FocusableElement
  direction: string | undefined
  state: ArrowNavigationState
  nextGroup: FocusableGroup | null
}

export default function findNextGroupElement ({
  fromElement,
  nextGroup,
  direction,
  state
}: Props): FocusableElement | null {
  if (!nextGroup) return null
  let nextElement: FocusableElement | null = null
  const config = state.groupsConfig.get(nextGroup.id)

  if (config) {
    const lastElement = config.saveLast && config.lastElement
    const lastElementNode = lastElement && state.elements.get(lastElement)

    const firstElement = (lastElementNode && lastElement) || config.firstElement

    if (firstElement) {
      nextElement = state.elements.get(firstElement) as FocusableElement
      if (nextElement) {
        if (state.adapter.isNodeDisabled(nextElement)) {
          nextElement = findNextByDirection({
            fromElement: nextElement,
            direction,
            state
          }) as FocusableElement
          if (nextElement === null) return null
        }
      }
    }
  }

  if (nextElement) return nextElement

  nextElement = findClosestElementInGroup({
    direction,
    candidateElements: nextGroup.elements,
    currentFocusElement: fromElement,
    state,
    threshold: config?.threshold,
    isViewportSafe: config?.viewportSafe,
    allValidCandidates: true
  })

  return nextElement
}
