/* eslint-disable no-underscore-dangle */
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import { ArrowNavigationState, FocusableGroup } from '../types'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import registerGroupHandler, { ERROR_MESSAGES } from './registerGroupHandler'

describe('registerGroupHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should register the group', () => {
    const registerGroup = registerGroupHandler({
      state,
      emit: emitter.emit
    })

    const group = document.createElement('div')
    group.id = 'group-5'
    document.body.appendChild(group)
    registerGroup(group.id)

    expect(state.groups.has(group.id)).toBe(true)
    expect(state.groups.get(group.id)?._ref).toBe(group)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerGroup = registerGroupHandler({
      state,
      emit: emitter.emit
    })

    const group = document.createElement('div')
    expect(() => registerGroup(group.id)).toThrowError(ERROR_MESSAGES.GROUP_ID_REQUIRED)
  })

  it('if the group is already registered, just changes the group config and keep the elements', () => {
    state = getViewNavigationStateMock()
    const registerGroup = registerGroupHandler({
      state,
      emit: emitter.emit
    })
    const groupId = 'group-0'
    const group = state.groups.get(groupId) as FocusableGroup
    const groupTotalElements = group.elements.size

    expect(state.groupsConfig.get(group.id)?.viewportSafe).toBeUndefined()

    registerGroup(groupId, {
      viewportSafe: true
    })

    expect(state.groupsConfig.get(group.id)?.viewportSafe).toBe(true)
    expect(state.groups.get(groupId)?.elements.size).toBe(groupTotalElements)
  })

  it('should throw an error if the group does not exist at DOM', () => {
    const registerGroup = registerGroupHandler({
      state,
      emit: emitter.emit
    })
    expect(() => registerGroup('non-existent-group'))
      .toThrowError(ERROR_MESSAGES.GROUP_DOES_NOT_EXIST('non-existent-group'))
  })
})
