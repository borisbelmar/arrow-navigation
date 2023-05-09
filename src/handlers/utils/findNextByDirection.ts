import type { ArrowNavigationState, Direction, FocusableElement, FocusableGroupConfig, FocusableWithKind } from '@/types'
import findNextGroupElement from './findNextGroupElement'
import findNextGroupByDirection from './findNextGroupByDirection'
import isElementDisabled from './isElementDisabled'
import getFocusableWithKind from './isFocusableWithKind'
import getNextByOrder from './getNextByOrder'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  fromElement: FocusableElement
}

export default function findNextByDirection ({
  fromElement,
  direction,
  state
}: Props): FocusableElement | null | undefined {
  const selectedElement = fromElement
  const candidateGroups = state.groups
  const fromGroupElementsSize = state.groups.get(selectedElement.group)?.elements.size || 0
  const fromGroupConfig = state.groupsConfig.get(selectedElement.group) as FocusableGroupConfig

  let finalNextByDirection = selectedElement.nextByDirection

  if (fromGroupConfig?.byOrder || selectedElement.order !== undefined) {
    finalNextByDirection = getNextByOrder(fromGroupConfig.byOrder, {
      group: selectedElement.group,
      order: selectedElement.order || 0,
      groupSize: fromGroupElementsSize,
      groupCols: fromGroupConfig.cols,
      nextGroupByDirection: fromGroupConfig.nextGroupByDirection
    })
  }

  const nextByDirection = finalNextByDirection?.[direction as Direction]
  if (nextByDirection === null) return null
  if (nextByDirection === undefined) return undefined

  const focusableWithKind: FocusableWithKind = getFocusableWithKind(nextByDirection)

  if (focusableWithKind.id === null) return null
  if (focusableWithKind.id === undefined) return undefined

  if (focusableWithKind.kind === 'element') {
    const nextElement = state.elements.get(focusableWithKind.id as string)
    if (nextElement) {
      if (!isElementDisabled(nextElement.el)) return nextElement
      return findNextByDirection({
        fromElement: nextElement,
        direction,
        state
      })
    }
  }
  if (focusableWithKind.kind === 'group') {
    const nextGroup = candidateGroups.get(focusableWithKind.id as string)
    if (nextGroup) {
      const element = findNextGroupElement({
        direction,
        nextGroup,
        state,
        fromElement: selectedElement
      })
      if (element) return element

      return findNextGroupByDirection({
        fromElement: selectedElement,
        direction,
        fromGroup: nextGroup,
        state,
        groups: candidateGroups
      })?.element
    }
  }

  return undefined
}
