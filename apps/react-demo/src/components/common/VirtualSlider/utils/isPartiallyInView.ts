interface Rect {
  top: number
  right: number
  bottom: number
  left: number
}

export default function isPartiallyInView(
  elementRect: Rect,
  viewportRect: Rect,
  thresholdY = 0,
  thresholdX = 0
) {
  const viewportTop = viewportRect.top - thresholdY
  const viewportBottom = viewportRect.bottom + thresholdY
  const viewportLeft = viewportRect.left - thresholdX
  const viewportRight = viewportRect.right + thresholdX
  const isHorizontalOverlap = (
    (elementRect.left > viewportLeft && elementRect.left < viewportRight)
    || (elementRect.right > viewportLeft && elementRect.right < viewportRight)
    || (elementRect.left < viewportLeft && elementRect.right > viewportRight)
  )

  const isVerticalOverlap = (
    (elementRect.top > viewportTop && elementRect.top < viewportBottom)
    || (elementRect.bottom > viewportTop && elementRect.bottom < viewportBottom)
    || (elementRect.top < viewportTop && elementRect.bottom > viewportBottom)
  )

  return isHorizontalOverlap && isVerticalOverlap
}
