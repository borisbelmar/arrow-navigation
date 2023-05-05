import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '..'
import getNextGroupHandler from './getNextGroupHandler'

describe('getNextGroupHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should return the next group id', () => {
    state.currentElement = 'element-0-0'
    const handler = getNextGroupHandler(state)
    expect(handler({ direction: 'right' })).toBe('group-1')
  })

  it('should return null if the group doesnt exist', () => {
    state.currentElement = 'non-existent'
    const handler = getNextGroupHandler(state)
    expect(handler({ direction: 'down' })).toBe(null)
  })
})
