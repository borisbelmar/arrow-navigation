import getFocusedNode from './getFocusedNode'

describe('getFocusedNode', () => {
  it('should return the focused element', () => {
    const element = document.createElement('button')
    element.id = 'element-0'
    document.body.appendChild(element)
    element.focus()

    expect(getFocusedNode()).toBe(element)

    document.body.removeChild(element)
  })
})
