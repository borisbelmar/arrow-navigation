import { FocusableElement } from '@/types'
import getNodeRef from './getNodeRef'

describe('getNodeRef', () => {
  it('should return the element', () => {
    const element = document.createElement('div')
    element.id = 'element-0'
    document.body.appendChild(element)

    const focusable = { id: 'element-0' } as FocusableElement

    expect(getNodeRef(focusable)).toBe(element)

    document.body.removeChild(element)

    expect(getNodeRef(focusable)).toBe(null)
  })
})
