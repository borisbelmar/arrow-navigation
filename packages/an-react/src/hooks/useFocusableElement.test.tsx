import { getArrowNavigation, initArrowNavigation } from '@arrow-navigation/core'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { FocusableGroup } from '..'
import useFocusableElement from './useFocusableElement'

describe('useFocusableElement', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should throw an error if used without a FocusableGroup', () => {
    const id = 'test-group'
    const group = document.createElement('div')
    group.id = id
    document.body.appendChild(group)
    const { result } = renderHook(() => useFocusableElement({ id }))

    expect(result.error).toBeDefined()
    expect(result.error?.message).toBe('useFocusableGroup must be used within a FocusableGroup')
  })

  it('should register and unregister an element based on mount and dismount', () => {
    const id = 'test-element'
    const element = document.createElement('button')
    element.id = id
    document.body.appendChild(element)

    const { result } = renderHook(() => useFocusableElement({ id }), {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <FocusableGroup id="test-group">
          {children}
        </FocusableGroup>
      )
    })

    expect(result.current).toBeUndefined()
  })

  it('should update element options', () => {
    const id = 'test-element'
    const element = document.createElement('button')
    element.id = id
    document.body.appendChild(element)

    const api = getArrowNavigation()

    jest.spyOn(api, 'updateElement')
    jest.spyOn(api, 'registerElement')

    const hook = renderHook(({ elementId, nextDown }) => useFocusableElement({
      id: elementId,
      nextDown
    }), {
      wrapper: ({ children }: {
        children?: React.ReactNode,
        elementId: string,
        nextDown: string
      }) => (
        <FocusableGroup id="test-group">
          {children}
        </FocusableGroup>
      ),
      initialProps: { elementId: id, nextDown: 'test' }
    })

    expect(api.updateElement).not.toHaveBeenCalled()
    expect(api.registerElement).toHaveBeenCalled()

    hook.rerender({ elementId: id, nextDown: 'test-2' })

    expect(api.updateElement).toHaveBeenCalled()
  })
})
