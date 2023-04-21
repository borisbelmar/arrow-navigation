import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement } from '..'
import getNextElementHandler from './getNextElementHandler'

describe('getNextElementHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should return the next element id', () => {
    state.currentElement = state.elements.get('element-0-0') as FocusableElement
    const handler = getNextElementHandler(state)
    expect(handler('down')).toBe('element-0-1')
  })

  it('should return null if the element doesnt exist', () => {
    state.currentElement = state.elements.get('non-existent') as FocusableElement
    const handler = getNextElementHandler(state)
    expect(handler('right')).toBe(null)
  })

  it('should return the next element id on current group', () => {
    state.currentElement = state.elements.get('element-0-0') as FocusableElement
    const handler = getNextElementHandler(state)
    expect(handler('right', true)).toBe(null)

    state.currentElement = state.elements.get('element-0-0') as FocusableElement
    expect(handler('down', true)).toBe('element-0-1')
  })
})
