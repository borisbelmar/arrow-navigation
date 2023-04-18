import { ArrowNavigationState } from '../types.d'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import setFocusHandler from './setFocusHandler'

describe('setFocusHandler', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should set the focus to the element', () => {
    const setFocus = setFocusHandler(state)

    setFocus('element-1-0')

    expect(state.currentElement).toBe(state.groups.get('group-1')?.elements.get('element-1-0'))
    expect(state.currentElement?.el.focus).toHaveBeenCalled()
  })

  it('should not set the focus to the element if it is not registered', () => {
    const setFocus = setFocusHandler(state)
    const initialFocusedElement = state.currentElement;

    (state.currentElement?.el.focus as unknown as jest.Mock).mockClear()
    setFocus('not-registered-element')

    expect(state.currentElement).toBe(initialFocusedElement)
    expect(state.currentElement?.el.focus).not.toHaveBeenCalled()
  })
})
