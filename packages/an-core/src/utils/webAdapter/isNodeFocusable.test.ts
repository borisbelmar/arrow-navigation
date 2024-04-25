import { FocusableElement } from '@/types'
import isNodeFocusable from './isNodeFocusable'

describe('isNodeFocusable', () => {
  it('should return true if the element is focusable', () => {
    const elementDiv = document.createElement('div')
    elementDiv.id = 'element-0'
    document.body.appendChild(elementDiv)

    const notFocusable = { id: 'element-0' } as FocusableElement

    expect(isNodeFocusable(notFocusable)).toBe(false)

    const elementInput = document.createElement('input')
    elementInput.id = 'element-1'
    document.body.appendChild(elementInput)

    const focusableInput = { id: 'element-1' } as FocusableElement

    expect(isNodeFocusable(focusableInput)).toBe(true)

    const elementButton = document.createElement('button')
    elementButton.id = 'element-2'
    document.body.appendChild(elementButton)

    const focusableButton = { id: 'element-2' } as FocusableElement

    expect(isNodeFocusable(focusableButton)).toBe(true)

    const elementA = document.createElement('a')
    elementA.id = 'element-3'
    document.body.appendChild(elementA)

    const focusableA = { id: 'element-3' } as FocusableElement

    expect(isNodeFocusable(focusableA)).toBe(true)

    const elementSelect = document.createElement('select')
    elementSelect.id = 'element-4'
    document.body.appendChild(elementSelect)

    const focusableSelect = { id: 'element-4' } as FocusableElement

    expect(isNodeFocusable(focusableSelect)).toBe(true)

    const elementTextarea = document.createElement('textarea')
    elementTextarea.id = 'element-5'
    document.body.appendChild(elementTextarea)

    const focusableTextarea = { id: 'element-5' } as FocusableElement

    expect(isNodeFocusable(focusableTextarea)).toBe(true)

    const elementContenteditable = document.createElement('div')
    elementContenteditable.id = 'element-6'
    elementContenteditable.setAttribute('contenteditable', '')

    document.body.appendChild(elementContenteditable)

    const focusableContenteditable = { id: 'element-6' } as FocusableElement

    expect(isNodeFocusable(focusableContenteditable)).toBe(true)

    const elementTabindex = document.createElement('div')
    elementTabindex.id = 'element-7'
    elementTabindex.setAttribute('tabindex', '0')

    document.body.appendChild(elementTabindex)

    const focusableTabindex = { id: 'element-7' } as FocusableElement

    expect(isNodeFocusable(focusableTabindex)).toBe(true)

    const elementTabindexMinusOne = document.createElement('div')
    elementTabindexMinusOne.id = 'element-8'
    document.body.appendChild(elementTabindexMinusOne)

    const focusableTabindexMinusOne = { id: 'element-8' } as FocusableElement

    expect(isNodeFocusable(focusableTabindexMinusOne)).toBe(false)

    document.body.removeChild(elementInput)

    expect(isNodeFocusable(focusableInput)).toBe(false)
  })
})
