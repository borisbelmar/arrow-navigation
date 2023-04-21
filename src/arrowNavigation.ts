/* eslint-disable @typescript-eslint/no-empty-function */
import type { ArrowNavigationInstance, ArrowNavigationOptions, ArrowNavigationState, FocusableElement } from '@/types.d'
import {
  getArrowPressHandler,
  getNextElementHandler,
  getNextGroupHandler,
  registerElementHandler,
  registerGroupHandler,
  setFocusHandler,
  unregisterElementHandler
} from './handlers'
import changeFocusEventHandler from './handlers/changeFocusEventHandler'
import createEventEmitter from './utils/createEventEmitter'

let arrowNavigation: ArrowNavigationInstance | null

export const ERROR_MESSAGES = {
  RE_INIT_ERROR: 'ArrowNavigation is already initialized with errorOnReinit option enabled',
  RE_INIT_WARNING: 'ArrowNavigation is already initialized, destroying previous instance',
  NOT_INITIALIZED: 'ArrowNavigation is not initialized'
}

export function initArrowNavigation ({
  errorOnReinit = false,
  debug = false
}: ArrowNavigationOptions = {}) {
  const state: ArrowNavigationState = {
    currentElement: null,
    groups: new Map(),
    groupsConfig: new Map(),
    elements: new Map(),
    debug
  }
  const emitter = createEventEmitter()

  const changeFocusElementHandler = (nextElement: FocusableElement) => {
    changeFocusEventHandler(nextElement, state, emitter.emit)
    state.currentElement = nextElement
    nextElement.el.focus()
  }

  if (arrowNavigation) {
    if (errorOnReinit) {
      throw new Error(ERROR_MESSAGES.RE_INIT_ERROR)
    }
    if (debug) {
      console.warn(ERROR_MESSAGES.RE_INIT_WARNING)
    }
    arrowNavigation.destroy()
  }

  const onKeyPress = getArrowPressHandler(state, changeFocusElementHandler)

  window.addEventListener('keydown', onKeyPress)

  arrowNavigation = {
    getFocusedElement: () => state.currentElement,
    setFocusElement: setFocusHandler(state, changeFocusElementHandler),
    registerGroup: registerGroupHandler(state, emitter.emit),
    registerElement: registerElementHandler(state, emitter.emit),
    unregisterElement: unregisterElementHandler(state, changeFocusElementHandler, emitter.emit),
    destroy () {
      window.removeEventListener('keydown', onKeyPress)
      arrowNavigation = null
    },
    getCurrentGroups () {
      return new Set(state.groups.keys())
    },
    getGroupElements (group: string) {
      return new Set(state.groups.get(group)?.elements.keys() || [])
    },
    getGroupConfig (group: string) {
      return state.groupsConfig.get(group)
    },
    getRegisteredElements () {
      return new Set(state.elements.keys())
    },
    getFocusedGroup () {
      return state.currentElement?.group
    },
    getNextElement: getNextElementHandler(state),
    getNextGroup: getNextGroupHandler(state),
    _forceNavigate (key) {
      if (!state.debug) return
      onKeyPress({
        key,
        preventDefault: () => {}
      } as KeyboardEvent)
    },
    _getState () {
      return state.debug ? state : null
    },
    _setState (newState: ArrowNavigationState) {
      if (!state.debug) return
      state.currentElement = newState.currentElement
      state.groups = newState.groups
      state.groupsConfig = newState.groupsConfig
      state.elements = newState.elements
    },
    on: emitter.on,
    off: emitter.off
  }

  return arrowNavigation
}

export function getArrowNavigation () {
  if (!arrowNavigation) {
    throw new Error(ERROR_MESSAGES.NOT_INITIALIZED)
  }

  return arrowNavigation
}
