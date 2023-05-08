import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup, FocusableGroupConfig } from '../../types'
import findNextGroupElement from './findNextGroupElement'

describe('findNextGroupElement', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should return the next group element without options', () => {
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup

    const element = findNextGroupElement({ fromElement, direction: 'right', state, nextGroup })

    expect(element).toBe(state.elements.get('element-1-0'))
  })

  it('should return the next group element with manual next group', () => {
    const nextGroup = state.groups.get('group-2') as FocusableGroup
    state.groupsConfig.set('group-0', {
      id: 'group-0',
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: nextGroup.id
      }
    })
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(state.elements.get('element-2-0'))
  })

  it('should return the next group element with firstElement setted', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      id: 'group-1',
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-2'
    })
    const nextElement = state.elements.get('element-1-2')
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(nextElement)
  })

  it('should return the next group element if first is disabled but have other candidate', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      id: 'group-1',
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    })
    state.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
    const nextElement = state.elements.get('element-1-1')
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(nextElement)
  })

  it('should return the next group element if first is disabled but have other subsequent candidate', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      id: 'group-1',
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    })
    state.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
    state.elements.get('element-1-1')?.el.setAttribute('disabled', 'true')
    const nextElement = state.elements.get('element-1-2')
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(nextElement)
  })

  it('should return null if the firstElement is disabled and have setted null candidate on direction (Last at his direction)', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      id: 'group-1',
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    });
    (state.elements.get('element-1-0') as FocusableElement).nextElementByDirection = {
      right: null
    }
    state.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(null)
  })

  it('should return null if the currentGroup doesnt exists', () => {
    const fromElement = {
      id: 'non-existing',
      el: document.createElement('div'),
      group: 'non-existing-group'
    }

    const element = findNextGroupElement({
      nextGroup: null as unknown as FocusableGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBeNull()
  })

  it('should return null if the manual setted next group is null', () => {
    state.groupsConfig.set('group-0', {
      id: 'group-0',
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: null
      }
    })
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup: null as unknown as FocusableGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBeNull()
  })

  it('should return closest if next group config is not setted', () => {
    const fromElement = state.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.delete('group-1')

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(state.elements.get('element-1-0'))
  })

  it('should return the lastElement if saveLast is true and has lastElement', () => {
    const nextGroupConfig = state.groupsConfig.get('group-1') as FocusableGroupConfig
    nextGroupConfig.saveLast = true
    nextGroupConfig.lastElement = 'element-1-2'

    const prevElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup: state.groups.get('group-1') as FocusableGroup,
      fromElement: prevElement,
      direction: 'right',
      state
    })

    expect(element).toBe(state.elements.get('element-1-2'))
  })

  it('should mot return the lastElement if saveLast is false and has lastElement', () => {
    const nextGroupConfig = state.groupsConfig.get('group-1') as FocusableGroupConfig
    nextGroupConfig.saveLast = false
    nextGroupConfig.lastElement = 'element-1-2'

    const prevElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup: state.groups.get('group-1') as FocusableGroup,
      fromElement: prevElement,
      direction: 'right',
      state
    })

    expect(element).toBe(state.elements.get('element-1-0'))
  })

  it('should return the firstElement if setted and lastElement is not setted', () => {
    const nextGroupConfig = state.groupsConfig.get('group-1') as FocusableGroupConfig
    nextGroupConfig.firstElement = 'element-1-2'

    const prevElement = state.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup: state.groups.get('group-1') as FocusableGroup,
      fromElement: prevElement,
      direction: 'right',
      state
    })

    expect(element).toBe(state.elements.get('element-1-2'))
  })
})
