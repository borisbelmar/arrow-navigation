import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import type { ArrowNavigationState } from '@/types'
import directionPressHandler, { ERROR_MESSAGES } from './directionPressHandler'

describe('directionPressHandler Function', () => {
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

  it('should log a warn message if not currentElement and elements is empty', () => {
    const focusNextElement = jest.fn()
    state.currentElement = null
    state.elements = new Map()
    directionPressHandler({
      state,
      onChangeCurrentElement: focusNextElement,
      direction: 'down',
      repeat: false
    })
    expect(console.warn).toHaveBeenCalledWith(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
  })

  it('should focus a random element on map of elements if currentElement is null and elements is not empty', () => {
    const focusNextElement = jest.fn()
    state.currentElement = null
    state.elements = new Map().set('element-0-0', {
      el: document.createElement('button'),
      group: 'group-0'
    })
    directionPressHandler({
      state,
      direction: 'down',
      onChangeCurrentElement: focusNextElement,
      repeat: false
    })

    expect(console.warn).not.toHaveBeenCalledWith(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
    expect(focusNextElement).toHaveBeenCalled()
  })

  it('should focus the initialFocusElement if currentElement is null and elements is not empty', () => {
    const focusNextElement = jest.fn()
    state.currentElement = null
    state.initialFocusElement = 'element-0-0'
    state.elements = new Map().set('element-0-0', {
      el: document.createElement('button'),
      group: 'group-0'
    })
    directionPressHandler({
      state,
      direction: 'down',
      onChangeCurrentElement: focusNextElement,
      repeat: false
    })

    expect(console.warn).not.toHaveBeenCalledWith(ERROR_MESSAGES.NO_ELEMENT_FOCUSED)
    expect(focusNextElement).toHaveBeenCalled()
  })
})
