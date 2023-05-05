import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '..'
import getNextElementHandler from './getNextElementHandler'

describe('getNextElementHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should return the next element id', () => {
    state.currentElement = 'element-0-0'
    const handler = getNextElementHandler(state)
    expect(handler({ direction: 'down' })).toBe('element-0-1')
  })

  it('should return null if the element doesnt exist', () => {
    state.currentElement = 'non-existent'
    const handler = getNextElementHandler(state)
    expect(handler({ direction: 'right' })).toBe(null)
  })

  it('should return the next element id on current group', () => {
    state.currentElement = 'element-0-0'
    const handler = getNextElementHandler(state)
    expect(handler({ direction: 'right', inGroup: true })).toBe(null)

    state.currentElement = 'element-0-0'
    expect(handler({ direction: 'down', inGroup: true })).toBe('element-0-1')
  })
})
