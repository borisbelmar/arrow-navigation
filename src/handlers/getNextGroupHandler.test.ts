import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement } from '..'
import getNextGroupHandler from './getNextGroupHandler'

describe('getNextGroupHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should return the next group id', () => {
    state.currentElement = state.elements.get('element-0-0') as FocusableElement
    const handler = getNextGroupHandler(state)
    expect(handler('right')).toBe('group-1')
  })

  it('should return null if the group doesnt exist', () => {
    state.currentElement = state.elements.get('non-existent') as FocusableElement
    const handler = getNextGroupHandler(state)
    expect(handler('down')).toBe(null)
  })
})
