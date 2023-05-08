import type { ArrowNavigationState, FocusableGroup } from '@/types'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import registerElementHandler, { ERROR_MESSAGES } from './registerElementHandler'

describe('registerElementHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter
  let onChangeElement: () => void

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
    onChangeElement = jest.fn()
  })

  it('should register the element on a new group', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?.el).toBe(element)
  })

  it('should register the element on an existing group', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)
    const groupId = 'group-0'
    const group = state.groups.get(groupId) as FocusableGroup
    const groupTotalElements = group.elements.size

    const element = document.createElement('button')
    element.id = `element-0-${groupTotalElements}`

    registerElement(element, groupId)

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?.el).toBe(element)
    expect(state.groups.get('group-0')?.elements.has(element.id)).toBe(true)
  })

  it('should throw an error if the element id is not defined', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    expect(() => registerElement(element, 'group-1')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-1-0'
    expect(() => registerElement(element, '')).toThrowError(ERROR_MESSAGES.GROUP_REQUIRED)
  })

  it('should log a warn message if element id is already registered and not register the element', () => {
    global.console.warn = jest.fn()
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-0-0'
    registerElement(element, 'group-0')

    expect(console.warn).toHaveBeenCalledWith(
      ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id)
    )
  })

  it('should set the element as the current element if current is null', () => {
    state.currentElement = null
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    element.id = 'element-5-0'
    registerElement(element, 'group-5')

    expect(onChangeElement).toHaveBeenCalledWith({ el: element, group: 'group-5', id: 'element-5-0' })
  })

  it('should throw an error if the element is not focusable', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('div')
    element.id = 'element-5-0'
    expect(() => registerElement(element, 'group-5')).toThrowError(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
  })

  it('should keep the group element if the groups doesnt exists but config exists', () => {
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const group = document.createElement('div')
    group.id = 'group-10'

    state.groupsConfig.set(group.id, {
      id: group.id,
      el: group
    })

    const element = document.createElement('button')
    element.id = 'element-10-0'
    registerElement(element, 'group-10')

    expect(state.groups.get('group-10')?.el).toBe(group)
  })

  it('should register an element with order', () => {
    state.groupsConfig.set('group-6', {
      id: 'group-6',
      el: state.groups.get('group-6')?.el as HTMLElement,
      byOrder: 'horizontal'
    })
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    registerElement(element, 'group-6', { order: 0 })

    expect(state.elements.has('group-6-0')).toBe(true)
    expect(state.elements.get(element.id)?.el).toBe(element)
    expect(state.elements.get(element.id)?.el.id).toBe('group-6-0')
    expect(state.elements.get(element.id)?.id).toBe('group-6-0')
    expect(state.groups.get('group-6')?.elements.has('group-6-0')).toBe(true)
  })

  it('should not register an element with order if the group is byOrder but the element doesnt have order', () => {
    state.groupsConfig.set('group-6', {
      id: 'group-6',
      el: state.groups.get('group-6')?.el as HTMLElement,
      byOrder: 'horizontal'
    })
    const registerElement = registerElementHandler(state, onChangeElement, emitter.emit)

    const element = document.createElement('button')
    expect(() => registerElement(element, 'group-6')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })
})
