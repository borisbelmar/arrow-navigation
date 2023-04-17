import getEuclideanDistance from './getEuclideanDistance'
import { Point } from '../types.d'

describe('getEuclideanDistance Function', () => {
  test('calculates the Euclidean distance between two points correctly', () => {
    const point1: Point = { x: 0, y: 0 }
    const point2: Point = { x: 3, y: 4 }
    const point3: Point = { x: 5, y: 5 }
    const point4: Point = { x: -5, y: -5 }

    expect(getEuclideanDistance(point1, point2)).toBeCloseTo(5)
    expect(getEuclideanDistance(point1, point3)).toBeCloseTo(7.071)
    expect(getEuclideanDistance(point1, point4)).toBeCloseTo(7.071)
    expect(getEuclideanDistance(point2, point3)).toBeCloseTo(2.236)
    expect(getEuclideanDistance(point2, point4)).toBeCloseTo(12.042)
    expect(getEuclideanDistance(point3, point4)).toBeCloseTo(14.142)
  })
})
