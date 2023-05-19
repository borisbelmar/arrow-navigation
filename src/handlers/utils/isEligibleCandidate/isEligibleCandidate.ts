import type { Rect } from '@/types'
import isElementInDirection from './utils/isElementInDirection'
import isElementPartiallyInViewport from './utils/isElementPartiallyInViewport'

interface Props {
  direction?: string
  currentRect: Rect
  candidateRect: Rect
  isViewportSafe?: boolean
  threshold?: number
}

export default function isEligibleCandidate ({
  direction,
  currentRect,
  candidateRect,
  isViewportSafe,
  threshold
}: Props): boolean {
  return (
    (direction ? isElementInDirection({ direction, currentRect, candidateRect, threshold }) : true)
    && (isViewportSafe ? isElementPartiallyInViewport(candidateRect, window) : true)
  )
}
