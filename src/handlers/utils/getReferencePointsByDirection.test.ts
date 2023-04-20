import getReferencePointsByDirection from './getReferencePointsByDirection'
import getDOMRectMock from '../../__mocks__/getDOMRect.mock'

describe('getReferencePointsByDirection Function', () => {
  const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
  const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
  const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
  const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

  it('calculates the reference points by direction correctly', () => {
    expect(getReferencePointsByDirection('up', rect1, rect2)).toEqual({
      a: { x: 35, y: 64 },
      b: { x: 25, y: 50 }
    })

    expect(getReferencePointsByDirection('down', rect2, rect1)).toEqual({
      a: { x: 25, y: 50 },
      b: { x: 35, y: 64 }
    })

    expect(getReferencePointsByDirection('left', rect3, rect2)).toEqual({
      a: { x: 60, y: 10 },
      b: { x: 50, y: 25 }
    })

    expect(getReferencePointsByDirection('right', rect1, rect4)).toEqual({
      a: { x: 50, y: 79 },
      b: { x: 70, y: 55 }
    })
  })

  it('should return center reference points if not direction', () => {
    expect(getReferencePointsByDirection(undefined, rect1, rect2)).toEqual({
      a: { x: 35, y: 79 },
      b: { x: 25, y: 25 }
    })
  })
})
