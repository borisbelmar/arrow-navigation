import getDOMRectMock from '../../../../__mocks__/getDOMRect.mock'
import isElementPartiallyInViewport from './isElementPartiallyInViewport'

describe('isElementPartiallyInViewport', () => {
  const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
  const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
  const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
  const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect
  const rect5 = getDOMRectMock(0, 70, 10, 10) as DOMRect
  const rect6 = getDOMRectMock(68, 68, 10, 10) as DOMRect
  const rect7 = getDOMRectMock(-10, -10, 10, 10) as DOMRect
  const viewport = { innerWidth: 70, innerHeight: 70 }

  it('should return true if the element is partially in the viewport', () => {
    expect(isElementPartiallyInViewport(rect1, viewport)).toBe(true)
    expect(isElementPartiallyInViewport(rect2, viewport)).toBe(true)
    expect(isElementPartiallyInViewport(rect3, viewport)).toBe(true)
    expect(isElementPartiallyInViewport(rect4, viewport)).toBe(false)
    expect(isElementPartiallyInViewport(rect5, viewport)).toBe(false)
    expect(isElementPartiallyInViewport(rect6, viewport)).toBe(true)
    expect(isElementPartiallyInViewport(rect6, viewport)).toBe(true)
    expect(isElementPartiallyInViewport(rect7, viewport)).toBe(false)
  })
})
