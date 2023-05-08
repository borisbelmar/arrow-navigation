import type { ArrowNavigationState, Direction, FocusableElement } from '@/types'
import isElementDisabled from './isElementDisabled'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  fromElement: FocusableElement
}

/**
 * @deprecated
 * Use findNextByDirection instead
 */
export default function findNextElementByDirection ({
  fromElement,
  direction,
  state
}: Props): FocusableElement | null | undefined {
  let nextElement: FocusableElement | null | undefined = null
  const nextElementId = fromElement.nextElementByDirection?.[direction as Direction]

  if (nextElementId === null) return null

  nextElement = state.elements.get(nextElementId as string)

  if (nextElement && isElementDisabled(nextElement.el)) {
    return findNextElementByDirection({
      fromElement: nextElement,
      direction,
      state
    })
  }

  return nextElement
}
