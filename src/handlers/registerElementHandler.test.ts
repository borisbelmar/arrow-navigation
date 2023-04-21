import type { ArrowNavigationState, FocusableGroup } from '@/types.d'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import registerElementHandler, { ERROR_MESSAGES } from './registerElementHandler'

describe('registerElementHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should register the element on a new group', () => {
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?.el).toBe(element)
  })

  it('should register the element on an existing group', () => {
    const registerElement = registerElementHandler(state, emitter.emit)
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
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('button')
    expect(() => registerElement(element, 'group-1')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-1-0'
    expect(() => registerElement(element, '')).toThrowError(ERROR_MESSAGES.GROUP_REQUIRED)
  })

  it('should log a warn message if element id is already registered and not register the element', () => {
    global.console.warn = jest.fn()
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-0-0'
    registerElement(element, 'group-0')

    expect(console.warn).toHaveBeenCalledWith(
      ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id)
    )
  })

  it('should set the element as the current element if current is null', () => {
    state.currentElement = null
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(state.currentElement).toBe(state.elements.get(element.id))
  })

  it('should throw an error if the element is not focusable', () => {
    const registerElement = registerElementHandler(state, emitter.emit)

    const element = document.createElement('div')
    element.id = 'element-5-0'
    expect(() => registerElement(element, 'group-5')).toThrowError(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
  })

  it('should keep the group element if the groups doesnt exists but config exists', () => {
    const registerElement = registerElementHandler(state, emitter.emit)

    const group = document.createElement('div')
    group.id = 'group-10'

    state.groupsConfig.set(group.id, {
      el: group
    })

    const element = document.createElement('button')
    element.id = 'element-10-0'
    registerElement(element, 'group-10')

    expect(state.groups.get('group-10')?.el).toBe(group)
  })
})
