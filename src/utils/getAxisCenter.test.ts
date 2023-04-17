import getAxisCenter from './getAxisCenter'
import getDOMRectMock from '../__mocks__/getDOMRect.mock'

describe('getAxisCenter Function', () => {
  test('calculates the axis center of a rectangle correctly', () => {
    const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
    const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
    const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
    const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

    expect(getAxisCenter(rect1)).toEqual({ x: 35, y: 79 })
    expect(getAxisCenter(rect2)).toEqual({ x: 25, y: 25 })
    expect(getAxisCenter(rect3)).toEqual({ x: 70, y: 10 })
    expect(getAxisCenter(rect4)).toEqual({ x: 85, y: 55 })
  })
})
