/* eslint-disable no-underscore-dangle */
import { initArrowNavigation, getArrowNavigation, ERROR_MESSAGES } from './arrowNavigation'
import EVENTS from './config/events'
import type { Direction, FocusableElement, FocusEventResult } from './types'
import getViewNavigationStateMock from './__mocks__/viewNavigationState.mock'
import { TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED } from './handlers/registerElementHandler'

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

    expect(state.elements.get('element-0-1')?.el.focus).toHaveBeenCalled()

    navigationApi._forceNavigate('ArrowDown')

    expect(state.elements.get('element-0-2')?.el.focus).toHaveBeenCalled()
  })

  it('should not forceNavigate if debug is disabled', () => {
    initArrowNavigation()
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    navigationApi._forceNavigate('ArrowDown')

    expect(state.elements.get('element-0-1')?.el.focus).not.toHaveBeenCalled()
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
    initArrowNavigation({ debug: true, disableWebListeners: false })

    const navigationApi = getArrowNavigation()

    navigationApi._setState(getViewNavigationStateMock())

    navigationApi.setFocusElement('element-0-2')

    const listener = jest.fn()

    navigationApi.on(EVENTS.CURRENT_ELEMENT_CHANGE, ({
      current: _,
      direction
    }: FocusEventResult<FocusableElement>) => {
      const nextElement = navigationApi.getNextElement({
        direction: direction as Direction,
        inGroup: true
      })
      if (!nextElement) {
        listener('last')
      }
    })

    navigationApi._forceNavigate('ArrowDown')

    expect(listener).toHaveBeenCalledWith('last')
    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-3')
  })

  it('should focus the next element if direction press handler is executed', () => {
    initArrowNavigation({ debug: true })

    const navigationApi = getArrowNavigation()

    navigationApi._setState(getViewNavigationStateMock())

    navigationApi.setFocusElement('element-0-2')

    navigationApi.handleDirectionPress('down', false)

    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-3')
  })

  it('should not set the eventListeners if disableWebListeners is true', () => {
    window.addEventListener = jest.fn()
    initArrowNavigation({ disableWebListeners: true })

    expect(window.addEventListener).not.toHaveBeenCalled()
  })

  it('should set the eventListeners if disableWebListeners is false', () => {
    window.addEventListener = jest.fn()
    initArrowNavigation({ disableWebListeners: false })

    expect(window.addEventListener).toHaveBeenCalled()
  })

  it('should focus the initialFocusElement if it is set', () => {
    jest.useFakeTimers()
    initArrowNavigation({ initialFocusElement: 'element-0-2' })

    const navigationApi = getArrowNavigation()

    const groupContainer = document.createElement('div')
    groupContainer.id = 'group-0'
    document.body.appendChild(groupContainer)
    navigationApi.registerGroup(groupContainer)

    const element = document.createElement('button')
    element.id = 'element-0-1'
    groupContainer.appendChild(element)
    navigationApi.registerElement(element, 'group-0')

    const element2 = document.createElement('button')
    element2.id = 'element-0-2'
    groupContainer.appendChild(element2)
    navigationApi.registerElement(element2, 'group-0')

    expect(navigationApi.getFocusedElement()?.id).toBe(undefined)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)

    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-2')

    navigationApi.unregisterElement('element-0-2')
    navigationApi.unregisterElement('element-0-1')

    navigationApi.setInitialFocusElement('element-0-1')

    navigationApi.registerElement(element, 'group-0')
    navigationApi.registerElement(element2, 'group-0')

    expect(navigationApi.getFocusedElement()?.id).toBe(undefined)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)

    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-1')

    navigationApi.unregisterElement('element-0-2')
    navigationApi.unregisterElement('element-0-1')

    navigationApi.setInitialFocusElement('non-existing-element')

    navigationApi.registerElement(element, 'group-0')
    navigationApi.registerElement(element2, 'group-0')

    expect(navigationApi.getFocusedElement()?.id).toBe(undefined)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)

    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-1')

    navigationApi.unregisterElement('element-0-2')
    navigationApi.unregisterElement('element-0-1')

    navigationApi.setInitialFocusElement(null as unknown as string)

    navigationApi.registerElement(element, 'group-0')

    expect(navigationApi.getFocusedElement()?.id).toBe(undefined)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)

    expect(navigationApi.getFocusedElement()?.id).toBe('element-0-1')
  })
})
