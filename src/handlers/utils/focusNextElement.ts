import type { ArrowNavigationState, Direction, FocusableElement } from '@/types'
import findNextElement from './findNextElement'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement, dir: Direction) => void
}

export default function focusNextElement ({
  direction,
  state,
  onChangeCurrentElement
}: Props) {
  const nextElement = findNextElement({ direction, state })

  if (nextElement) {
    onChangeCurrentElement(nextElement, direction as Direction)
  }
}
