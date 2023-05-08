import { ElementByDirection, FocusableByDirection, FocusableWithKind } from '@/types'

interface Props {
  group: string
  order: number
  groupSize: number
  nextGroupByDirection: ElementByDirection
}

export default function getNextByOrderHorizontal ({
  group,
  order,
  groupSize,
  nextGroupByDirection
}: Props): FocusableByDirection {
  const size = groupSize

  return {
    left: (order <= 0
      ? { id: nextGroupByDirection.left, kind: 'group' }
      : { id: `${group}-${order - 1}`, kind: 'element' }) as FocusableWithKind,
    right: (order >= size - 1
      ? { id: nextGroupByDirection.right, kind: 'group' }
      : { id: `${group}-${order + 1}`, kind: 'element' }) as FocusableWithKind,
    up: { id: nextGroupByDirection.up, kind: 'group' },
    down: { id: nextGroupByDirection.down, kind: 'group' }
  }
}
