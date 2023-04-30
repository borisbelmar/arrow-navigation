import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types'
import findClosestGroup from './findClosestGroup'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  fromElement?: FocusableElement
  fromGroup?: FocusableGroup
}

export default function findNextGroup ({
  fromElement,
  fromGroup,
  direction,
  state
}: Props): FocusableGroup | null {
  const selectedElement = fromElement || state.currentElement as FocusableElement
  const groups = state.groups
  const currentGroupConfig = state.groupsConfig.get(selectedElement?.group || fromGroup?.el.id || '')

  if (currentGroupConfig?.nextGroupByDirection) {
    const nextGroupId = currentGroupConfig.nextGroupByDirection[direction as Direction]

    if (nextGroupId === null) return null

    if (nextGroupId) {
      return groups.get(nextGroupId as string) as FocusableGroup
    }
  }

  return findClosestGroup({
    direction,
    currentElement: selectedElement,
    candidateGroups: groups
  })
}
