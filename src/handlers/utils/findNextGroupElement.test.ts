import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types'
import findNextGroupElement from './findNextGroupElement'

describe('findNextGroupElement', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should return the next group element without options', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const fromElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup

    const element = findNextGroupElement({ fromElement, direction: 'right', state, nextGroup })

    expect(element).toBe(nextGroup.elements.get('element-1-0'))
  })

  it('should return the next group element with manual next group', () => {
    const nextGroup = state.groups.get('group-2') as FocusableGroup
    state.groupsConfig.set('group-0', {
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: nextGroup.el.id
      }
    })
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const fromElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(nextGroup.elements.get('element-2-0'))
  })

  it('should return the next group element with firstElement setted', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-2'
    })
    const nextElement = nextGroup.elements.get('element-1-2')
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
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    })
    nextGroup.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
    const nextElement = nextGroup.elements.get('element-1-1')
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
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    })
    nextGroup.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
    nextGroup.elements.get('element-1-1')?.el.setAttribute('disabled', 'true')
    const nextElement = nextGroup.elements.get('element-1-2')
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
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-0'
    });
    (nextGroup.elements.get('element-1-0') as FocusableElement).nextElementByDirection = {
      right: null
    }
    nextGroup.elements.get('element-1-0')?.el.setAttribute('disabled', 'true')
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
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: null
      }
    })
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const fromElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const element = findNextGroupElement({
      nextGroup: null as unknown as FocusableGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBeNull()
  })

  it('should return closest if next group config is not setted', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const fromElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.delete('group-1')

    const element = findNextGroupElement({
      nextGroup,
      fromElement,
      direction: 'right',
      state
    })

    expect(element).toBe(nextGroup.elements.get('element-1-0'))
  })
})
