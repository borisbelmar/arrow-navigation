import { isXAxisIntersecting, isYAxisIntersecting } from './isIntersecting'
import getDOMRectMock from '../../../../__mocks__/getDOMRect.mock'

describe('Rectangular Intersection Functions', () => {
  test('isXAxisIntersecting without threshold', () => {
    const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
    const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
    const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
    const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

    expect(isXAxisIntersecting(rect1, rect2)).toBe(false)
    expect(isXAxisIntersecting(rect1, rect4)).toBe(true)
    expect(isXAxisIntersecting(rect2, rect3)).toBe(true)
    expect(isXAxisIntersecting(rect3, rect4)).toBe(false)
    expect(isXAxisIntersecting(rect4, rect1)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect2)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect3)).toBe(false)
    expect(isXAxisIntersecting(rect2, rect1)).toBe(false)
  })

  test('isYAxisIntersecting without threshold', () => {
    const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
    const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
    const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
    const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

    expect(isYAxisIntersecting(rect1, rect2)).toBe(true)
    expect(isYAxisIntersecting(rect1, rect4)).toBe(false)
    expect(isYAxisIntersecting(rect2, rect3)).toBe(false)
    expect(isYAxisIntersecting(rect3, rect4)).toBe(true)
    expect(isYAxisIntersecting(rect4, rect1)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect2)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect3)).toBe(true)
    expect(isYAxisIntersecting(rect2, rect1)).toBe(true)

    const rectA = getDOMRectMock(0, 0, 16, 52) as DOMRect
    const rectB = getDOMRectMock(16, 36, 52, 16) as DOMRect
    expect(isYAxisIntersecting(rectA, rectB)).toBe(true)
  })

  test('isXAxisIntersecting with threshold', () => {
    const rect1 = getDOMRectMock(0, 0, 10, 10) as DOMRect
    const rect2 = getDOMRectMock(12, 12, 10, 10) as DOMRect
    const rect3 = getDOMRectMock(25, 0, 10, 10) as DOMRect
    const rect4 = getDOMRectMock(0, 24, 10, 10) as DOMRect
    const rect5 = getDOMRectMock(12, 36, 10, 10) as DOMRect
    const rect6 = getDOMRectMock(25, 24, 10, 10) as DOMRect
    const threshold = 3

    expect(isXAxisIntersecting(rect1, rect2, threshold)).toBe(true)
    expect(isXAxisIntersecting(rect1, rect3, threshold)).toBe(true)
    expect(isXAxisIntersecting(rect1, rect4, threshold)).toBe(false)
    expect(isXAxisIntersecting(rect4, rect5, threshold)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect6, threshold)).toBe(true)
    expect(isXAxisIntersecting(rect4, rect3, threshold)).toBe(false)
    expect(isXAxisIntersecting(rect4, rect2, threshold)).toBe(true)
  })

  test('isYAxisIntersecting with threshold', () => {
    const rect1 = getDOMRectMock(0, 0, 10, 10) as DOMRect
    const rect2 = getDOMRectMock(12, 12, 10, 10) as DOMRect
    const rect3 = getDOMRectMock(25, 0, 10, 10) as DOMRect
    const rect4 = getDOMRectMock(0, 24, 10, 10) as DOMRect
    const rect5 = getDOMRectMock(12, 36, 10, 10) as DOMRect
    const rect6 = getDOMRectMock(25, 24, 10, 10) as DOMRect
    const threshold = 3

    expect(isYAxisIntersecting(rect1, rect2, threshold)).toBe(true)
    expect(isYAxisIntersecting(rect1, rect3, threshold)).toBe(false)
    expect(isYAxisIntersecting(rect1, rect4, threshold)).toBe(true)
    expect(isYAxisIntersecting(rect4, rect5, threshold)).toBe(true)
    expect(isYAxisIntersecting(rect4, rect6, threshold)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect3, threshold)).toBe(false)
    expect(isYAxisIntersecting(rect4, rect2, threshold)).toBe(true)
  })
})
