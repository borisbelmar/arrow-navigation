import findClosestGroup from './findClosestGroup'
import viewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types.d'

describe('findClosestGroup', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = viewNavigationStateMock
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should return the closest group in the direction', () => {
    const group0 = state.groups.get('group-0') as FocusableGroup
    const group1 = state.groups.get('group-1') as FocusableGroup

    state.currentElement = group0.elements[0]
    const closestGroup = findClosestGroup({
      direction: 'right',
      currentElement: state.currentElement as FocusableElement,
      candidateGroups: state.groups,
      isViewportSafe: true
    })
    expect(closestGroup).toBe(group1)
  })

  it('should return null if the next candidate is out of viewport if isViewportSafe is true', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    state.currentElement = group.elements[3]

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: state.currentElement as FocusableElement,
      candidateGroups: state.groups,
      isViewportSafe: true
    })
    expect(closestGroup).toBe(null)
  })

  it('should return the closest group if the next candidate is out of viewport if isViewportSafe is false', () => {
    const group1 = state.groups.get('group-0') as FocusableGroup
    const group2 = state.groups.get('group-4') as FocusableGroup

    state.currentElement = group1.elements[3]

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: state.currentElement as FocusableElement,
      candidateGroups: state.groups
    })
    expect(closestGroup).toBe(group2)
  })

  it('should return null if the currentElement is null', () => {
    state.currentElement = null

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: state.currentElement as unknown as FocusableElement,
      candidateGroups: state.groups
    })
    expect(closestGroup).toBe(null)
  })
})
