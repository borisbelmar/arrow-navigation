import getCurrentElement from '@/utils/getCurrentElement'
import findClosestGroup from './findClosestGroup'
import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types'
import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'

describe('findClosestGroup', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should return the closest group in the direction', () => {
    const group1 = state.groups.get('group-1') as FocusableGroup

    state.currentElement = 'element-0-0'
    const closestGroup = findClosestGroup({
      direction: 'right',
      currentElement: getCurrentElement(state) as FocusableElement,
      candidateGroups: state.groups,
      isViewportSafe: true,
      state
    })
    expect(closestGroup?.group).toBe(group1)
  })

  it('should return null if the next candidate is out of viewport if isViewportSafe is true', () => {
    state.currentElement = 'element-0-3'

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: getCurrentElement(state) as FocusableElement,
      candidateGroups: state.groups,
      isViewportSafe: true,
      state
    })
    expect(closestGroup).toBe(null)
  })

  it('should return the closest group if the next candidate is out of viewport if isViewportSafe is false', () => {
    const group2 = state.groups.get('group-4') as FocusableGroup

    state.currentElement = 'element-0-3'

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: getCurrentElement(state) as FocusableElement,
      candidateGroups: state.groups,
      state
    })

    expect(closestGroup?.group).toBe(group2)
  })

  it('should return null if the currentElement is null', () => {
    state.currentElement = null

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: state.currentElement as unknown as FocusableElement,
      candidateGroups: state.groups,
      state
    })
    expect(closestGroup).toBe(null)
  })

  it('should return the subsequent best candidate if the next candidate doesnt have focusable elements', () => {
    state.currentElement = 'element-1-0'

    state.groups.get('group-2')?.elements.forEach(id => {
      state.elements.get(id)?.el.setAttribute('disabled', 'true')
    })

    const closestGroup = findClosestGroup({
      direction: 'down',
      currentElement: getCurrentElement(state) as FocusableElement,
      candidateGroups: state.groups,
      state
    })
    expect(closestGroup?.group?.id).toBe('group-3')
  })
})
