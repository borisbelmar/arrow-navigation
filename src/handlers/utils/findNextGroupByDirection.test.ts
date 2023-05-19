/* eslint-disable no-underscore-dangle */
import { ArrowNavigationState, FocusableGroup, FocusableGroupConfig } from '@/types'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import findNextGroupByDirection from './findNextGroupByDirection'

describe('findNextGroupByDirection', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 52
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should return the next group in the direction', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    const group1 = state.groups.get('group-1') as FocusableGroup

    group0Config.nextGroupByDirection = {
      right: group1.id
    }

    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup?.group).toBe(group1)
  })

  it('should return the subsequent group if the next group doesnt have candidates', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    const group1Config = state.groupsConfig.get('group-1') as FocusableGroupConfig
    const group2 = state.groups.get('group-2') as FocusableGroup

    const group1 = state.groups.get('group-1') as FocusableGroup

    group1.elements.forEach(id => {
      state.elements.get(id)?._ref?.setAttribute('disabled', 'true')
    })

    group0Config.nextGroupByDirection = {
      right: group1Config.id
    }

    group1Config.nextGroupByDirection = {
      right: group2.id
    }

    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup?.group).toBe(group2)
  })

  it('should return undefined if the next group doesnt exists', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    group0Config.nextGroupByDirection = {
      right: 'non-existent-group'
    }

    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup).toBeUndefined()
  })

  it('should return undefined if the next group by direction is undefined', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    group0Config.nextGroupByDirection = {
      right: undefined
    }

    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup).toBeUndefined()
  })

  it('should return null if the next group by direction is null', () => {
    const group0Config = state.groupsConfig.get('group-0') as FocusableGroupConfig
    group0Config.nextGroupByDirection = {
      right: null
    }

    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup).toBeNull()
  })

  it('should return undefined if nothing is setted or selected', () => {
    state.currentElement = null
    const nextGroup = findNextGroupByDirection({
      direction: 'right',
      state
    })
    expect(nextGroup).toBeUndefined()
  })
})
