import type { ArrowNavigationState, Direction, FocusableElement, FocusableWithKind } from '@/types'
import findNextGroupElement from './findNextGroupElement'
import findNextGroupByDirection from './findNextGroupByDirection'
import isElementDisabled from './isElementDisabled'
import getFocusableWithKind from './isFocusableWithKind'

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

  const nextByDirection = selectedElement.nextByDirection?.[direction as Direction]
  if (nextByDirection === null) return null
  if (nextByDirection === undefined) return undefined

  const focusableWithKind: FocusableWithKind = getFocusableWithKind(nextByDirection)

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
