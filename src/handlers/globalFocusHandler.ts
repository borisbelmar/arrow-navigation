import getCurrentElement from '@/utils/getCurrentElement'
import { ArrowNavigationState } from '@/types'

const globalFocusHandler = (
  state: ArrowNavigationState,
  event: FocusEvent,
  preventScroll: boolean
) => {
  const target = event.target as HTMLElement
  const currentElement = getCurrentElement(state)
  if (!currentElement) return
  if (target && target.id !== currentElement.id) {
    currentElement.el.focus({ preventScroll })
  }
}

export default globalFocusHandler
