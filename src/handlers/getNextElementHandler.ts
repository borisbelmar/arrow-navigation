import { FocusableElement, GetNextElementOptions } from '@/types'
import { ArrowNavigationState } from '..'
import { findNextElement } from './utils'

export default function getNextElementHandler (state: ArrowNavigationState) {
  return ({ direction, inGroup, elementId }: GetNextElementOptions) => findNextElement({
    fromElement: state.elements.get(elementId || '') as FocusableElement,
    direction,
    state,
    inGroup
  })?.el.id ?? null
}
