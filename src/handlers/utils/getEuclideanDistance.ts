import type { Point } from '@/types'

export default function getEuclideanDistance (
  pointA: Point,
  pointB: Point
) {
  return Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2)
}
