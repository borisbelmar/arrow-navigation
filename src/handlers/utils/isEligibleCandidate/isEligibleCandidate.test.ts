import isEligibleCandidate from './isEligibleCandidate'
import getDOMRectMock from '../../../__mocks__/getDOMRect.mock'

describe('isEligibleCandidate', () => {
  const rect1 = getDOMRectMock(0, 0, 10, 10) as DOMRect
  const rect2 = getDOMRectMock(12, 12, 10, 10) as DOMRect
  const rect3 = getDOMRectMock(25, 0, 10, 10) as DOMRect
  const rect4 = getDOMRectMock(2, 24, 10, 10) as DOMRect
  const rect5 = getDOMRectMock(15, 25, 10, 10) as DOMRect

  beforeEach(() => {
    window.innerWidth = 25
    window.innerHeight = 25
  })

  it('should return true if the element is in the direction without threshold and partially in the viewport if isViewportSafe is true', () => {
    const isViewportSafe = true
    const threshold = 0
    expect(isEligibleCandidate({
      currentRect: rect1,
      candidateRect: rect4,
      direction: 'down',
      threshold,
      isViewportSafe
    })).toBe(true)
    expect(isEligibleCandidate({
      currentRect: rect2,
      candidateRect: rect5,
      direction: 'down',
      threshold,
      isViewportSafe
    })).toBe(false)
    expect(isEligibleCandidate({
      currentRect: rect1,
      candidateRect: rect3,
      direction: 'right',
      threshold,
      isViewportSafe
    })).toBe(false)
  })

  it('should return true if the element is in the direction with threshold and partially in the viewport if isViewportSafe is true', () => {
    const isViewportSafe = true
    const threshold = 3
    expect(isEligibleCandidate({
      currentRect: rect1,
      candidateRect: rect2,
      direction: 'right',
      threshold,
      isViewportSafe
    })).toBe(true)
    expect(isEligibleCandidate({
      currentRect: rect2,
      candidateRect: rect5,
      direction: 'down',
      threshold,
      isViewportSafe
    })).toBe(false)
    expect(isEligibleCandidate({
      currentRect: rect1,
      candidateRect: rect4,
      direction: 'down',
      threshold,
      isViewportSafe
    })).toBe(true)
  })

  it('should return true if the element is in the direction without threshold and not in the viewport if isViewportSafe is false', () => {
    const isViewportSafe = false
    const threshold = 0
    expect(isEligibleCandidate({
      currentRect: rect2,
      candidateRect: rect5,
      direction: 'down',
      threshold,
      isViewportSafe
    })).toBe(true)
    expect(isEligibleCandidate({
      currentRect: rect1,
      candidateRect: rect3,
      direction: 'right',
      threshold,
      isViewportSafe
    })).toBe(true)
  })

  it('should return true if the element is in the direction with threshold and not in the viewport if isViewportSafe is false', () => {
    const isViewportSafe = false
    const threshold = 3
    expect(isEligibleCandidate({
      currentRect: rect5,
      candidateRect: rect3,
      direction: 'up',
      threshold,
      isViewportSafe
    })).toBe(true)
  })

  it('should not consider a valid candidate if not in direction ', () => {
    const rectA = getDOMRectMock(0, 0, 16, 52) as DOMRect
    const rectB = getDOMRectMock(16, 36, 52, 16) as DOMRect

    const threshold = 0
    expect(isEligibleCandidate({
      currentRect: rectA,
      candidateRect: rectB,
      direction: 'right',
      threshold
    })).toBe(true)

    expect(isEligibleCandidate({
      currentRect: rectA,
      candidateRect: rectB,
      direction: 'down',
      threshold
    })).toBe(false)
  })

  it('should not consider the direction if not defined', () => {
    const rectA = getDOMRectMock(0, 0, 16, 52) as DOMRect
    const rectB = getDOMRectMock(16, 36, 52, 16) as DOMRect

    const threshold = 0
    expect(isEligibleCandidate({
      currentRect: rectA,
      candidateRect: rectB,
      direction: undefined,
      threshold
    })).toBe(true)
  })
})
