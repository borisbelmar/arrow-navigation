import EVENTS from '@/config/events'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import { ArrowNavigationState, FocusableElement, FocusableGroup, FocusableGroupConfig } from '../types.d'
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
    state.currentElement = state.groups.get('group-0')?.elements.get('element-0-0') as FocusableElement
    const nextElement = state.groups.get('group-0')?.elements.get('element-0-1') as FocusableElement

    changeFocusEventHandler(
      nextElement,
      state,
      emitter.emit
    )
  })

  it('should call onElementFocus, onElementBlur, onGroupBlur and onGroupFocus correctly', () => {
    state.currentElement = state.groups.get('group-0')?.elements.get('element-0-0') as FocusableElement
    const nextElement = state.groups.get('group-1')?.elements.get('element-1-0') as FocusableElement

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

    changeFocusEventHandler(
      nextElement,
      state,
      emitter.emit
    )

    expect(events.onElementFocus).toHaveBeenCalledWith(nextElement)
    expect(events.onElementBlur).toHaveBeenCalledWith(state.currentElement as FocusableElement)
    expect(events.onGroupBlur).toHaveBeenCalledWith(state.groupsConfig.get('group-0'))
    expect(events.onGroupFocus).toHaveBeenCalledWith(state.groupsConfig.get('group-1'))
  })

  it('should call onFocus and onBlur on group and element', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const currentGroupConfig = state.groupsConfig.get('group-0') as FocusableGroupConfig
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement
    currentGroupConfig.onFocus = jest.fn()
    currentGroupConfig.onBlur = jest.fn()
    state.currentElement.onFocus = jest.fn()
    state.currentElement.onBlur = jest.fn()

    const nextGroup = state.groups.get('group-1') as FocusableGroup
    const nextGroupConfig = state.groupsConfig.get('group-1') as FocusableGroupConfig
    const nextElement = nextGroup.elements.get('element-1-0') as FocusableElement
    nextGroupConfig.onFocus = jest.fn()
    nextGroupConfig.onBlur = jest.fn()
    nextElement.onFocus = jest.fn()
    nextElement.onBlur = jest.fn()

    changeFocusEventHandler(
      nextElement,
      state,
      emitter.emit
    )

    expect(currentGroupConfig.onBlur).toHaveBeenCalled()
    expect(currentGroupConfig.onFocus).not.toHaveBeenCalled()
    expect(state.currentElement.onBlur).toHaveBeenCalled()
    expect(state.currentElement.onFocus).not.toHaveBeenCalled()

    expect(nextGroupConfig.onFocus).toHaveBeenCalled()
    expect(nextGroupConfig.onBlur).not.toHaveBeenCalled()
    expect(nextElement.onFocus).toHaveBeenCalled()
    expect(nextElement.onBlur).not.toHaveBeenCalled()
  })

  it('should not call onBlur if no prevGroup', () => {
    state.currentElement = null
    const nextElement = state.groups.get('group-1')?.elements.get('element-1-0') as FocusableElement

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

    changeFocusEventHandler(
      nextElement,
      state,
      emitter.emit
    )

    expect(events.onElementFocus).toHaveBeenCalledWith(nextElement)
    expect(events.onElementBlur).not.toHaveBeenCalled()
    expect(events.onGroupBlur).not.toHaveBeenCalled()
    expect(events.onGroupFocus).toHaveBeenCalledWith(state.groupsConfig.get('group-1'))
  })
})
