import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types'
import findClosestElementInGroup from './findClosestElementInGroup'
import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'

describe('findClosestElementInGroup', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 52
  })

  it('should return the closest element in the group for given direction', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    const arrayGroup = Array.from(group.elements.values())
    state.currentElement = group.elements.get('element-0-0') as FocusableElement

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true
    })
    expect(closestElement).toBe(group.elements.get('element-0-1'))

    state.currentElement = group.elements.get('element-0-1') as FocusableElement

    const closestElement2 = findClosestElementInGroup({
      direction: 'up',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true
    })
    expect(closestElement2).toBe(group.elements.get('element-0-0'))

    const closestElement3 = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true
    })
    expect(closestElement3).toBe(null)

    const closestElement4 = findClosestElementInGroup({
      direction: 'left',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true
    })
    expect(closestElement4).toBe(null)
  })

  it('should return null if the next candidate is out of viewport if isViewportSafe is true', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    const arrayGroup = Array.from(group.elements.values())
    state.currentElement = group.elements.get('element-1-2') as FocusableElement

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true
    })
    expect(group.elements.get('element-1-3')).not.toBeUndefined()
    expect(closestElement).toBe(null)
  })

  it('should return the closest element in the group for given direction if isViewportSafe is false', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    const arrayGroup = Array.from(group.elements.values())
    state.currentElement = group.elements.get('element-1-2') as FocusableElement

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup
    })
    expect(group.elements.get('element-1-3')).not.toBeUndefined()
    expect(closestElement).toBe(group.elements.get('element-1-3'))
  })

  it('should return null if the currentElement is null', () => {
    state.currentElement = null

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as unknown as FocusableElement,
      candidateElements: Array.from((state.groups.get('group-0') as FocusableGroup).elements.values())
    })
    expect(closestElement).toBe(null)
  })

  it('should return null if the currentElement is not in the group', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    state.currentElement = group.elements.get('element-0-0') as FocusableElement

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as unknown as FocusableElement,
      candidateElements: Array.from((state.groups.get('group-1') as FocusableGroup).elements.values())
    })
    expect(closestElement).toBe(null)
  })

  it('should return the closest element, not matters the direction, with allValidCandidates', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    const arrayGroup = Array.from(group.elements.values())
    state.currentElement = group.elements.get('element-0-0') as FocusableElement

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement).toBe(group.elements.get('element-0-1'))

    state.currentElement = group.elements.get('element-0-1') as FocusableElement

    const closestElement2 = findClosestElementInGroup({
      direction: 'up',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement2).toBe(group.elements.get('element-0-0'))

    const closestElement3 = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement3).toBe(group.elements.get('element-0-0'))

    const closestElement4 = findClosestElementInGroup({
      direction: 'left',
      currentFocusElement: state.currentElement as FocusableElement,
      candidateElements: arrayGroup,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement4).toBe(group.elements.get('element-0-0'))
  })

  it('should return the closest element, but not the disabled element', () => {
    const group1 = state.groups.get('group-1') as FocusableGroup

    group1.elements.get('element-1-1')?.el.setAttribute('disabled', '')

    const closesElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: group1.elements.get('element-1-0') as FocusableElement,
      candidateElements: Array.from(group1.elements.values()),
      isViewportSafe: true,
      allValidCandidates: false
    })

    expect(closesElement).toBe(group1.elements.get('element-1-2'))
  })
})
