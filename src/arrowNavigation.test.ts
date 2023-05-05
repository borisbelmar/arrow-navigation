/* eslint-disable no-underscore-dangle */
import { initArrowNavigation, getArrowNavigation, ERROR_MESSAGES } from './arrowNavigation'
import EVENTS from './config/events'
import type { Direction, FocusableElement } from './types'
import getViewNavigationStateMock from './__mocks__/viewNavigationState.mock'

describe('arrowNavigation', () => {
  beforeEach(() => {
    initArrowNavigation()
    global.window.innerHeight = 1000
    global.window.innerWidth = 1000
  })

  afterEach(() => {
    try {
      getArrowNavigation()?.destroy()
    } catch {
      // ignore
    }
  })

  it('should return the arrow navigation instance', () => {
    const arrowNavigation = getArrowNavigation()

    expect(arrowNavigation).toBeDefined()
  })

  it('should throw an error if the arrow navigation is not initialized', () => {
    const arrowNavigation = getArrowNavigation()
    arrowNavigation.destroy()

    expect(() => getArrowNavigation()).toThrowError(ERROR_MESSAGES.NOT_INITIALIZED)
  })

  it('should throw an eror if arrow navigation is reinitialized with errorOnReinit option enabled', () => {
    expect(() => initArrowNavigation({ errorOnReinit: true }))
      .toThrowError(ERROR_MESSAGES.RE_INIT_ERROR)
  })

  it('should warn if arrow navigation is reinitialized without errorOnReinit and debug enabled', () => {
    global.console.warn = jest.fn()
    initArrowNavigation({ debug: true })

    expect(console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.RE_INIT_WARNING)
  })

  it('should destroy the arrow navigation instance', () => {
    const arrowNavigation = getArrowNavigation()
    arrowNavigation.destroy()

    expect(() => getArrowNavigation()).toThrowError(ERROR_MESSAGES.NOT_INITIALIZED)
  })

  it('should register elements and navigate between', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    navigationApi._forceNavigate('ArrowDown')

    expect(state.groups.get('group-0')?.elements.get('element-0-1')?.el.focus).toHaveBeenCalled()

    navigationApi._forceNavigate('ArrowDown')

    expect(state.groups.get('group-0')?.elements.get('element-0-2')?.el.focus).toHaveBeenCalled()
  })

  it('should not forceNavigate if debug is disabled', () => {
    initArrowNavigation()
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    navigationApi._forceNavigate('ArrowDown')

    expect(state.groups.get('group-0')?.elements.get('element-0-1')?.el.focus).not.toHaveBeenCalled()
  })

  it('should return the focused element', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    navigationApi._forceNavigate('ArrowDown')

    expect(navigationApi.getFocusedElement()).toBe(state.elements.get('element-0-1'))
  })

  it('should return the state in debug mode', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    expect(navigationApi._getState()).toEqual({ ...state, debug: true })
  })

  it('should return the state in non debug mode', () => {
    initArrowNavigation()
    const navigationApi = getArrowNavigation()

    expect(navigationApi._getState()).toBeNull()
  })

  it('should return all the elements as a set', () => {
    initArrowNavigation({ debug: true })
    const state = getViewNavigationStateMock()
    const navigationApi = getArrowNavigation()
    navigationApi._setState(state)

    expect(navigationApi.getRegisteredElements()).toEqual(new Set(state.elements.keys()))
  })

  it('should return all the elements in a group as set', () => {
    initArrowNavigation({ debug: true })
    const state = getViewNavigationStateMock()
    const navigationApi = getArrowNavigation()
    navigationApi._setState(state)

    expect(navigationApi.getGroupElements('group-0')).toEqual(new Set(state.groups.get('group-0')?.elements.keys() || []))
  })

  it('should return all the groups as a set', () => {
    initArrowNavigation({ debug: true })
    const state = getViewNavigationStateMock()
    const navigationApi = getArrowNavigation()
    navigationApi._setState(state)

    expect(navigationApi.getCurrentGroups()).toEqual(new Set(state.groups.keys()))
  })

  it('should return the focused group', () => {
    initArrowNavigation({ debug: true })
    const state = getViewNavigationStateMock()
    const navigationApi = getArrowNavigation()
    navigationApi._setState(state)

    expect(navigationApi.getFocusedGroup()).toBe('group-0')
  })

  it('should return the group config', () => {
    initArrowNavigation({ debug: true })
    const state = getViewNavigationStateMock()
    const navigationApi = getArrowNavigation()
    navigationApi._setState(state)

    expect(navigationApi.getGroupConfig('group-0')).toEqual(state.groupsConfig.get('group-0'))
  })

  it('should not set a new state if debug is false', () => {
    initArrowNavigation()
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()

    navigationApi._setState(state)
    expect(navigationApi.getFocusedElement()).toBeNull()
  })

  it('should return an empty set if the group does not exist', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()

    expect(navigationApi.getGroupElements('group-0')).toEqual(new Set())
  })

  it('should return undefined group if currentElement is not set', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()

    expect(navigationApi.getFocusedGroup()).toBeUndefined()
  })

  it('should register and unregister an event listener', () => {
    initArrowNavigation({ debug: true })

    const navigationApi = getArrowNavigation()

    navigationApi._setState(getViewNavigationStateMock())

    const listener = jest.fn()

    navigationApi.on(EVENTS.CURRENT_ELEMENT_CHANGE, listener)

    navigationApi._forceNavigate('ArrowDown')

    expect(listener).toHaveBeenCalled()

    navigationApi.off(EVENTS.CURRENT_ELEMENT_CHANGE, listener)

    navigationApi._forceNavigate('ArrowDown')

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('check correct time on current reassigned and event consumption', () => {
    initArrowNavigation({ debug: true })

    const navigationApi = getArrowNavigation()

    navigationApi._setState(getViewNavigationStateMock())

    navigationApi.setFocusElement('element-0-2', 'group-0')

    const listener = jest.fn()

    navigationApi.on(EVENTS.CURRENT_ELEMENT_CHANGE, (
      _el: FocusableElement,
      direction: Direction
    ) => {
      if (!navigationApi.getNextElement({ direction: direction as Direction, inGroup: true })) {
        listener('last')
      }
    })

    navigationApi._forceNavigate('ArrowDown')

    expect(listener).toHaveBeenCalledWith('last')
    expect(navigationApi.getFocusedElement()?.el.id).toBe('element-0-3')
  })
})
