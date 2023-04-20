import getAxisCenter from './getAxisCenter'

export default function getReferencePointsByCenter (
  currentRect: DOMRect,
  candidateRect: DOMRect
) {
  const candidateCenter = getAxisCenter(candidateRect)
  const currentCenter = getAxisCenter(currentRect)

  return {
    a: { x: currentCenter.x, y: currentCenter.y },
    b: { x: candidateCenter.x, y: candidateCenter.y }
  }
}
