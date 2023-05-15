import type { FocusableElement } from '@/types'
import focusNode from './focusNode'

describe('focusNode', () => {
  it('should focus the element', () => {
    const element = document.createElement('div')
    element.id = 'element-0'
    document.body.appendChild(element)
    element.focus = jest.fn()

    const focusable = { id: 'element-0' } as FocusableElement

    focusNode(focusable)

    expect(element.focus).toBeCalledTimes(1)

    focusNode(focusable, { preventScroll: true })

    expect(element.focus).toBeCalledTimes(2)
    expect(element.focus).toBeCalledWith({ preventScroll: true })

    document.body.removeChild(element)

    focusNode(focusable)

    expect(element.focus).toBeCalledTimes(2)
  })
})
