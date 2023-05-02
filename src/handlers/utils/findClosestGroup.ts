import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types'
import getEuclideanDistance from './getEuclideanDistance'
import getReferencePointsByCenter from './getReferencePointsByCenter'
import isEligibleCandidate from './isEligibleCandidate/isEligibleCandidate'
import findNextGroupElement from './findNextGroupElement'

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
  state: ArrowNavigationState
}

interface GroupAndElement {
  group: FocusableGroup
  element: FocusableElement
}

export default function findClosestGroup ({
  isViewportSafe = false,
  threshold = 2,
  candidateGroups,
  currentElement,
  direction,
  allValidCandidates,
  state
}: Props): GroupAndElement | null {
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

  if (result.closestGroup !== null) {
    const element = findNextGroupElement({
      direction,
      nextGroup: result.closestGroup,
      fromElement: currentElement,
      state
    })

    if (!element) {
      const filteredGroups = new Map(candidateGroups)
      filteredGroups.delete(result.closestGroup.el.id)
      return findClosestGroup({
        direction,
        currentElement,
        candidateGroups: filteredGroups,
        state
      })
    }
    return {
      group: result.closestGroup,
      element
    }
  }

  return result.closestGroup
}
