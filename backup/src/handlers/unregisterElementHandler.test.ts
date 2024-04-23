import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '@/types'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import unregisterElementHandler from './unregisterElementHandler'

describe('unregisterElementHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should unregister the element', () => {
    const unregisterElement = unregisterElementHandler({
      state,
      emit: emitter.emit
    })

    const elementId = 'element-0-3'

    expect(state.elements.has(elementId)).toBe(true)

    unregisterElement(elementId)

    expect(state.elements.has(elementId)).toBe(false)
    expect(state.groups.get('group-0')?.elements.has(elementId)).toBe(false)
  })

  it('should delete the group if it is empty', () => {
    const unregisterElement = unregisterElementHandler({
      state,
      emit: emitter.emit
    })

    const elementId = 'element-4-0'
    const groupId = 'group-4'

    expect(state.groups.has(groupId)).toBe(true)
    expect(state.groups.get(groupId)?.elements.has(elementId)).toBe(true)
    expect(state.elements.has(elementId)).toBe(true)
    expect(state.groups.get(groupId)?.elements.size).toBe(1)

    unregisterElement(elementId)

    expect(state.groups.has(groupId)).toBe(false)
    expect(state.elements.has(elementId)).toBe(false)
  })

  it('should not unregister the element if it is not registered', () => {
    const unregisterElement = unregisterElementHandler({
      state,
      emit: emitter.emit
    })

    const elementId = 'not-registered-element'
    unregisterElement(elementId)

    expect(state.elements.has(elementId)).toBe(false)
  })
})
