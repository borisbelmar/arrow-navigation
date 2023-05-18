/* eslint-disable no-underscore-dangle */
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import getCurrentElement from '@/utils/getCurrentElement'
import globalFocusHandler from './globalFocusHandler'
import type { ArrowNavigationState } from '..'

describe('globalFocusHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should focus the current element if the target is not the currentElement', () => {
    const event = { target: { id: 'another-element' } } as unknown as FocusEvent
    state.currentElement = 'element-0-0'
    const focusMock = jest.fn();
    (getCurrentElement(state)?._ref as HTMLElement).focus = focusMock
    globalFocusHandler(state, event, true)
    expect(state.currentElement).toBe('element-0-0')
    expect(focusMock).toHaveBeenCalled()
  })

  it('should not focus the current element if the target is the currentElement', () => {
    const event = { target: { id: 'element-0-0' } } as unknown as FocusEvent
    state.currentElement = 'element-0-0'
    const focusMock = jest.fn();
    (getCurrentElement(state)?._ref as HTMLElement).focus = focusMock
    globalFocusHandler(state, event, true)
    expect(state.currentElement).toBe('element-0-0')
    expect(focusMock).not.toHaveBeenCalled()
  })

  it('should not focus the current element if not exists on state', () => {
    const event = { target: { id: 'non-existent' } } as unknown as FocusEvent
    state.currentElement = 'non-existent-current'
    globalFocusHandler(state, event, true)
    expect(state.currentElement).toBe('non-existent-current')
    expect(getCurrentElement(state)).toBe(null)
  })

  it('should not focus if the currentElement doesnt exists on DOM', () => {
    // For coverage only
    const event = { target: { id: 'non-existent' } } as unknown as FocusEvent
    state.currentElement = 'element-0-0'
    document.getElementById('element-0-0')?.remove()
    globalFocusHandler(state, event, true)
    expect(state.currentElement).toBe('element-0-0')
    expect(getCurrentElement(state)?.id).toBe('element-0-0')
    expect((state.adapter.getFocusedNode() as HTMLElement)?.id).not.toBe('element-0-0')
  })
})
