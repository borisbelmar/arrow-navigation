import type { ArrowNavigationState, FocusableElement } from '@/types'
import getEuclideanDistance from './getEuclideanDistance'
import getReferencePointsByDirection from './getReferencePointsByDirection'
import isEligibleCandidate from './isEligibleCandidate/isEligibleCandidate'

interface Result {
  minDistance: number
  closestElement: FocusableElement | null
}

interface Props {
  currentFocusElement: FocusableElement
  candidateElements: Set<string>
  direction: string | undefined
  threshold?: number
  isViewportSafe?: boolean
  allValidCandidates?: boolean
  state: ArrowNavigationState
}

export default function findClosestElementInGroup ({
  candidateElements,
  currentFocusElement,
  state,
  direction,
  threshold = 0,
  isViewportSafe = false,
  allValidCandidates
}: Props): FocusableElement | null {
  const result = Array.from(candidateElements?.values() || []).reduce<Result>(
    (acc, id) => {
      const candidate = state.elements.get(id) as FocusableElement
      if (
        candidate.id === currentFocusElement?.id
        || !currentFocusElement
        || !candidate
      ) return acc

      const currentRect = state.adapter.getNodeRect(currentFocusElement)
      const candidateRect = state.adapter.getNodeRect(candidate)

      if (state.adapter.isNodeDisabled(candidate)) return acc

      if (!allValidCandidates && !isEligibleCandidate({
        direction,
        currentRect,
        candidateRect,
        isViewportSafe,
        threshold
      })) return acc

      const refPoints = getReferencePointsByDirection(
        direction,
        currentRect,
        candidateRect
      )

      const distance = getEuclideanDistance(refPoints.a, refPoints.b)

      if (distance < acc.minDistance) {
        return { minDistance: distance, closestElement: candidate }
      }
      return acc
    },
    { minDistance: Infinity, closestElement: null }
  )

  return result.closestElement
}
