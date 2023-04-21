import { ArrowNavigationState, Direction } from '..'
import { findNextGroup } from './utils'

export default function getNextGroupHandler (state: ArrowNavigationState) {
  return (direction: Direction) => findNextGroup({
    direction,
    state
  })?.el.id ?? null
}
