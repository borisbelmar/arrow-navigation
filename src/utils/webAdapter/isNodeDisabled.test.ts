import type { FocusableElement } from '@/types'
import isNodeDisabled from './isNodeDisabled'

describe('isNodeDisabled', () => {
  it('should return true if the element is disabled', () => {
    const element = document.createElement('div')
    element.id = 'element-0'
    element.setAttribute('disabled', '')
    document.body.appendChild(element)

    const focusable = { id: 'element-0' } as FocusableElement

    expect(isNodeDisabled(focusable)).toBe(true)

    document.body.removeChild(element)

    expect(isNodeDisabled(focusable)).toBe(true)
  })
})
