export const isYAxisIntersecting = (
  currentRect: DOMRect,
  candidateRect: DOMRect,
  threshold = 0
): boolean => (
  currentRect.left - threshold <= candidateRect.right
  && currentRect.right + threshold >= candidateRect.left
)

export const isXAxisIntersecting = (
  currentRect: DOMRect,
  candidateRect: DOMRect,
  threshold = 0
): boolean => (
  currentRect.top - threshold <= candidateRect.bottom
  && currentRect.bottom + threshold >= candidateRect.top
)
