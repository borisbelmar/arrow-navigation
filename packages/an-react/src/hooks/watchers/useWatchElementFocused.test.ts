/* eslint-disable no-underscore-dangle */
import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import useWatchElementFocused from './useWatchElementFocused'

describe('useWatchElementFocused', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should return correct state', () => {
    const api = getArrowNavigation()
    const element1 = document.createElement('button')
    element1.id = 'test-1'
    document.body.appendChild(element1)
    api.registerElement(element1.id, 'test-group', { nextByDirection: { right: 'test-2' } })
    api.setFocusElement(element1.id)

    const element2 = document.createElement('button')
    element2.id = 'test-2'
    document.body.appendChild(element2)
    api.registerElement(element2.id, 'test-group', { nextByDirection: { left: 'test-1' } })

    const { result } = renderHook(() => useWatchElementFocused('test-1'))

    expect(result.current).toBe(true)

    api._forceNavigate('ArrowRight')

    expect(result.current).toBe(false)

    api._forceNavigate('ArrowLeft')

    expect(result.current).toBe(true)
  })
})
