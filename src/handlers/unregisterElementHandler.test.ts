import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '../types.d'
import unregisterElementHandler from './unregisterElementHandler'

describe('unregisterElementHandler', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should unregister the element', () => {
    const unregisterElement = unregisterElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-0-3'
    unregisterElement(element)

    expect(state.elements.has(element.id)).toBe(false)
    expect(state.groups.get('group-0')?.elements.has(element.id)).toBe(false)
    expect(state.groups.get('group-0')?.elements.get('element-0-3')).toBeUndefined()
  })

  it('should delete the group if it is empty', () => {
    const unregisterElement = unregisterElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-4-0'
    unregisterElement(element)

    expect(state.groups.has('group-4')).toBe(false)
  })

  it('should not unregister the element if it is not registered', () => {
    const unregisterElement = unregisterElementHandler(state)

    const element = document.createElement('div')
    element.id = 'not-registered-element'
    unregisterElement(element)

    expect(state.elements.has(element.id)).toBe(false)
  })

  it('should unregister the element given the element id only', () => {
    const unregisterElement = unregisterElementHandler(state)

    const elementId = 'element-0-3'
    unregisterElement(elementId)

    expect(state.elements.has(elementId)).toBe(false)
    expect(state.groups.get('group-0')?.elements.has(elementId)).toBe(false)
    expect(state.groups.get('group-0')?.elements.get('element-0-3')).toBeUndefined()
  })
})
