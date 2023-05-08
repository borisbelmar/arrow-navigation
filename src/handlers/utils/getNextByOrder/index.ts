import { ElementByDirection, FocusableGroupConfig } from '@/types'
import getNextByOrderGrid from './getNextByOrderGrid'
import getNextByOrderHorizontal from './getNextByOrderHorizontal'
import getNextByOrderVertical from './getNextByOrderVertical'

const nextByOrderFuncs = {
  grid: getNextByOrderGrid,
  horizontal: getNextByOrderHorizontal,
  vertical: getNextByOrderVertical
}

interface Props {
  group: string
  order: number
  groupSize: number
  groupCols?: number | Record<number, number>
  nextGroupByDirection?: ElementByDirection
}

export default function getNextByOrder (
  byOrder: FocusableGroupConfig['byOrder'],
  props: Props
) {
  const finalProps: Required<Props> & {
    viewportWidth: number
  } = {
    group: props.group,
    order: props.order || 0,
    groupSize: props.groupSize,
    groupCols: props.groupCols || 1,
    nextGroupByDirection: props.nextGroupByDirection || {},
    viewportWidth: window.innerWidth
  }
  return nextByOrderFuncs[byOrder || 'horizontal'](finalProps)
}
