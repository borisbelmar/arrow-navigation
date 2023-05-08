import getCurrentElement from '@/utils/getCurrentElement'
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
    state.currentElement = 'element-0-0'

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true
    })
    expect(closestElement).toBe(state.elements.get('element-0-1'))

    state.currentElement = 'element-0-1'

    const closestElement2 = findClosestElementInGroup({
      direction: 'up',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true
    })
    expect(closestElement2).toBe(state.elements.get('element-0-0'))

    const closestElement3 = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      state,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement3).toBe(null)

    const closestElement4 = findClosestElementInGroup({
      state,
      direction: 'left',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      isViewportSafe: true
    })
    expect(closestElement4).toBe(null)
  })

  it('should return null if the next candidate is out of viewport if isViewportSafe is true', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    state.currentElement = 'element-1-2'

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true
    })
    expect(state.elements.get('element-1-3')).not.toBeUndefined()
    expect(closestElement).toBe(null)
  })

  it('should return the closest element in the group for given direction if isViewportSafe is false', () => {
    const group = state.groups.get('group-1') as FocusableGroup
    state.currentElement = 'element-1-2'

    const closestElement = findClosestElementInGroup({
      direction: 'right',
      state,
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements
    })
    expect(state.elements.get('element-1-3')).not.toBeUndefined()
    expect(closestElement).toBe(state.elements.get('element-1-3'))
  })

  it('should return null if the currentElement is null', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    state.currentElement = null

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: state.currentElement as unknown as FocusableElement,
      candidateElements: group.elements,
      state
    })
    expect(closestElement).toBe(null)
  })

  it('should return null if the currentElement is not in the group', () => {
    state.currentElement = 'element-0-0'
    const group = state.groups.get('group-1') as FocusableGroup

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state
    })
    expect(closestElement).toBe(null)
  })

  it('should return the closest element, not matters the direction, with allValidCandidates', () => {
    const group = state.groups.get('group-0') as FocusableGroup
    state.currentElement = 'element-0-0'

    const closestElement = findClosestElementInGroup({
      direction: 'down',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement).toBe(state.elements.get('element-0-1'))

    state.currentElement = 'element-0-1'

    const closestElement2 = findClosestElementInGroup({
      direction: 'up',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement2).toBe(state.elements.get('element-0-0'))

    const closestElement3 = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement3).toBe(state.elements.get('element-0-0'))

    const closestElement4 = findClosestElementInGroup({
      direction: 'left',
      currentFocusElement: getCurrentElement(state) as FocusableElement,
      candidateElements: group.elements,
      state,
      isViewportSafe: true,
      allValidCandidates: true
    })
    expect(closestElement4).toBe(state.elements.get('element-0-0'))
  })

  it('should return the closest element, but not the disabled element', () => {
    const group1 = state.groups.get('group-1') as FocusableGroup

    state.elements.get('element-1-1')?.el.setAttribute('disabled', '')

    const closesElement = findClosestElementInGroup({
      direction: 'right',
      currentFocusElement: state.elements.get('element-1-0') as FocusableElement,
      candidateElements: group1.elements,
      state,
      isViewportSafe: true,
      allValidCandidates: false
    })

    expect(closesElement).toBe(state.elements.get('element-1-2'))
  })
})
