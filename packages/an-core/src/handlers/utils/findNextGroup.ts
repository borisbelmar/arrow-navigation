import type { ArrowNavigationState, FocusableElement, FocusableGroup } from '@/types'
import getCurrentElement from '@/utils/getCurrentElement'
import findClosestGroup from './findClosestGroup'
import findNextGroupByDirection from './findNextGroupByDirection'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  fromElement?: FocusableElement
  fromGroup?: FocusableGroup
  groups?: Map<string, FocusableGroup>
}

interface GroupAndElement {
  group: FocusableGroup
  element: FocusableElement
}

export default function findNextGroup ({
  fromElement,
  fromGroup,
  direction,
  state,
  groups
}: Props): GroupAndElement | null {
  const selectedElement = fromElement || getCurrentElement(state) as FocusableElement
  const candidateGroups = groups || state.groups
  const currentGroupConfig = state.groupsConfig.get(fromGroup?.id || selectedElement?.group || '')

  let nextGroupAndElement: GroupAndElement | null | undefined

  if (currentGroupConfig?.nextGroupByDirection) {
    nextGroupAndElement = findNextGroupByDirection({
      direction,
      fromGroup,
      state,
      groups: candidateGroups
    })

    if (nextGroupAndElement === null) return null

    if (nextGroupAndElement) return nextGroupAndElement
  }

  return findClosestGroup({
    direction,
    currentElement: selectedElement,
    candidateGroups,
    state
  })
}
