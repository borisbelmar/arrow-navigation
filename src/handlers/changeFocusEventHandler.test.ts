import EVENTS from '@/config/events'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import getCurrentElement from '@/utils/getCurrentElement'
import { ArrowNavigationState, FocusableElement, FocusableGroupConfig } from '../types'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import changeFocusEventHandler from './changeFocusEventHandler'

describe('changeFocusEventHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should not call any event if not element setted', () => {
    const prevElement = null
    const nextElement = null

    const emitMock = jest.fn()

    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction: 'down',
      state,
      emit: emitMock
    })

    expect(emitMock).not.toHaveBeenCalled()
  })

  it('should call onElementFocus, onElementBlur, onGroupBlur and onGroupFocus correctly', () => {
    const prevElement = state.elements.get('element-0-0') as FocusableElement
    const nextElement = state.elements.get('element-1-0') as FocusableElement

    const events = {
      onElementFocus: jest.fn(),
      onElementBlur: jest.fn(),
      onGroupBlur: jest.fn(),
      onGroupFocus: jest.fn()
    }

    emitter.on(EVENTS.ELEMENT_FOCUS, events.onElementFocus)
    emitter.on(EVENTS.ELEMENT_BLUR, events.onElementBlur)
    emitter.on(EVENTS.GROUP_BLUR, events.onGroupBlur)
    emitter.on(EVENTS.GROUP_FOCUS, events.onGroupFocus)

    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction: 'down',
      state,
      emit: emitter.emit
    })

    expect(events.onElementFocus).toHaveBeenCalledWith(nextElement, 'down', prevElement)
    expect(events.onElementBlur).toHaveBeenCalledWith(getCurrentElement(state) as FocusableElement, 'down', nextElement)
    expect(events.onGroupBlur).toHaveBeenCalledWith(state.groupsConfig.get('group-0'), 'down', state.groupsConfig.get('group-1'))
    expect(events.onGroupFocus).toHaveBeenCalledWith(state.groupsConfig.get('group-1'), 'down', state.groupsConfig.get('group-0'))
  })

  it('should call onFocus and onBlur on group and element', () => {
    const currentGroupConfig = state.groupsConfig.get('group-0') as FocusableGroupConfig
    const prevElement = state.elements.get('element-0-0') as FocusableElement
    currentGroupConfig.onFocus = jest.fn()
    currentGroupConfig.onBlur = jest.fn()
    prevElement.onFocus = jest.fn()
    prevElement.onBlur = jest.fn()

    const nextGroupConfig = state.groupsConfig.get('group-1') as FocusableGroupConfig
    const nextElement = state.elements.get('element-1-0') as FocusableElement
    nextGroupConfig.onFocus = jest.fn()
    nextGroupConfig.onBlur = jest.fn()
    nextElement.onFocus = jest.fn()
    nextElement.onBlur = jest.fn()

    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction: 'down',
      state,
      emit: emitter.emit
    })

    expect(currentGroupConfig.onBlur).toHaveBeenCalledWith({
      direction: 'down',
      current: currentGroupConfig,
      next: nextGroupConfig
    })
    expect(currentGroupConfig.onFocus).not.toHaveBeenCalled()
    expect(prevElement.onBlur).toHaveBeenCalledWith({
      direction: 'down',
      current: prevElement,
      next: nextElement
    })
    expect(prevElement.onFocus).not.toHaveBeenCalled()

    expect(nextGroupConfig.onFocus).toHaveBeenCalledWith({
      direction: 'down',
      current: nextGroupConfig,
      prev: currentGroupConfig
    })
    expect(nextGroupConfig.onBlur).not.toHaveBeenCalled()
    expect(nextElement.onFocus).toHaveBeenCalledWith({
      direction: 'down',
      current: nextElement,
      prev: prevElement
    })
    expect(nextElement.onBlur).not.toHaveBeenCalled()
  })

  it('should not call onBlur if no prevGroup', () => {
    const prevElement = null
    const nextElement = state.elements.get('element-1-0') as FocusableElement

    const events = {
      onElementFocus: jest.fn(),
      onElementBlur: jest.fn(),
      onGroupBlur: jest.fn(),
      onGroupFocus: jest.fn(),
      onCurrentElementChange: jest.fn(),
      onCurrentGroupChange: jest.fn()
    }

    emitter.on(EVENTS.ELEMENT_FOCUS, events.onElementFocus)
    emitter.on(EVENTS.ELEMENT_BLUR, events.onElementBlur)
    emitter.on(EVENTS.GROUP_BLUR, events.onGroupBlur)
    emitter.on(EVENTS.GROUP_FOCUS, events.onGroupFocus)
    emitter.on(EVENTS.CURRENT_ELEMENT_CHANGE, events.onCurrentElementChange)
    emitter.on(EVENTS.CURRENT_GROUP_CHANGE, events.onCurrentGroupChange)

    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction: 'down',
      state,
      emit: emitter.emit
    })

    expect(events.onElementFocus).toHaveBeenCalledWith(nextElement, 'down', null)
    expect(events.onElementBlur).not.toHaveBeenCalled()
    expect(events.onGroupBlur).not.toHaveBeenCalled()
    expect(events.onGroupFocus).toHaveBeenCalledWith(state.groupsConfig.get('group-1'), 'down', undefined)
  })

  it('should save the last element of the group if saveLast is true', () => {
    const currentGroupConfig = state.groupsConfig.get('group-0') as FocusableGroupConfig
    const nextElement = state.elements.get('element-1-0') as FocusableElement
    const prevElement = state.elements.get('element-0-0') as FocusableElement
    currentGroupConfig.saveLast = true
    currentGroupConfig.lastElement = undefined

    changeFocusEventHandler({
      nextElement,
      prevElement,
      direction: 'down',
      state,
      emit: emitter.emit
    })

    expect(state.groupsConfig.get('group-0')?.lastElement).toBe('element-0-0')
  })
})
