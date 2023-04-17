import getEuclideanDistance from './utils/getEuclideanDistance'
import getReferencePointsByDirection from './utils/getReferencePointsByDirection'
import isElementInDirection from './utils/isElementInDirection'
import { FocusableElement } from './types.d'

interface Result {
  minDistance: number
  closestElement: FocusableElement | null
}

interface Props {
  currentFocusElement: FocusableElement
  candidateElements: FocusableElement[]
  direction: string
  threshold?: number
}

export default function findClosestElementInGroup ({
  candidateElements,
  currentFocusElement,
  direction,
  threshold = 200
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

      if (!isElementInDirection(direction, currentRect, candidateRect)) return acc

      const refPoints = getReferencePointsByDirection(
        direction,
        currentRect,
        candidateRect
      )

      const distance = getEuclideanDistance(refPoints.a, refPoints.b)

      if (distance < acc.minDistance && distance < threshold) {
        return { minDistance: distance, closestElement: candidate }
      }
      return acc
    },
    { minDistance: Infinity, closestElement: null }
  )

  return result.closestElement
}
