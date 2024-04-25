import { initArrowNavigation } from '@arrow-navigation/core'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import React, { ReactNode } from 'react'
import { FocusableGroup, useFocusableGroup } from './FocusableGroup'

describe('FocusableGroup', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should render a div', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        id: 'test-group'
      }
    })

    const { container } = render(
      <FocusableGroup id="test-group">
        Test
      </FocusableGroup>
    )

    expect(container.firstChild).toBeInTheDocument()
    expect(container.firstChild?.nodeName).toBe('DIV')
    expect(container.firstElementChild?.id).toBe('test-group')
  })
})

describe('useFocusableGroup', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should throw an error if used without a FocusableGroup', () => {
    const { result } = renderHook(() => useFocusableGroup())

    expect(result.error).toBeDefined()
    expect(result.error?.message).toBe('useFocusableGroup must be used within a FocusableGroup')
  })

  it('should return the group context', () => {
    document.getElementById = jest.fn().mockReturnValueOnce(
      document.createElement('div').id = 'test-group'
    )
    const { result } = renderHook(() => useFocusableGroup(), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <FocusableGroup id="test-group">
          {children}
        </FocusableGroup>
      )
    })

    expect(result.current.registerElement).toBeDefined()
    expect(result.current.unregisterElement).toBeDefined()
  })
})
