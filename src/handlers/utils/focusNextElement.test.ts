import { ArrowNavigationState, FocusableElement, FocusableGroup, FocusableGroupConfig } from '@/types'
import getViewNavigationStateMock from '../../__mocks__/viewNavigationState.mock'
import focusNextElement from './focusNextElement'

describe('focusNextElement', () => {
  let state: ArrowNavigationState

  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 50
  })

  it('should focus the next element', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextElement({ direction: 'down', state, onChangeCurrentElement: onFocusChange })

    expect(state.currentElement).toBe(currentGroup.elements.get('element-0-1'))
    expect(onFocusChange).toHaveBeenCalledWith(currentGroup.elements.get('element-0-1'), 'down')
  })

  it('should focus the next element with manual next element', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = {
      ...currentGroup.elements.get('element-0-0') as FocusableElement,
      nextElementByDirection: {
        down: currentGroup.elements.get('element-0-2')?.el.id
      }
    }

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextElement({ direction: 'down', state, onChangeCurrentElement: onFocusChange })

    expect(state.currentElement).toBe(currentGroup.elements.get('element-0-2'))
    expect(onFocusChange).toHaveBeenCalledWith(currentGroup.elements.get('element-0-2'), 'down')
  })

  it('should focus nothing with manual null', () => {
    (state.currentElement as FocusableElement).nextElementByDirection = {
      down: null
    }

    const onFocusChange = jest.fn()

    focusNextElement({ direction: 'down', state, onChangeCurrentElement: onFocusChange })

    expect(onFocusChange).not.toHaveBeenCalled()
  })

  it('should focus the next group if arent candidates on current group for given direction', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextElement({ direction: 'right', state, onChangeCurrentElement: onFocusChange })

    expect(state.currentElement).toBe(state.elements.get('element-1-0'))
    expect(onFocusChange).toHaveBeenCalledWith(state.elements.get('element-1-0'), 'right')
  })

  it('should works normally if there no current group config', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement
    state.groupsConfig.delete('group-0')

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextElement({ direction: 'down', state, onChangeCurrentElement: onFocusChange })

    expect(state.currentElement).toBe(state.elements.get('element-0-1'))
    expect(onFocusChange).toHaveBeenCalledWith(state.elements.get('element-0-1'), 'down')
  })

  it('should keep the focus on group if keepFocus is true on currentGroup', () => {
    const currentGroup = state.groups.get('group-0') as FocusableGroup
    const currentGroupConfig = state.groupsConfig.get('group-0') as FocusableGroupConfig
    currentGroupConfig.keepFocus = true
    state.currentElement = currentGroup.elements.get('element-0-0') as FocusableElement

    const onFocusChange = jest.fn(element => {
      state.currentElement = element
    })

    focusNextElement({
      direction: 'right',
      state,
      onChangeCurrentElement: onFocusChange
    })

    expect(state.currentElement).toBe(currentGroup.elements.get('element-0-0'))
    expect(onFocusChange).not.toHaveBeenCalled()
  })
})
