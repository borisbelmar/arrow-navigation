import type { ArrowNavigationState, FocusableGroup } from '../types.d'
import registerElementHandler, { ERROR_MESSAGES } from './registerElementHandler'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'

describe('registerElementHandler', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should register the element on a new group', () => {
    const registerElement = registerElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?.el).toBe(element)
  })

  it('should register the element on an existing group', () => {
    const registerElement = registerElementHandler(state)
    const groupId = 'group-0'
    const group = state.groups.get(groupId) as FocusableGroup
    const groupTotalElements = group.elements.size

    const element = document.createElement('button')
    element.id = `element-0-${groupTotalElements}`

    registerElement(element, groupId)

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.groups.get(groupId)?.elements.get(element.id)?.el).toBe(element)
  })

  it('should throw an error if the element id is not defined', () => {
    const registerElement = registerElementHandler(state)

    const element = document.createElement('div')
    expect(() => registerElement(element, 'group-1')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerElement = registerElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-1-0'
    expect(() => registerElement(element, '')).toThrowError(ERROR_MESSAGES.GROUP_REQUIRED)
  })

  it('should log a warn message if element id is already registered and not register the element', () => {
    global.console.warn = jest.fn()
    const registerElement = registerElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-0-0'
    registerElement(element, 'group-0')

    expect(console.warn).toHaveBeenCalledWith(
      ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id)
    )
  })

  it('should set the element as the current element if current is null', () => {
    state.currentElement = null
    const registerElement = registerElementHandler(state)

    const element = document.createElement('div')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(state.currentElement).toBe(state.elements.get(element.id))
  })
})
