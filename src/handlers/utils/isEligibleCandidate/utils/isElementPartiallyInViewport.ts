export default function isElementPartiallyInViewport (
  elementRect: DOMRect,
  viewport: { innerWidth: number, innerHeight: number }
): boolean {
  const isHorizontalOverlap = (
    (elementRect.left > 0 && elementRect.left < viewport.innerWidth)
    || (elementRect.right > 0 && elementRect.right < viewport.innerWidth)
    || (elementRect.left < 0 && elementRect.right > viewport.innerWidth)
  )

  const isVerticalOverlap = (
    (elementRect.top > 0 && elementRect.top < viewport.innerHeight)
    || (elementRect.bottom > 0 && elementRect.bottom < viewport.innerHeight)
    || (elementRect.top < 0 && elementRect.bottom > viewport.innerHeight)
  )

  return isHorizontalOverlap && isVerticalOverlap
}
