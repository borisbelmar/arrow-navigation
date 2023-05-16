import { Adapter } from '@/types'
import getNodeRect from './getNodeRect'
import isNodeDisabled from './isNodeDisabled'
import focusNode from './focusNode'
import isNodeFocusable from './isNodeFocusable'
import getNodeRef from './getNodeRef'

const webAdapter: Adapter = {
  type: 'web',
  getNodeRect,
  isNodeDisabled,
  focusNode,
  isNodeFocusable,
  getNodeRef
}

export default webAdapter
