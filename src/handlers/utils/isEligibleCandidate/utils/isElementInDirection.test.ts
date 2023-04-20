import isElementInDirection from './isElementInDirection'
import getDOMRectMock from '../../../../__mocks__/getDOMRect.mock'

describe('isElementInDirection', () => {
  const rect1 = getDOMRectMock(20, 64, 30, 30) as DOMRect
  const rect2 = getDOMRectMock(0, 0, 50, 50) as DOMRect
  const rect3 = getDOMRectMock(60, 0, 20, 20) as DOMRect
  const rect4 = getDOMRectMock(70, 40, 30, 30) as DOMRect

  test('isElementInDirection without threshold', () => {
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect1,
      candidateRect: rect2
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect1,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect2,
      candidateRect: rect3
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect3,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect4,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect4,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect4,
      candidateRect: rect3
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'up',
      currentRect: rect2,
      candidateRect: rect1
    })).toBe(false)

    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect1,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect1,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect2,
      candidateRect: rect3
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect3,
      candidateRect: rect4
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect4,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect4,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect4,
      candidateRect: rect3
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'down',
      currentRect: rect2,
      candidateRect: rect1
    })).toBe(true)

    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect1,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect1,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect2,
      candidateRect: rect3
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect3,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect4,
      candidateRect: rect1
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect2,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect3,
      candidateRect: rect2
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'left',
      currentRect: rect4,
      candidateRect: rect2
    })).toBe(true)

    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect1,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect1,
      candidateRect: rect4
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect2,
      candidateRect: rect3
    })).toBe(true)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect3,
      candidateRect: rect4
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect4,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect4,
      candidateRect: rect2
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect4,
      candidateRect: rect3
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect2,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect2,
      candidateRect: rect1
    })).toBe(false)
    expect(isElementInDirection({
      direction: 'right',
      currentRect: rect2,
      candidateRect: rect4
    })).toBe(true)
  })
})
