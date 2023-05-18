/* eslint-disable @typescript-eslint/no-empty-function */
import type { ArrowNavigationInstance, ArrowNavigationOptions, ArrowNavigationState, Direction, FocusableElement } from '@/types'
import {
  directionPressHandler,
  getArrowPressHandler,
  getNextElementHandler,
  getNextGroupHandler,
  globalFocusHandler,
  registerElementHandler,
  registerGroupHandler,
  resetGroupStateHandler,
  setFocusHandler,
  unregisterElementHandler
} from './handlers'
import changeFocusEventHandler from './handlers/changeFocusEventHandler'
import createEventEmitter from './utils/createEventEmitter'
import getCurrentElement from './utils/getCurrentElement'
import getInitialArrowNavigationState from './utils/getInitialArrowNavigationState'
import EVENTS from './config/events'

let arrowNavigation: ArrowNavigationInstance | null

export const ERROR_MESSAGES = {
  RE_INIT_ERROR: 'ArrowNavigation is already initialized with errorOnReinit option enabled',
  RE_INIT_WARNING: 'ArrowNavigation is already initialized, destroying previous instance',
  NOT_INITIALIZED: 'ArrowNavigation is not initialized'
}

export function initArrowNavigation ({
  errorOnReinit = false,
  debug = false,
  preventScroll = true,
  disableWebListeners = false,
  adapter,
  initialFocusElement,
  registerCooldown = 500
}: ArrowNavigationOptions = {}) {
  const state: ArrowNavigationState = getInitialArrowNavigationState({
    debug,
    adapter,
    initialFocusElement,
    registerCooldown
  })
  const emitter = createEventEmitter()

  const changeFocusElementHandler = (nextElement: FocusableElement, direction?: Direction) => {
    const prevElement = getCurrentElement(state) as FocusableElement
    state.currentElement = nextElement.id
    state.adapter.focusNode(nextElement, { preventScroll })
    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction,
      state,
      emit: emitter.emit
    })
  }

  emitter.on(EVENTS.ELEMENTS_REGISTER_END, () => {
    const currentElement = getCurrentElement(state)

    if ((!currentElement) && state.elements.size) {
      const initialElement = state.elements.get(state.initialFocusElement || '')
      if (initialElement) {
        changeFocusElementHandler(initialElement)
        return
      }
      const firstElement = state.elements.values().next().value
      if (firstElement) {
        changeFocusElementHandler(firstElement)
        return
      }
    }

    const focusedRef = state.adapter.getFocusedNode()
    const currentRef = currentElement && state.adapter.getNodeRef(currentElement)

    if (currentElement && focusedRef !== currentRef) {
      state.adapter.focusNode(currentElement, { preventScroll })
    }
  })

  if (arrowNavigation) {
    if (errorOnReinit) {
      throw new Error(ERROR_MESSAGES.RE_INIT_ERROR)
    }
    if (debug) {
      console.warn(ERROR_MESSAGES.RE_INIT_WARNING)
    }
    arrowNavigation.destroy()
  }

  const onKeyPress = getArrowPressHandler({
    state,
    onChangeCurrentElement: changeFocusElementHandler
  })

  const onGlobalFocus = (event: FocusEvent) => globalFocusHandler(state, event, preventScroll)

  if (!disableWebListeners) {
    window.addEventListener('keydown', onKeyPress)
    window.addEventListener('focus', onGlobalFocus, true)
  }

  arrowNavigation = {
    getFocusedElement: () => (
      state.elements.get(state.currentElement as string) || null
    ),
    setFocusElement: setFocusHandler({ state, onChangeCurrentElement: changeFocusElementHandler }),
    setInitialFocusElement: (id: string) => {
      state.initialFocusElement = id
    },
    registerGroup: registerGroupHandler({
      state,
      emit: emitter.emit
    }),
    registerElement: registerElementHandler({
      state,
      emit: emitter.emit
    }),
    unregisterElement: unregisterElementHandler({
      state,
      emit: emitter.emit
    }),
    resetGroupState: resetGroupStateHandler({
      state,
      emit: emitter.emit
    }),
    destroy () {
      if (!disableWebListeners) {
        window.removeEventListener('keydown', onKeyPress)
        window.removeEventListener('focus', onGlobalFocus, true)
      }
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
    handleDirectionPress: (direction: Direction, repeat?: boolean) => {
      directionPressHandler({
        state,
        direction,
        repeat: !!repeat,
        onChangeCurrentElement: changeFocusElementHandler
      })
    },
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
      Object.assign(state, newState)
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
