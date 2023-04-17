export const isYAxisIntersecting = (currentRect: DOMRect, candidateRect: DOMRect): boolean => (
  currentRect.left <= candidateRect.right
  && currentRect.right >= candidateRect.left
)

export const isXAxisIntersecting = (currentRect: DOMRect, candidateRect: DOMRect): boolean => (
  currentRect.top <= candidateRect.bottom
  && currentRect.bottom >= candidateRect.top
)
