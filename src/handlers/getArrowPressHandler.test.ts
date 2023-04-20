import { ArrowNavigationState } from '../types.d'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import getArrowPressHandler, { ERROR_MESSAGES } from './getArrowPressHandler'

describe('getArrowPressHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  beforeAll(() => {
    global.console = {
      ...global.console,
      warn: jest.fn()
    }
  })

  it('should return a function', () => {
    const handler = getArrowPressHandler(state, jest.fn(), {})
    expect(typeof handler).toBe('function')
  })

  it('should call the focusNextElement function', () => {
    const focusNextElement = jest.fn()
    const handler = getArrowPressHandler(state, focusNextElement, {})

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    handler(event)
    expect(focusNextElement).toHaveBeenCalled()
  })

  it('should log a warn message if not currentElement', () => {
    const focusNextElement = jest.fn()
    state.currentElement = null
    const handler = getArrowPressHandler(state, focusNextElement, {})

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    handler(event)
    expect(console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
  })

  it('should not call the focusNextElement function if not a valid key', () => {
    const focusNextElement = jest.fn()
    const handler = getArrowPressHandler(state, focusNextElement, {})

    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    handler(event)
    expect(focusNextElement).not.toHaveBeenCalled()
  })
})
