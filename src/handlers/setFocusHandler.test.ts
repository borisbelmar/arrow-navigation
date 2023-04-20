import { ArrowNavigationState } from '../types.d'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import setFocusHandler from './setFocusHandler'

describe('setFocusHandler', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should set the focus to the element', () => {
    const onChange = jest.fn()
    const setFocus = setFocusHandler(state, onChange)

    setFocus('element-1-0')

    expect(onChange).toHaveBeenCalled()
  })

  it('should not set the focus to the element if it is not registered', () => {
    const onChange = jest.fn()
    const setFocus = setFocusHandler(state, onChange)

    setFocus('not-registered-element')

    expect(onChange).not.toHaveBeenCalled()
  })
})
