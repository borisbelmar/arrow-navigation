import getEuclideanDistance from './getEuclideanDistance'
import { isElementInDirection } from './isElementInDirection'

interface Result {
  minDistance: number
  closestElement: HTMLElement | null
}

export default function findClosestElement (
  candidateElements: HTMLElement[],
  currentElement: HTMLElement,
  direction: string,
  threshold = 200
): HTMLElement | null {
  const result = candidateElements.reduce<Result>(
    (acc, candidate) => {
      if (candidate === currentElement) return acc

      if (!isElementInDirection(direction, currentElement, candidate)) return acc

      const distance = getEuclideanDistance(direction, currentElement, candidate)

      if (distance < acc.minDistance && distance < threshold) {
        return { minDistance: distance, closestElement: candidate }
      }
      return acc
    },
    { minDistance: Infinity, closestElement: null }
  )

  return result.closestElement
}
