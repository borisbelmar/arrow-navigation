import type { FocusableElement } from '@/types'
import getEuclideanDistance from './getEuclideanDistance'
import getReferencePointsByDirection from './getReferencePointsByDirection'
import isElementDisabled from './isElementDisabled'
import isEligibleCandidate from './isEligibleCandidate/isEligibleCandidate'

interface Result {
  minDistance: number
  closestElement: FocusableElement | null
}

interface Props {
  currentFocusElement: FocusableElement
  candidateElements: FocusableElement[]
  direction: string | undefined
  threshold?: number
  isViewportSafe?: boolean
  allValidCandidates?: boolean
}

export default function findClosestElementInGroup ({
  candidateElements,
  currentFocusElement,
  direction,
  threshold = 0,
  isViewportSafe = false,
  allValidCandidates
}: Props): FocusableElement | null {
  const result = candidateElements.reduce<Result>(
    (acc, candidate) => {
      if (
        candidate.el === currentFocusElement?.el
        || !currentFocusElement?.el
        || !candidate.el
      ) return acc

      const currentRect = currentFocusElement.el.getBoundingClientRect()
      const candidateRect = candidate.el.getBoundingClientRect()

      if (isElementDisabled(candidate.el)) return acc

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
