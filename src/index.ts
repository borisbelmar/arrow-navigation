import getArrowPressHandler from './getArrowPressHandler'
import registerElementHandler from './registerElementHandler'
import registerGroupHandler from './registerGroupHandler'
import setFocusHandler from './setFocusHandler'
import type { ArrowNavigationState } from './types.d'
import unregisterElementHandler from './unregisterElementHandler'

export default function initArrowNavigation () {
  const state: ArrowNavigationState = {
    currentElement: null,
    groups: new Map(),
    elements: new Set()
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
