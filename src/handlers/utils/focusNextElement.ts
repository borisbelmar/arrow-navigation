import type { ArrowNavigationState, FocusableElement } from '@/types.d'
import findNextElement from './findNextElement'

interface Props {
  direction: string | undefined
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement) => void
}

export default function focusNextElement ({
  direction,
  state,
  onChangeCurrentElement
}: Props) {
  const nextElement = findNextElement({ direction, state })

  if (nextElement) {
    onChangeCurrentElement(nextElement)
  }
}
