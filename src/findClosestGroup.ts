import getEuclideanDistance from './utils/getEuclideanDistance'
import getReferencePointsByCenter from './utils/getReferencePointsByCenter'
import isElementInDirection from './utils/isElementInDirection'
import { FocusableGroup, GroupMap } from './types.d'

interface Result {
  minDistance: number
  closestGroup: FocusableGroup | null
}

interface Props {
  currentGroup: FocusableGroup
  candidateGroups: GroupMap
  direction: string
}

export default function findClosestGroup ({
  candidateGroups,
  currentGroup,
  direction
}: Props): FocusableGroup | null {
  const groupIdsArray = Array.from(candidateGroups.keys())

  const result = groupIdsArray.reduce<Result>(
    (acc, candidateKey) => {
      const candidate = candidateGroups.get(candidateKey) as FocusableGroup
      if (
        candidate.el === currentGroup.el
        || !currentGroup.el
        || !candidate.el
      ) return acc

      const currentRect = currentGroup.el.getBoundingClientRect()
      const candidateRect = candidate.el.getBoundingClientRect()

      if (!isElementInDirection(direction, currentRect, candidateRect)) return acc

      const refPoints = getReferencePointsByCenter(
        currentRect,
        candidateRect
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
