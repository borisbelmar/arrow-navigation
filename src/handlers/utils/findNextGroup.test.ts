import { ArrowNavigationState, FocusableGroup, FocusableGroupConfig } from '@/types'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import findNextGroup from './findNextGroup'

describe('findNextGroup', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 52
  })
  it('should return the next group element if setted in the config', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    const group1 = state.groups.get('group-1') as FocusableGroup

    group0Config.nextGroupByDirection = {
      right: group1.id
    }

    const nextGroup = findNextGroup({
      direction: 'right',
      state
    })
    expect(nextGroup?.group).toBe(group1)
  })

  it('should return null if the next group element is set null manually', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig

    group0Config.nextGroupByDirection = {
      right: null
    }

    const nextGroup = findNextGroup({
      direction: 'right',
      state
    })
    expect(nextGroup).toBe(null)
  })

  it('should return the next group from a setted group manually', () => {
    const group1Config = state.groupsConfig.get('group-1') as FocusableGroupConfig
    const group2 = state.groups.get('group-2') as FocusableGroup

    group1Config.nextGroupByDirection = {
      down: group2.id
    }

    const nextGroup = findNextGroup({
      fromGroup: state.groups.get('group-1') as FocusableGroup,
      direction: 'down',
      state
    })
    expect(nextGroup?.group).toBe(group2)
  })
})
