import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '@/types'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import updateElementHandler from './updateElementHandler'

describe('updateElementHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should update the element', () => {
    const updateElement = updateElementHandler({
      state,
      emit: emitter.emit
    })

    const element00 = state.elements.get('element-0-0')

    expect(element00).toBeDefined()
    expect(element00?.id).toBe('element-0-0')

    const handlerFocus = jest.fn()

    updateElement('element-0-0', { onFocus: handlerFocus })

    const updatedElement00 = state.elements.get('element-0-0')

    expect(updatedElement00).toBeDefined()
    expect(updatedElement00?.id).toBe('element-0-0')
    expect(updatedElement00?.onFocus).toBe(handlerFocus)
  })

  it('should not update the element if it does not exist', () => {
    const updateElement = updateElementHandler({
      state,
      emit: emitter.emit
    })

    const nonExistentElement = state.elements.get('non-existent-element')

    expect(nonExistentElement).toBeUndefined()

    const handlerFocus = jest.fn()

    updateElement('non-existent-element', { onFocus: handlerFocus })

    const updatedNonExistentElement = state.elements.get('non-existent-element')

    expect(updatedNonExistentElement).toBeUndefined()
  })
})
