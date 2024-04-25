import type { Rect } from '@/types'
import getAxisCenter from './getAxisCenter'

export default function getReferencePointsByCenter (
  currentRect: Rect,
  candidateRect: Rect
) {
  const candidateCenter = getAxisCenter(candidateRect)
  const currentCenter = getAxisCenter(currentRect)

  return {
    a: { x: currentCenter.x, y: currentCenter.y },
    b: { x: candidateCenter.x, y: candidateCenter.y }
  }
}
