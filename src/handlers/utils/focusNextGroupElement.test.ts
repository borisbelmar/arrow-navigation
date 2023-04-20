import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import { ArrowNavigationState, FocusableElement, FocusableGroup } from '../../types.d'
import focusNextGroupElement from './focusNextGroupElement'

describe('focusNextGroupElement', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should focus the next group element without options', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextGroupElement({ direction: 'right', state, onChangeCurrentElement: onFocusChange, arrowNavigationEvents: {} })

    expect(state.currentElement).toBe(nextGroup.elements.get('element-1-0'))
    expect(onFocusChange).toHaveBeenCalledWith(nextGroup.elements.get('element-1-0'))
  })

  it('should focus the next group element with manual next group', () => {
    const nextGroup = state.groups.get('group-2') as FocusableGroup
    state.groupsConfig.set('group-0', {
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: nextGroup.el.id
      }
    })
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextGroupElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange,
      arrowNavigationEvents: {}
    })

    expect(state.currentElement).toBe(nextGroup.elements.get('element-2-0'))
    expect(onFocusChange).toHaveBeenCalledWith(nextGroup.elements.get('element-2-0'))
  })

  it('should focus the next group element with firstElement setted', () => {
    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.set('group-1', {
      el: nextGroup.el as HTMLElement,
      firstElement: 'element-1-2'
    })
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextGroupElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange,
      arrowNavigationEvents: {}
    })

    expect(state.currentElement).toBe(nextGroup.elements.get('element-1-2'))
    expect(onFocusChange).toHaveBeenCalledWith(nextGroup.elements.get('element-1-2'))
  })

  it('should focus nothing if the currentGroup doesnt exists', () => {
    state.currentElement = {
      el: document.createElement('div'),
      group: 'non-existing-group'
    }
    const onFocusChange = jest.fn()

    focusNextGroupElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange,
      arrowNavigationEvents: {}
    })

    expect(onFocusChange).not.toHaveBeenCalled()
  })

  it('should focus nothing if the manual setted next group is null', () => {
    state.groupsConfig.set('group-0', {
      el: state.groups.get('group-0')?.el as HTMLElement,
      nextGroupByDirection: {
        right: null
      }
    })
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn()

    focusNextGroupElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange,
      arrowNavigationEvents: {}
    })

    expect(onFocusChange).not.toHaveBeenCalled()
  })

  it('should focus closest if next group config is not setted', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const nextGroup = state.groups.get('group-1') as FocusableGroup
    state.groupsConfig.delete('group-1')

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextGroupElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange,
      arrowNavigationEvents: {}
    })

    expect(state.currentElement).toBe(nextGroup.elements.get('element-1-0'))
    expect(onFocusChange).toHaveBeenCalledWith(nextGroup.elements.get('element-1-0'))
  })
})
