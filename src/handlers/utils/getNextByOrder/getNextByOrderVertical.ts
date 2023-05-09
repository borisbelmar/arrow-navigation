import { ElementByDirection, FocusableByDirection, FocusableWithKind } from '@/types'
import getElementIdByOrder from '@/utils/getElementIdByOrder'

interface Props {
  group: string
  order: number
  groupSize: number
  nextGroupByDirection: ElementByDirection
}

export default function getNextByOrderVertical ({
  group,
  order,
  groupSize,
  nextGroupByDirection
}: Props): FocusableByDirection {
  const size = groupSize

  return {
    up: (order <= 0
      ? { id: nextGroupByDirection.up, kind: 'group' }
      : { id: getElementIdByOrder(group, order - 1), kind: 'element' }) as FocusableWithKind,
    down: (order >= size - 1
      ? { id: nextGroupByDirection.down, kind: 'group' }
      : { id: getElementIdByOrder(group, order + 1), kind: 'element' }) as FocusableWithKind,
    left: { id: nextGroupByDirection.left, kind: 'group' },
    right: { id: nextGroupByDirection.right, kind: 'group' }
  }
}
