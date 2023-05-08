import { ElementByDirection, FocusableByDirection, FocusableWithKind } from '@/types'
import getColsByWidth from './utils/getColsByWidth'

interface Props {
  group: string
  order: number
  groupSize: number
  groupCols: number | Record<number, number> | undefined
  nextGroupByDirection: ElementByDirection
  viewportWidth: number
}

export default function getNextByOrderGrid ({
  group,
  order,
  groupSize,
  nextGroupByDirection,
  groupCols,
  viewportWidth
}: Props): FocusableByDirection {
  const size = groupSize
  const breakpoints = typeof groupCols === 'number'
    ? { 0: groupCols }
    : (groupCols || { 0: 1 })
  const cols = getColsByWidth(breakpoints, viewportWidth) || 1
  const totalRows = Math.ceil(size / cols)

  const row = Math.floor(order / cols)
  const col = order % cols

  return {
    left: (col <= 0
      ? { id: nextGroupByDirection.left, kind: 'group' }
      : { id: `${group}-${order - 1}`, kind: 'element' }) as FocusableWithKind,
    right: (col >= cols - 1
      ? { id: nextGroupByDirection.right, kind: 'group' }
      : { id: `${group}-${order + 1}`, kind: 'element' }) as FocusableWithKind,
    up: (row <= 0
      ? { id: nextGroupByDirection.up, kind: 'group' }
      : { id: `${group}-${order - cols}`, kind: 'element' }) as FocusableWithKind,
    down: (row >= totalRows - 1
      ? { id: nextGroupByDirection.down, kind: 'group' }
      : { id: `${group}-${order + cols}`, kind: 'element' }) as FocusableWithKind
  }
}
