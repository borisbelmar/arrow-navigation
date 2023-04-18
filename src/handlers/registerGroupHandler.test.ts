import { ArrowNavigationState, FocusableGroup } from '../types.d'
import getViewNavigationStateMock from '../__mocks__/viewNavigationState.mock'
import registerGroupHandler, { ERROR_MESSAGES } from './registerGroupHandler'

describe('registerGroupHandler', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should register the group', () => {
    const registerGroup = registerGroupHandler(state)

    const group = document.createElement('div')
    group.id = 'group-5'
    registerGroup(group)

    expect(state.groups.has(group.id)).toBe(true)
    expect(state.groups.get(group.id)?.el).toBe(group)
  })

  it('should throw an error if the group id is not defined', () => {
    const registerGroup = registerGroupHandler(state)

    const group = document.createElement('div')
    expect(() => registerGroup(group)).toThrowError(ERROR_MESSAGES.GROUP_ID_REQUIRED)
  })

  it('if the group is already registered, just changes the group config and keep the elements', () => {
    const registerGroup = registerGroupHandler(state)
    const groupId = 'group-0'
    const group = state.groups.get(groupId) as FocusableGroup
    const groupTotalElements = group.elements.size

    const element = document.createElement('button')
    element.id = `element-0-${groupTotalElements}`

    expect(state.groupsConfig.get(group.el.id)?.viewportSafe).toBeUndefined()

    registerGroup(group.el, {
      viewportSafe: true
    })

    expect(state.groupsConfig.get(group.el.id)?.viewportSafe).toBe(true)
    expect(state.groups.get(groupId)?.elements.size).toBe(groupTotalElements)
  })
})
