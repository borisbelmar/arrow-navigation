import { ArrowNavigationState, FocusableGroupConfig } from '../types'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import getArrowPressHandler from './getArrowPressHandler'

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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a function', () => {
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: jest.fn()
    })
    expect(typeof handler).toBe('function')
  })

  it('should call the focusNextElement function', () => {
    const focusNextElement = jest.fn()
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: focusNextElement
    })

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' })
    handler(event)
    expect(focusNextElement).toHaveBeenCalled()
  })

  it('should not call the focusNextElement function if not a valid key', () => {
    const focusNextElement = jest.fn()
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: focusNextElement
    })

    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    handler(event)
    expect(focusNextElement).not.toHaveBeenCalled()
  })

  it('should not call the onChange callback if event is repeat when debounce is true', () => {
    const focusNextElement = jest.fn();
    (state.groupsConfig.get('group-0') as FocusableGroupConfig).arrowDebounce = true
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: focusNextElement
    })

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', repeat: true })
    handler(event)
    expect(focusNextElement).not.toHaveBeenCalled()
  })

  it('should call the onChange callback if event is repeat when debounce is false', () => {
    const focusNextElement = jest.fn();
    (state.groupsConfig.get('group-0') as FocusableGroupConfig).arrowDebounce = false
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: focusNextElement
    })

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', repeat: true })
    handler(event)
    expect(focusNextElement).toHaveBeenCalled()
  })

  it('should call the onChange callback if event is repeat when group config is undefined', () => {
    const focusNextElement = jest.fn()
    state.groupsConfig.delete('group-0')
    const handler = getArrowPressHandler({
      state,
      onChangeCurrentElement: focusNextElement
    })

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown', repeat: true })
    handler(event)
    expect(focusNextElement).toHaveBeenCalled()
  })
})
