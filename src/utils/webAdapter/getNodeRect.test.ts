import { Focusable } from '@/types'
import getNodeRect from './getNodeRect'

describe('getNodeRect', () => {
  it('should return the element rect', () => {
    const element = document.createElement('div')
    element.id = 'element-0'
    const settedRect = {
      x: 20,
      y: 10,
      width: 100,
      height: 200,
      top: 10,
      right: 120,
      bottom: 210,
      left: 20
    }
    element.getBoundingClientRect = jest.fn(() => settedRect as DOMRect)

    document.body.appendChild(element)

    const focusable = { id: 'element-0' } as Focusable

    const rect = getNodeRect(focusable)

    expect(rect).toEqual(settedRect)

    document.body.removeChild(element)

    const rect2 = getNodeRect(focusable)

    expect(rect2).toEqual({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    })
  })
})
