import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import getCurrentElement from '@/utils/getCurrentElement'
import globalFocusHandler from './globalFocusHandler'
import { ArrowNavigationState, FocusableElement } from '..'

describe('globalFocusHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should focus the current element if the target is not the currentElement', () => {
    const event = { target: { id: 'another-element' } } as unknown as FocusEvent
    state.currentElement = 'element-0-0'
    const focusMock = jest.fn();
    (getCurrentElement(state) as FocusableElement).el.focus = focusMock
    globalFocusHandler(state, event)
    expect(state.currentElement).toBe('element-0-0')
    expect(focusMock).toHaveBeenCalled()
  })

  it('should not focus the current element if the target is the currentElement', () => {
    const event = { target: { id: 'element-0-0' } } as unknown as FocusEvent
    state.currentElement = 'element-0-0'
    const focusMock = jest.fn();
    (getCurrentElement(state) as FocusableElement).el.focus = focusMock
    globalFocusHandler(state, event)
    expect(state.currentElement).toBe('element-0-0')
    expect(focusMock).not.toHaveBeenCalled()
  })

  it('should not focus the current element if not exists on state', () => {
    const event = { target: { id: 'non-existent' } } as unknown as FocusEvent
    state.currentElement = 'non-existent-current'
    globalFocusHandler(state, event)
    expect(state.currentElement).toBe('non-existent-current')
    expect(getCurrentElement(state)).toBe(null)
  })
})
