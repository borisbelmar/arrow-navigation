import {
  getArrowPressHandler,
  registerElementHandler,
  registerGroupHandler,
  setFocusHandler,
  unregisterElementHandler
} from './handlers'
import type { ArrowNavigationState } from '@/types.d'

export default function initArrowNavigation () {
  const state: ArrowNavigationState = {
    currentElement: null,
    groups: new Map(),
    elements: new Set(),
    groupsWithElements: new Map()
  }

  const onKeyPress = getArrowPressHandler(state)

  window.addEventListener('keydown', onKeyPress)

  return {
    getFocusedElement: () => state.currentElement,
    setFocusElement: setFocusHandler(state),
    registerGroup: registerGroupHandler(state),
    registerElement: registerElementHandler(state),
    unregisterElement: unregisterElementHandler(state),
    destroy () {
      window.removeEventListener('keydown', onKeyPress)
    }
  }
}
