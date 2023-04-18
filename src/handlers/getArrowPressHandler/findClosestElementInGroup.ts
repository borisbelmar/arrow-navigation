import getEuclideanDistance from './utils/getEuclideanDistance'
import getReferencePointsByDirection from './utils/getReferencePointsByDirection'
import type { FocusableElement } from '@/types.d'
import isEligibleCandidate from './utils/isEligibleCandidate/isEligibleCandidate'

interface Result {
  minDistance: number
  closestElement: FocusableElement | null
}

interface Props {
  currentFocusElement: FocusableElement
  candidateElements: FocusableElement[]
  direction: string
  threshold?: number
  isViewportSafe?: boolean
}

export default function findClosestElementInGroup ({
  candidateElements,
  currentFocusElement,
  direction,
  threshold = 2,
  isViewportSafe = false
}: Props): FocusableElement | null {
  const result = candidateElements.reduce<Result>(
    (acc, candidate) => {
      if (
        candidate.el === currentFocusElement.el
        || !currentFocusElement.el
        || !candidate.el
      ) return acc

      const currentRect = currentFocusElement.el.getBoundingClientRect()
      const candidateRect = candidate.el.getBoundingClientRect()

      if (!isEligibleCandidate({
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
