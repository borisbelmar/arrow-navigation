import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState } from '@/types'
import createEventEmitter, { EventEmitter } from '@/utils/createEventEmitter'
import updateGroupHandler from './updateGroupHandler'

describe('updateGroupHandler', () => {
  let state: ArrowNavigationState
  let emitter: EventEmitter

  beforeEach(() => {
    state = getViewNavigationStateMock()
    emitter = createEventEmitter()
  })

  it('should update the group', () => {
    const updateGroup = updateGroupHandler({
      state,
      emit: emitter.emit
    })

    const group0 = state.groupsConfig.get('group-0')

    expect(group0).toBeDefined()
    expect(group0?.id).toBe('group-0')

    const handlerFocus = jest.fn()

    updateGroup('group-0', { onFocus: handlerFocus })

    const updatedGroup0 = state.groupsConfig.get('group-0')

    expect(updatedGroup0).toBeDefined()
    expect(updatedGroup0?.id).toBe('group-0')
    expect(updatedGroup0?.onFocus).toBe(handlerFocus)
  })

  it('should not update the group if it does not exist', () => {
    const updateGroup = updateGroupHandler({
      state,
      emit: emitter.emit
    })

    const nonExistentGroup = state.groups.get('non-existent-group')

    expect(nonExistentGroup).toBeUndefined()

    const handlerFocus = jest.fn()

    updateGroup('non-existent-group', { onFocus: handlerFocus })

    const updatedNonExistentGroup = state.groups.get('non-existent-group')

    expect(updatedNonExistentGroup).toBeUndefined()
  })
})
