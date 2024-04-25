/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchNextGroup from './useWatchNextGroup'

describe('useWatchNextGroup', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last group is reached', () => {
    const { result } = renderHook(() => useWatchNextGroup())

    expect(result.current.nextGroup).toBeNull()
    expect(result.current.direction).toBeUndefined()

    const api = getArrowNavigation()

    const group1 = document.createElement('div')
    group1.id = 'test-group-1'
    document.body.appendChild(group1)
    api.registerGroup(group1.id, { nextGroupByDirection: { right: 'test-group-2' } })

    const group2 = document.createElement('div')
    group2.id = 'test-group-2'
    document.body.appendChild(group2)
    api.registerGroup(group2.id, { nextGroupByDirection: { left: 'test-group-1', right: 'test-group-3' } })

    const group3 = document.createElement('div')
    group3.id = 'test-group-3'
    document.body.appendChild(group3)
    api.registerGroup(group3.id, { nextGroupByDirection: { left: 'test-group-2' } })

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    group1.appendChild(element1)
    api.registerElement(element1.id, group1.id, { nextByDirection: { right: 'test-2' } })
    api.setFocusElement(element1.id)

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    group2.appendChild(element2)
    api.registerElement(element2.id, group2.id, { nextByDirection: { left: 'test-1', right: 'test-3' } })

    const element3 = document.createElement('button')
    element3.id = 'test-3'
    group3.appendChild(element3)
    api.registerElement(element3.id, group3.id, { nextByDirection: { left: 'test-2' } })

    expect(result.current.nextGroup).toBeNull()

    api._forceNavigate('ArrowRight')

    expect(result.current.nextGroup).toBe('test-group-3')

    api._forceNavigate('ArrowLeft')

    expect(result.current.nextGroup).toBeNull()

    api._forceNavigate('ArrowRight')

    expect(result.current.nextGroup).toBe('test-group-3')
  })
})
