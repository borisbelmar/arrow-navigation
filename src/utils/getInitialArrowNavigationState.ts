import type { Adapter, ArrowNavigationState } from '@/types'
import webAdapter from './webAdapter'

interface ArrowNavigationStateProps {
  debug?: boolean
  adapter?: Adapter
  initialFocusElement?: string
  registerCooldown?: number
}

export default function getInitialArrowNavigationState ({
  debug,
  adapter = webAdapter,
  initialFocusElement,
  registerCooldown
}: ArrowNavigationStateProps): ArrowNavigationState {
  return {
    currentElement: null,
    groups: new Map(),
    groupsConfig: new Map(),
    elements: new Map(),
    debug,
    adapter,
    initialFocusElement,
    registerCooldown
  }
}
