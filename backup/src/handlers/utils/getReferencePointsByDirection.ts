import type { Rect } from '@/types'
import getAxisCenter from './getAxisCenter'

export default function getReferencePointsByDirection (
  direction: string | undefined,
  currentRect: Rect,
  candidateRect: Rect
) {
  const currentCenter = getAxisCenter(currentRect)
  const candidateCenter = getAxisCenter(candidateRect)

  switch (direction) {
    case 'up':
      return {
        a: { x: currentCenter.x, y: currentRect.top },
        b: { x: candidateCenter.x, y: candidateRect.bottom }
      }
    case 'down':
      return {
        a: { x: currentCenter.x, y: currentRect.bottom },
        b: { x: candidateCenter.x, y: candidateRect.top }
      }
    case 'left':
      return {
        a: { x: currentRect.left, y: currentCenter.y },
        b: { x: candidateRect.right, y: candidateCenter.y }
      }
    case 'right':
      return {
        a: { x: currentRect.right, y: currentCenter.y },
        b: { x: candidateRect.left, y: candidateCenter.y }
      }
    default:
      return {
        a: currentCenter,
        b: candidateCenter
      }
  }
}
