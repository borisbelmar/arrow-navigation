import getCurrentElement from '@/utils/getCurrentElement'
import { ArrowNavigationState } from '@/types'

/**
 * Web Only handler
 */
const globalFocusHandler = (
  state: ArrowNavigationState,
  event: FocusEvent,
  preventScroll: boolean
) => {
  const target = event.target as HTMLElement
  const currentElement = getCurrentElement(state)
  if (!currentElement) return
  if (target && target.id !== currentElement.id) {
    const element = state.adapter.getNodeRef(currentElement) as HTMLElement
    element?.focus({ preventScroll })
  }
}

export default globalFocusHandler
