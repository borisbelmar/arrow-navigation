import getCurrentElement from '@/utils/getCurrentElement'
import getViewNavigationStateMock from '@/__mocks__/viewNavigationState.mock'
import type { ArrowNavigationState, FocusableElement, FocusableGroupConfig } from '@/types'
import findNextElement from './findNextElement'

describe('findNextElement', () => {
  let state: ArrowNavigationState
  beforeEach(() => {
    state = getViewNavigationStateMock()
    window.innerWidth = 50
    window.innerHeight = 52
  })

  it('should return the subsequent element if the next element is disabled', () => {
    const element = state.elements.get('element-0-0') as FocusableElement

    state.elements.get('element-0-1')?.el.setAttribute('disabled', 'true')

    element.nextElementByDirection = {
      down: 'element-0-1'
    }

    const nextElement = findNextElement({
      direction: 'down',
      fromElement: getCurrentElement(state) as FocusableElement,
      state,
      inGroup: true
    })

    expect(nextElement).toBe(state.elements.get('element-0-2'))

    state.elements.get('element-0-2')?.el.setAttribute('disabled', 'true')

    const nextElement2 = findNextElement({
      direction: 'down',
      fromElement: getCurrentElement(state) as FocusableElement,
      state,
      inGroup: true
    })

    expect(nextElement2).toBe(state.elements.get('element-0-3'))
  })

  it('should return the nearest element if the next element doesnt exists', () => {
    const element = state.elements.get('element-0-0') as FocusableElement

    state.groups.get('group-0')?.elements.delete('element-0-1')
    state.elements.delete('element-0-1')

    element.nextElementByDirection = {
      down: 'element-0-1'
    }

    const nextElement = findNextElement({
      direction: 'down',
      fromElement: getCurrentElement(state) as FocusableElement,
      state,
      inGroup: true
    })

    expect(nextElement).toBe(state.elements.get('element-0-2'))
  })

  it('should return the next group element if setted a group with nextByDirection', () => {
    const element = state.elements.get('element-0-0') as FocusableElement

    element.nextByDirection = {
      down: {
        id: 'group-1',
        kind: 'group'
      }
    }

    const nextElement = findNextElement({
      direction: 'down',
      fromElement: getCurrentElement(state) as FocusableElement,
      state,
      inGroup: true
    })

    expect(nextElement).toBe(state.elements.get('element-1-0'))
  })

  it('should return null if the next element is setted null', () => {
    const element = state.elements.get('element-0-0') as FocusableElement

    element.nextByDirection = {
      down: null
    }

    const nextElement = findNextElement({
      direction: 'down',
      fromElement: getCurrentElement(state) as FocusableElement,
      state,
      inGroup: true
    })

    expect(nextElement).toBe(null)
  })

  it('should return the next element in order with byOrder is setted on group', () => {
    state.groupsConfig.set('group-0', {
      ...state.groupsConfig.get('group-0') as FocusableGroupConfig,
      byOrder: 'vertical'
    })
    let count = 0
    state.groups.get('group-0')?.elements.forEach(id => {
      (state.elements.get(id) as FocusableElement).order = count
      count += 1
    })
    const next = findNextElement({
      direction: 'down',
      state,
      fromElement: state.elements.get('element-0-0') as FocusableElement
    })
    expect(next).toBe(state.elements.get('element-0-1'))
  })
})
