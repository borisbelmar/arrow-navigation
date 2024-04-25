/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useListenLastGroupReached from './useListenLastGroupReached'

describe('useListenLastGroupReached', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should execute callback when last group is reached', () => {
    const cb = jest.fn()
    const { result } = renderHook(() => useListenLastGroupReached(cb, 'right'))

    expect(result.current).toBeUndefined()

    const api = getArrowNavigation()

    const group1 = document.createElement('div')
    group1.id = 'test-group-1'
    document.body.appendChild(group1)
    api.registerGroup(group1.id, { nextGroupByDirection: { right: 'test-group-2' } })

    const group2 = document.createElement('div')
    group2.id = 'test-group-2'
    document.body.appendChild(group2)
    api.registerGroup(group2.id, { nextGroupByDirection: { left: 'test-group-1' } })

    const element1 = document.createElement('button')
    element1.id = 'test-1'
    group1.appendChild(element1)
    api.registerElement(element1.id, 'test-group-1', { nextByDirection: { right: 'test-2' } })
    api.setFocusElement(element1.id)

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    group2.appendChild(element2)
    api.registerElement(element2.id, 'test-group-2', { nextByDirection: { left: 'test-1' } })

    expect(cb).toHaveBeenCalledTimes(0)

    api._forceNavigate('ArrowRight')

    expect(cb).toHaveBeenCalledTimes(1)

    api._forceNavigate('ArrowLeft')
  })
})
