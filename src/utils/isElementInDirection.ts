import getAxisCenter from './getAxisCenter'
import { isXAxisIntersecting, isYAxisIntersecting } from './isIntersecting'

export default function isElementInDirection (
  direction: string,
  currentRect: DOMRect,
  candidateRect: DOMRect
): boolean {
  const currentCenter = getAxisCenter(currentRect)
  const candidateCenter = getAxisCenter(candidateRect)

  switch (direction) {
    case 'up':
      return candidateCenter.y < currentCenter.y
        && isYAxisIntersecting(currentRect, candidateRect)
    case 'down':
      return candidateCenter.y > currentCenter.y
        && isYAxisIntersecting(currentRect, candidateRect)
    case 'left':
      return candidateCenter.x < currentCenter.x
        && isXAxisIntersecting(currentRect, candidateRect)
    case 'right':
      return candidateCenter.x > currentCenter.x
        && isXAxisIntersecting(currentRect, candidateRect)
    default:
      return false
  }
}
