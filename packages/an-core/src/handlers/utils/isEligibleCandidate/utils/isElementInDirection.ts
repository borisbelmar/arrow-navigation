import type { Rect } from '@/types'
import { isXAxisIntersecting, isYAxisIntersecting } from './isIntersecting'

interface Props {
  direction: string
  currentRect: Rect
  candidateRect: Rect
  threshold?: number
}

export default function isElementInDirection ({
  direction,
  currentRect,
  candidateRect,
  threshold
}: Props): boolean {
  const discriminatorsByDirection: Record<string, () => boolean> = {
    up: () => currentRect.y >= candidateRect.bottom
      && isYAxisIntersecting(currentRect, candidateRect, threshold)
      && currentRect.y !== candidateRect.y,
    down: () => currentRect.bottom <= candidateRect.y
      && isYAxisIntersecting(currentRect, candidateRect, threshold)
      && currentRect.bottom !== candidateRect.bottom,
    left: () => currentRect.x >= candidateRect.right
      && isXAxisIntersecting(currentRect, candidateRect, threshold)
      && currentRect.x !== candidateRect.x,
    right: () => currentRect.right <= candidateRect.x
      && isXAxisIntersecting(currentRect, candidateRect, threshold)
      && currentRect.right !== candidateRect.right
  }

  return discriminatorsByDirection[direction]()
}
