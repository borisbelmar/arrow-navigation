/* eslint-disable no-underscore-dangle */
import type { ArrowNavigationState, FocusableGroup } from '@/types'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import EVENTS from '@/config/events'
import registerElementHandler, { ERROR_MESSAGES, TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED } from './registerElementHandler'

describe('registerElementHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should register the element on a new group', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('button')
    element.id = 'element-5-0'
    document.body.appendChild(element)
    registerElement(element.id, 'group-5')

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?._ref).toBe(element)
  })

  it('should register the element on an existing group', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })
    const groupId = 'group-0'
    const group = state.groups.get(groupId) as FocusableGroup
    const groupTotalElements = group.elements.size

    const element = document.createElement('button')
    element.id = `element-0-${groupTotalElements}`

    document.body.appendChild(element)

    registerElement(element.id, groupId)

    expect(state.elements.has(element.id)).toBe(true)
    expect(state.elements.get(element.id)?._ref).toBe(element)
    expect(state.groups.get('group-0')?.elements.has(element.id)).toBe(true)
  })

  it('should throw an error if the element id is not defined', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })
    expect(() => registerElement(null as unknown as string, 'group-1')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('button')
    element.id = 'element-1-0'
    document.body.appendChild(element)
    expect(() => registerElement(element.id, '')).toThrowError(ERROR_MESSAGES.GROUP_REQUIRED)
  })

  it('should log a warn message if element id is already registered and not register the element', () => {
    global.console.warn = jest.fn()
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('button')
    element.id = 'element-0-0'
    document.body.appendChild(element)
    registerElement(element.id, 'group-0')

    expect(console.warn).toHaveBeenCalledWith(
      ERROR_MESSAGES.ELEMENT_ID_ALREADY_REGISTERED(element.id)
    )
  })

  it('should throw an error if the element is not focusable', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('div')
    element.id = 'element-5-0'
    document.body.appendChild(element)
    expect(() => registerElement(element.id, 'group-5')).toThrowError(ERROR_MESSAGES.ELEMENT_NOT_FOCUSABLE(element.id))
  })

  it('should keep the group element if the groups doesnt exists but config exists', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const group = document.createElement('div')
    group.id = 'group-10'

    state.groupsConfig.set(group.id, {
      id: group.id,
      _ref: group
    })

    document.body.appendChild(group)

    const element = document.createElement('button')
    element.id = 'element-10-0'
    group.appendChild(element)
    registerElement(element.id, 'group-10')

    expect(state.groups.get('group-10')?._ref).toBe(group)
  })

  it('should register an element with order', () => {
    state.groupsConfig.set('group-6', {
      id: 'group-6',
      _ref: state.groups.get('group-6')?._ref as HTMLElement,
      byOrder: 'horizontal'
    })
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('button')
    element.id = 'element-6-0'
    document.body.appendChild(element)
    registerElement(element.id, 'group-6', { order: 0 })

    expect(state.elements.has('group-6-0')).toBe(true)
    expect(state.elements.get(element.id)?._ref).toBe(element)
    expect(state.elements.get(element.id)?._ref?.id).toBe('group-6-0')
    expect(state.elements.get(element.id)?.id).toBe('group-6-0')
    expect(state.groups.get('group-6')?.elements.has('group-6-0')).toBe(true)
  })

  it('should not register an element with order if the group is byOrder but the element doesnt have order', () => {
    state.groupsConfig.set('group-6', {
      id: 'group-6',
      _ref: state.groups.get('group-6')?._ref as HTMLElement,
      byOrder: 'horizontal'
    })
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    const element = document.createElement('button')
    expect(() => registerElement(element.id, 'group-6')).toThrowError(ERROR_MESSAGES.ELEMENT_ID_REQUIRED)
  })

  it('should emit the elements register end event', () => {
    jest.useFakeTimers()

    const emitMock = jest.fn()

    const registerElement = registerElementHandler({
      state,
      emit: emitMock
    })

    const element = document.createElement('button')
    element.id = 'element-5-0'
    document.body.appendChild(element)
    registerElement(element.id, 'group-5')

    // Group 5 is registered and element-5-0 is registered
    expect(emitMock).toHaveBeenCalledTimes(2)
    expect(emitMock).not.toHaveBeenCalledWith(EVENTS.ELEMENTS_REGISTER_END)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)

    expect(emitMock).toHaveBeenCalledWith(EVENTS.ELEMENTS_REGISTER_END)
    expect(emitMock).toHaveBeenCalledTimes(3)

    jest.resetAllMocks()

    const element2 = document.createElement('button')
    element2.id = 'element-5-1'
    document.body.appendChild(element2)
    registerElement(element2.id, 'group-5')

    const element3 = document.createElement('button')
    element3.id = 'element-5-2'
    document.body.appendChild(element3)
    registerElement(element3.id, 'group-5')

    expect(emitMock).not.toHaveBeenCalledWith(EVENTS.ELEMENTS_REGISTER_END)
    // Group 5 is already registered, but element-5-1 and element-5-2 are not
    expect(emitMock).toHaveBeenCalledTimes(2)

    jest.advanceTimersByTime(TIMEOUT_TIME_EMIT_ELEMENTS_CHANGED)
    expect(emitMock).toHaveBeenCalledWith(EVENTS.ELEMENTS_REGISTER_END)
    expect(emitMock).toHaveBeenCalledTimes(3)
  })

  it('should throw an error if the element not exists at DOM', () => {
    const registerElement = registerElementHandler({
      state,
      emit: emitter.emit
    })

    expect(() => registerElement('not-exists', 'group-5')).toThrowError(ERROR_MESSAGES.ELEMENT_DOES_NOT_EXIST('not-exists'))
  })
})
