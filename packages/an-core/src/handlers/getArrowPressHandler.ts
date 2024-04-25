/* eslint-disable no-param-reassign */
import type { ArrowNavigationState, Direction, FocusableElement } from '@/types'
import directionPressHandler from './directionPressHandler'

const keyToDirection: { [x: string]: Direction } = {
  ArrowLeft: 'left',
  ArrowRight: 'right',
  ArrowUp: 'up',
  ArrowDown: 'down'
}

interface GetArrowPressHandlerProps {
  state: ArrowNavigationState
  onChangeCurrentElement: (element: FocusableElement, dir: Direction) => void
}

export default function getArrowPressHandler ({
  state,
  onChangeCurrentElement
}: GetArrowPressHandlerProps) {
  return (event: KeyboardEvent) => {
    const { key } = event
    const direction = keyToDirection[key]

    if (!direction) return

    directionPressHandler({
      state,
      direction,
      onChangeCurrentElement,
      repeat: event.repeat
    })
  }
}
