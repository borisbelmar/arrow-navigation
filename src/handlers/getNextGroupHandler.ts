import { GetNextGroupOptions } from '@/types'
import { ArrowNavigationState, FocusableElement } from '..'
import { findNextGroup } from './utils'

export default function getNextGroupHandler (state: ArrowNavigationState) {
  return ({ direction, elementId }: GetNextGroupOptions) => findNextGroup({
    fromElement: state.elements.get(elementId || '') as FocusableElement,
    direction,
    state
  })?.group.el.id ?? null
}
