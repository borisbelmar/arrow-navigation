import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup } from '@/types'
import findNextGroupElement from './findNextGroupElement'

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

export default function findNextGroupByDirection ({
  fromElement,
  fromGroup,
  direction,
  state,
  groups
}: Props): GroupAndElement | null | undefined {
  const selectedElement = fromElement || state.currentElement as FocusableElement
  const candidateGroups = groups || state.groups
  const currentGroupConfig = state.groupsConfig.get(
    fromGroup?.el.id
    || selectedElement?.group
    || ''
  )

  const nextGroupId = currentGroupConfig?.nextGroupByDirection?.[direction as Direction]

  if (nextGroupId === null) return null

  if (nextGroupId === undefined) return undefined

  const nextGroup = candidateGroups.get(nextGroupId as string)

  if (nextGroup) {
    const element = findNextGroupElement({
      direction,
      nextGroup,
      state,
      fromElement: selectedElement
    })
    if (element) return ({ group: nextGroup, element })

    return findNextGroupByDirection({
      direction,
      fromGroup: nextGroup,
      state,
      groups: candidateGroups
    })
  }

  return undefined
}
