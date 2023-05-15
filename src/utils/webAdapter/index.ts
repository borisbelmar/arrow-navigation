import { Adapter } from '@/types'
import getNodeRect from './getNodeRect'
import isNodeDisabled from './isNodeDisabled'
import focusNode from './focusNode'
import isNodeFocusable from './isNodeFocusable'

const webAdapter: Adapter = {
  type: 'web',
  getNodeRect,
  isNodeDisabled,
  focusNode,
  isNodeFocusable
}

export default webAdapter
