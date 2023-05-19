/* eslint-disable @typescript-eslint/no-non-null-assertion */
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import createEventEmitter from '@/utils/createEventEmitter'
import resetGroupStateHandler, { ERROR_MESSAGES } from './resetGroupStateHandler'

describe('resetGroupStateHandler', () => {
  it('should reset the group state', () => {
    const state = getViewNavigationStateMock()
    const emitter = createEventEmitter()

    const handler = resetGroupStateHandler({
      state,
      emit: emitter.emit
    })

    state.groupsConfig.get('group-0')!.saveLast = true
    state.groupsConfig.get('group-0')!.lastElement = 'element-0-1'

    expect(state.groupsConfig.get('group-0')!.saveLast).toBe(true)
    expect(state.groupsConfig.get('group-0')!.lastElement).toBe('element-0-1')

    handler('group-0')

    expect(state.groupsConfig.get('group-0')!.saveLast).toBe(true)
    expect(state.groupsConfig.get('group-0')!.lastElement).toBe(undefined)
  })

  it('should throw an error if the group id is not provided', () => {
    const state = getViewNavigationStateMock()
    const emitter = createEventEmitter()

    const handler = resetGroupStateHandler({
      state,
      emit: emitter.emit
    })

    expect(() => handler(null as unknown as string)).toThrowError(ERROR_MESSAGES.GROUP_ID_REQUIRED)
  })
})
