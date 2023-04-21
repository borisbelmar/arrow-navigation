import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types.d'
import findClosestGroup from './findClosestGroup'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
}

export default function findNextGroup ({
  direction,
  state
}: Props): FocusableGroup | null {
  const currentFocusElement = state.currentElement as FocusableElement
  const groups = state.groups
  const currentGroupConfig = state.groupsConfig.get(currentFocusElement?.group)

  if (currentGroupConfig?.nextGroupByDirection) {
    const nextGroupId = currentGroupConfig.nextGroupByDirection[direction as Direction]

    if (nextGroupId === null) {
      return null
    }

    if (nextGroupId) {
      return groups.get(nextGroupId as string) as FocusableGroup
    }
  }

  return findClosestGroup({
    direction,
    currentElement: currentFocusElement,
    candidateGroups: groups
  })
}
