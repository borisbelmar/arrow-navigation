import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroup, FocusableGroupConfig } from '@/types.d'
import findClosestElementInGroup from './findClosestElementInGroup'
import findClosestGroup from './findClosestGroup'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement) => void
}

export default function focusNextGroupElement ({
  direction,
  state,
  onChangeCurrentElement
}: Props) {
  const currentFocusElement = state.currentElement as FocusableElement
  const groups = state.groups
  const currentGroupConfig = state.groupsConfig.get(currentFocusElement?.group)

  let nextGroup: FocusableGroup | null = null

  if (currentGroupConfig?.nextGroupByDirection) {
    const nextGroupId = currentGroupConfig.nextGroupByDirection[direction as Direction]

    if (nextGroupId === null) {
      return
    }

    if (nextGroupId) {
      nextGroup = groups.get(nextGroupId as string) as FocusableGroup
    }
  }

  if (!nextGroup) {
    nextGroup = findClosestGroup({
      direction,
      currentElement: currentFocusElement,
      candidateGroups: groups
    })
  }

  if (nextGroup) {
    const config = state.groupsConfig.get(nextGroup.el.id) as FocusableGroupConfig

    if (config?.firstElement) {
      const firstElement = state.elements.get(config.firstElement) as FocusableElement
      onChangeCurrentElement(firstElement)
      return
    }

    const closestElement = findClosestElementInGroup({
      direction,
      candidateElements: Array.from(nextGroup.elements.values()),
      currentFocusElement,
      threshold: config?.threshold,
      isViewportSafe: config?.viewportSafe,
      allValidCandidates: true
    })

    if (closestElement) {
      onChangeCurrentElement(closestElement)
    }
  }
}
