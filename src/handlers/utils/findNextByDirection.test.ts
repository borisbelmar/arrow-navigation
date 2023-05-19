/* eslint-disable no-underscore-dangle */
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup, FocusableGroupConfig } from '@/types'
import findNextByDirection from './findNextByDirection'

describe('findNextByDirection', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
  })

  it('should return the next element setted at direction', () => {
    const nextElement = state.elements.get('element-0-1') as FocusableElement
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: nextElement.id
      }
    })
    const element = state.elements.get('element-0-0') as FocusableElement
    const next = findNextByDirection({
      direction: 'right',
      fromElement: element,
      state
    })
    expect(next).toBe(nextElement)
  })

  it('should return the next element from the group setted at direction', () => {
    const nextElement = state.elements.get('element-1-0') as FocusableElement
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        down: {
          id: 'group-1',
          kind: 'group'
        }
      }
    })
    const next = findNextByDirection({
      direction: 'down',
      fromElement: state.elements.get('element-0-0') as FocusableElement,
      state
    })
    expect(next).toBe(nextElement)
  })

  it('should return null if the next element is setted null', () => {
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: null
      }
    })
    const next = findNextByDirection({
      direction: 'right',
      fromElement: state.elements.get('element-0-0') as FocusableElement,
      state
    })
    expect(next).toBe(null)
  })

  it('should return the subsequent element if the next element is disabled', () => {
    const nextElement = state.elements.get('element-0-1') as FocusableElement
    const subsequentElement = state.elements.get('element-0-2') as FocusableElement
    nextElement._ref?.setAttribute('disabled', 'true')
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: nextElement.id
      }
    })
    state.elements.set('element-0-1', {
      ...state.elements.get('element-0-1') as FocusableElement,
      nextByDirection: {
        right: subsequentElement.id
      }
    })
    const element = state.elements.get('element-0-0') as FocusableElement
    const next = findNextByDirection({
      direction: 'right',
      fromElement: element,
      state
    })
    expect(next).toBe(subsequentElement)
  })

  it('should return the subsequent group if the next group doesnt have valid candidates', () => {
    const subsequentGroup = state.groups.get('group-2') as FocusableGroup
    const nextGroup = state.groups.get('group-1') as FocusableGroup

    nextGroup.elements.forEach(id => {
      state.elements.get(id)?._ref?.setAttribute('disabled', 'true')
    })

    state.elements.set('element-0-0', {
      ...state.groupsConfig.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: {
          id: 'group-1',
          kind: 'group'
        }
      }
    })

    state.groupsConfig.set('group-1', {
      ...state.groupsConfig.get('group-1') as FocusableGroup,
      nextGroupByDirection: {
        right: subsequentGroup.id
      }
    })

    state.groupsConfig.set('group-2', {
      ...state.groupsConfig.get('group-2') as FocusableGroup,
      firstElement: 'element-2-0'
    })

    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })

    expect(next).toBe(state.elements.get('element-2-0'))
    expect(next?.group).toBe(subsequentGroup.id)
  })

  it('should return undefined if the next group doesnt exists', () => {
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: {
          id: 'non-existent-group',
          kind: 'group'
        }
      }
    })

    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })

    expect(next).toBe(undefined)
  })

  it('should return undefined if nextByDirection is undefined', () => {
    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })

    expect(next).toBe(undefined)
  })

  it('should return undefined if subsequent group doesnt exists', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup

    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: {
          id: nextGroup.id,
          kind: 'group'
        }
      }
    })

    nextGroup.elements.forEach(id => {
      state.elements.get(id)?._ref?.setAttribute('disabled', 'true')
    })

    state.groupsConfig.set('group-1', {
      ...state.groupsConfig.get('group-1') as FocusableGroupConfig,
      nextGroupByDirection: {
        right: 'non-existent-group'
      }
    })

    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })

    expect(next).toBe(undefined)
  })

  it('should return the next element in order with byOrder is setted on group', () => {
    state.groupsConfig.set('group-0', {
      ...state.groupsConfig.get('group-0') as FocusableGroupConfig,
      byOrder: 'vertical'
    })
    let count = 0
    state.groups.get('group-0')?.elements.forEach(id => {
      state.elements.set(`group-0-${count}`, {
        ...state.elements.get(id) as FocusableElement,
        order: count
      })
      count += 1
    })
    const next = findNextByDirection({
      direction: 'down',
      state,
      fromElement: state.elements.get('group-0-0') as FocusableElement
    })
    expect(next).toBe(state.elements.get('group-0-1'))
  })

  it('should return null if the next element id is null', () => {
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: {
          id: null,
          kind: 'element'
        }
      }
    })
    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })
    expect(next).toBe(null)
  })

  it('should return undefined if the next element id is undefined', () => {
    state.elements.set('element-0-0', {
      ...state.elements.get('element-0-0') as FocusableElement,
      nextByDirection: {
        right: {
          id: undefined,
          kind: 'element'
        }
      }
    })
    const next = findNextByDirection({
      direction: 'right',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })
    expect(next).toBe(undefined)
  })
})
