import type { Rect } from '@/types'

export const isYAxisIntersecting = (
  currentRect: Rect,
  candidateRect: Rect,
  threshold = 0
): boolean => (
  currentRect.left - threshold <= candidateRect.right
  && currentRect.right + threshold >= candidateRect.left
)

export const isXAxisIntersecting = (
  currentRect: Rect,
  candidateRect: Rect,
  threshold = 0
): boolean => (
  currentRect.top - threshold <= candidateRect.bottom
  && currentRect.bottom + threshold >= candidateRect.top
)
