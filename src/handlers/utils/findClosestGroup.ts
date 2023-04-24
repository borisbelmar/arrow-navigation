import type { FocusableElement, FocusableGroup } from '@/types'
import getEuclideanDistance from './getEuclideanDistance'
import getReferencePointsByCenter from './getReferencePointsByCenter'
import isEligibleCandidate from './isEligibleCandidate/isEligibleCandidate'

interface Result {
  minDistance: number
  closestGroup: FocusableGroup | null
}

interface Props {
  currentElement: FocusableElement
  candidateGroups: Map<string, FocusableGroup>
  direction: string | undefined,
  threshold?: number
  isViewportSafe?: boolean
  allValidCandidates?: boolean
}

export default function findClosestGroup ({
  isViewportSafe = false,
  threshold = 2,
  candidateGroups,
  currentElement,
  direction,
  allValidCandidates
}: Props): FocusableGroup | null {
  const groupIdsArray = Array.from(candidateGroups.keys())

  const result = groupIdsArray.reduce<Result>(
    (acc, candidateKey) => {
      const currentGroup = candidateGroups.get(currentElement?.group) as FocusableGroup
      const candidate = candidateGroups.get(candidateKey) as FocusableGroup
      if (
        candidate.el === currentGroup?.el
        || !currentElement?.el
        || !currentGroup
        || !candidate.el
      ) return acc

      const currentElementRect = currentElement.el.getBoundingClientRect()
      const currentGroupRect = currentGroup.el.getBoundingClientRect()
      const candidateGroupRect = candidate.el.getBoundingClientRect()

      if (!allValidCandidates && !isEligibleCandidate({
        direction,
        currentRect: currentGroupRect,
        candidateRect: candidateGroupRect,
        isViewportSafe,
        threshold
      })) return acc

      const refPoints = getReferencePointsByCenter(
        currentElementRect,
        candidateGroupRect
      )

      const distance = getEuclideanDistance(refPoints.a, refPoints.b)

      if (distance < acc.minDistance) {
        return { minDistance: distance, closestGroup: candidate }
      }
      return acc
    },
    { minDistance: Infinity, closestGroup: null }
  )

  return result.closestGroup
}
