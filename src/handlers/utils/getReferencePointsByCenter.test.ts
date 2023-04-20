import getReferencePointsByCenter from './getReferencePointsByCenter'
import getDOMRectMock from '../../__mocks__/getDOMRect.mock'

describe('getReferencePointsByCenter Function', () => {
  test('calculates the reference points by center correctly', () => {
    const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
    const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
    const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
    const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

    expect(getReferencePointsByCenter(rect1, rect2)).toEqual({
      a: { x: 35, y: 79 },
      b: { x: 25, y: 25 }
    })

    expect(getReferencePointsByCenter(rect1, rect3)).toEqual({
      a: { x: 35, y: 79 },
      b: { x: 70, y: 10 }
    })

    expect(getReferencePointsByCenter(rect1, rect4)).toEqual({
      a: { x: 35, y: 79 },
      b: { x: 85, y: 55 }
    })

    expect(getReferencePointsByCenter(rect2, rect3)).toEqual({
      a: { x: 25, y: 25 },
      b: { x: 70, y: 10 }
    })

    expect(getReferencePointsByCenter(rect2, rect4)).toEqual({
      a: { x: 25, y: 25 },
      b: { x: 85, y: 55 }
    })

    expect(getReferencePointsByCenter(rect3, rect4)).toEqual({
      a: { x: 70, y: 10 },
      b: { x: 85, y: 55 }
    })
  })
})
