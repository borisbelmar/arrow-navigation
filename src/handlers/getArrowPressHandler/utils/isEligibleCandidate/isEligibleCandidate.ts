import isElementInDirection from './utils/isElementInDirection'
import isElementPartiallyInViewport from './utils/isElementPartiallyInViewport'

interface Props {
  direction: string
  currentRect: DOMRect
  candidateRect: DOMRect
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
    isElementInDirection({ direction, currentRect, candidateRect, threshold })
    && (isViewportSafe ? isElementPartiallyInViewport(candidateRect, window) : true)
  )
}
