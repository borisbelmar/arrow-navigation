import isElementInDirection from './isElementInDirection'
import getDOMRectMock from '../../../__mocks__/getDOMRect.mock'

describe('isElementInDirection', () => {
  const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
  const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
  const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
  const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

  test('isElementInDirection', () => {
    expect(isElementInDirection('up', rect1, rect2)).toBe(true)
    expect(isElementInDirection('up', rect1, rect4)).toBe(false)
    expect(isElementInDirection('up', rect2, rect3)).toBe(false)
    expect(isElementInDirection('up', rect3, rect4)).toBe(false)
    expect(isElementInDirection('up', rect4, rect1)).toBe(false)
    expect(isElementInDirection('up', rect4, rect2)).toBe(false)
    expect(isElementInDirection('up', rect4, rect3)).toBe(true)
    expect(isElementInDirection('up', rect2, rect1)).toBe(false)

    expect(isElementInDirection('down', rect1, rect2)).toBe(false)
    expect(isElementInDirection('down', rect1, rect4)).toBe(false)
    expect(isElementInDirection('down', rect2, rect3)).toBe(false)
    expect(isElementInDirection('down', rect3, rect4)).toBe(true)
    expect(isElementInDirection('down', rect4, rect1)).toBe(false)
    expect(isElementInDirection('down', rect4, rect2)).toBe(false)
    expect(isElementInDirection('down', rect4, rect3)).toBe(false)
    expect(isElementInDirection('down', rect2, rect1)).toBe(true)

    expect(isElementInDirection('left', rect1, rect2)).toBe(false)
    expect(isElementInDirection('left', rect1, rect4)).toBe(false)
    expect(isElementInDirection('left', rect2, rect3)).toBe(false)
    expect(isElementInDirection('left', rect3, rect4)).toBe(false)
    expect(isElementInDirection('left', rect4, rect1)).toBe(true)
    expect(isElementInDirection('left', rect2, rect1)).toBe(false)
    expect(isElementInDirection('left', rect3, rect2)).toBe(true)
    expect(isElementInDirection('left', rect4, rect2)).toBe(true)

    expect(isElementInDirection('right', rect1, rect2)).toBe(false)
    expect(isElementInDirection('right', rect1, rect4)).toBe(true)
    expect(isElementInDirection('right', rect2, rect3)).toBe(true)
    expect(isElementInDirection('right', rect3, rect4)).toBe(false)
    expect(isElementInDirection('right', rect4, rect1)).toBe(false)
    expect(isElementInDirection('right', rect4, rect2)).toBe(false)
    expect(isElementInDirection('right', rect4, rect3)).toBe(false)
    expect(isElementInDirection('right', rect2, rect1)).toBe(false)
    expect(isElementInDirection('right', rect2, rect4)).toBe(true)
  })
})
