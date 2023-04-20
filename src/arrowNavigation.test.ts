/* eslint-disable no-underscore-dangle */
import { initArrowNavigation, getArrowNavigation, ERROR_MESSAGES } from './arrowNavigation'
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

  it('should return the focused element', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    navigationApi._forceNavigate('ArrowDown')

    expect(navigationApi.getFocusedElement()).toBe(state.groups.get('group-0')?.elements.get('element-0-1'))
  })

  it('should return the state in debug mode', () => {
    initArrowNavigation({ debug: true })
    const navigationApi = getArrowNavigation()
    const state = getViewNavigationStateMock()
    navigationApi._setState(state)

    expect(navigationApi._getState()).toEqual({ ...state, debug: true })
  })
})
