import type { Rect } from '@/types'

export default function getAxisCenter (rect: Rect) {
  return {
    x: (rect.left + rect.right) / 2,
    y: (rect.top + rect.bottom) / 2
  }
}
