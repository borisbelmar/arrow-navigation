import { isXAxisIntersecting, isYAxisIntersecting } from './isIntersecting'
import getDOMRectMock from '../__mocks__/getDOMRect.mock'

describe('Rectangular Intersection Functions', () => {
  const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
  const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
  const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
  const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

  test('isXAxisIntersecting', () => {
    expect(isXAxisIntersecting(rect1, rect2)).toBe(false)
    expect(isXAxisIntersecting(rect1, rect4)).toBe(true)
    expect(isXAxisIntersecting(rect2, rect3)).toBe(true)
    expect(isXAxisIntersecting(rect3, rect4)).toBe(false)
    expect(isXAxisIntersecting(rect4, rect1)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect2)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect3)).toBe(false)
    expect(isXAxisIntersecting(rect2, rect1)).toBe(false)
  })

  test('isYAxisIntersecting', () => {
    expect(isYAxisIntersecting(rect1, rect2)).toBe(true)
    expect(isYAxisIntersecting(rect1, rect4)).toBe(false)
    expect(isYAxisIntersecting(rect2, rect3)).toBe(false)
    expect(isYAxisIntersecting(rect3, rect4)).toBe(true)
    expect(isYAxisIntersecting(rect4, rect1)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect2)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect3)).toBe(true)
    expect(isYAxisIntersecting(rect2, rect1)).toBe(true)
  })
})
