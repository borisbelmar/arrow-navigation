import { initArrowNavigation } from '@arrow-navigation/core'
import { render } from '@testing-library/react'
import React from 'react'
import FocusableElement from './FocusableElement'
import { FocusableGroup } from './FocusableGroup/FocusableGroup'

describe('FocusableElement', () => {
  window.console.error = jest.fn()
  window.console.warn = jest.fn()

  beforeEach(() => {
    initArrowNavigation({ debug: true })
  })

  it('should render a button', () => {
    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        id: 'test-group'
      }
    })

    jest.spyOn(React, 'useRef').mockReturnValueOnce({
      current: {
        id: 'test-element'
      }
    })

    const { container } = render(
      <FocusableGroup id="test-group">
        <FocusableElement id="test-element">
          Test
        </FocusableElement>
      </FocusableGroup>
    )

    expect(container.firstChild?.firstChild).toBeInTheDocument()
    expect(container.firstChild?.firstChild?.nodeName).toBe('BUTTON')
  })
})
