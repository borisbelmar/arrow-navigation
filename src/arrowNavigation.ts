/* eslint-disable @typescript-eslint/no-empty-function */
import type { ArrowNavigationInstance, ArrowNavigationOptions, ArrowNavigationState, Direction, FocusableElement } from '@/types'
import {
  getArrowPressHandler,
  getNextElementHandler,
  getNextGroupHandler,
  globalFocusHandler,
  registerElementHandler,
  registerGroupHandler,
  setFocusHandler,
  unregisterElementHandler
} from './handlers'
import changeFocusEventHandler from './handlers/changeFocusEventHandler'
import createEventEmitter from './utils/createEventEmitter'
import getCurrentElement from './utils/getCurrentElement'

let arrowNavigation: ArrowNavigationInstance | null

export const ERROR_MESSAGES = {
  RE_INIT_ERROR: 'ArrowNavigation is already initialized with errorOnReinit option enabled',
  RE_INIT_WARNING: 'ArrowNavigation is already initialized, destroying previous instance',
  NOT_INITIALIZED: 'ArrowNavigation is not initialized'
}

export function initArrowNavigation ({
  errorOnReinit = false,
  debug = false,
  preventScroll = true
}: ArrowNavigationOptions = {}) {
  const state: ArrowNavigationState = {
    currentElement: null,
    groups: new Map(),
    groupsConfig: new Map(),
    elements: new Map(),
    debug
  }
  const emitter = createEventEmitter()

  const changeFocusElementHandler = (nextElement: FocusableElement, direction?: Direction) => {
    const prevElement = getCurrentElement(state) as FocusableElement
    state.currentElement = nextElement.id
    nextElement.el.focus({ preventScroll })
    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction,
      state,
      emit: emitter.emit
    })
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

  const onGlobalFocus = (event: FocusEvent) => globalFocusHandler(state, event, preventScroll)

  window.addEventListener('keydown', onKeyPress)
  window.addEventListener('focus', onGlobalFocus, true)

  arrowNavigation = {
    getFocusedElement: () => state.elements.get(state.currentElement as string) || null,
    setFocusElement: setFocusHandler(state, changeFocusElementHandler),
    registerGroup: registerGroupHandler(state, emitter.emit),
    registerElement: registerElementHandler(state, changeFocusElementHandler, emitter.emit),
    unregisterElement: unregisterElementHandler(state, changeFocusElementHandler, emitter.emit),
    destroy () {
      window.removeEventListener('keydown', onKeyPress)
      window.removeEventListener('focus', onGlobalFocus, true)
      arrowNavigation = null
    },
    getCurrentGroups () {
      return new Set(state.groups.keys())
    },
    getGroupElements (group: string) {
      return new Set(state.groups.get(group)?.elements.keys())
    },
    getGroupConfig (group: string) {
      return state.groupsConfig.get(group)
    },
    getRegisteredElements () {
      return new Set(state.elements.keys())
    },
    getFocusedGroup () {
      return getCurrentElement(state)?.group
    },
    getNextElement: getNextElementHandler(state),
    getNextGroup: getNextGroupHandler(state),
    _forceNavigate (key) {
      if (!state.debug) return
      onKeyPress({
        key
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
