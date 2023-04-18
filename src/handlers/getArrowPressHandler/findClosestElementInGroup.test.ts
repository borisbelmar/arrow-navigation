import viewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types.d'
import findClosestElementInGroup from './findClosestElementInGroup'

describe('findClosestElementInGroup', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = viewNavigationStateMock
    window.innerWidth = 50
    window.innerHeight = 52
  })

  it('should return the closest element in the group for given direction', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    state.currentElement = group.elements[0]

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement).toBe(group.elements[1])

    state.currentElement = group.elements[1]

    const closestElement2 = findClosestElementInGroup({
      direction: 'up',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement2).toBe(group.elements[0])

    const closestElement3 = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement3).toBe(null)

    const closestElement4 = findClosestElementInGroup({
      direction: 'left',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement4).toBe(null)
  })

  it('should return null if the next candidate is out of viewport if isViewportSafe is true', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    state.currentElement = group.elements[2]

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(group.elements[3]).not.toBeUndefined()
    expect(closestElement).toBe(null)
  })

  it('should return the closest element in the group for given direction if isViewportSafe is false', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    state.currentElement = group.elements[2]

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: group.elements
    })
    expect(group.elements[3]).not.toBeUndefined()
    expect(closestElement).toBe(group.elements[3])
  })
})
