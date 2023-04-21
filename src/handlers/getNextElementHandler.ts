import { ArrowNavigationState, Direction } from '..'
import { findNextElement } from './utils'

export default function getNextElementHandler (state: ArrowNavigationState) {
  return (direction: Direction, inGroup?: boolean) => findNextElement({
    direction,
    state,
    inGroup
  })?.el.id ?? null
}
