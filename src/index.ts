import {
  getArrowPressHandler,
  registerElementHandler,
  registerGroupHandler,
  setFocusHandler,
  unregisterElementHandler
} from './handlers'
import type { ArrowNavigationInstance, ArrowNavigationOptions, ArrowNavigationState, FocusableElement } from '@/types.d'

let arrowNavigation: ArrowNavigationInstance | null

export function initArrowNavigation ({
  errorOnReinit = false,
  debug = false
}: ArrowNavigationOptions = {}) {
  const state: ArrowNavigationState = {
    currentElement: null,
    groups: new Map(),
    groupsConfig: new Map(),
    elements: new Map()
  }

  const changeFocusElementHandler = (element: FocusableElement) => {
    state.currentElement = element
    element.el.focus()
  }

  if (arrowNavigation) {
    if (errorOnReinit) {
      throw new Error('ArrowNavigation is already initialized with errorOnReinit option enabled')
    }
    if (debug) {
      console.warn('ArrowNavigation is already initialized, destroying previous instance')
    }
    arrowNavigation.destroy()
  }

  const onKeyPress = getArrowPressHandler(state, changeFocusElementHandler)

  window.addEventListener('keydown', onKeyPress)

  arrowNavigation = {
    getFocusedElement: () => state.currentElement,
    setFocusElement: setFocusHandler(state),
    registerGroup: registerGroupHandler(state),
    registerElement: registerElementHandler(state),
    unregisterElement: unregisterElementHandler(state),
    destroy () {
      window.removeEventListener('keydown', onKeyPress)
      arrowNavigation = null
    }
  }
}

export function getArrowNavigation () {
  if (!arrowNavigation) {
    throw new Error('ArrowNavigation is not initialized')
  }

  return arrowNavigation
}
