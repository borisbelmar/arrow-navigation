import { ArrowNavigationEvents, Direction, FocusEventResult, FocusableGroup, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect } from 'react'

export type LastGroupCallback = (group: string | null) => void

interface Options {
  group?: string
  groupPattern?: RegExp
}

export default function useListenLastGroupReached(
  cb: LastGroupCallback,
  direction: Direction,
  { group, groupPattern }: Options = {}
) {
  const api = getArrowNavigation()

  useEffect(() => {
    const handler = ({
      current: groupFocused,
      direction: dir
    }: FocusEventResult<FocusableGroup>) => {
      if (!dir) return
      if (group?.toString() && groupFocused?.id !== group) return
      if (!groupPattern || groupFocused?.id.match(groupPattern)) {
        const noNextGroup = api.getNextGroup({ direction }) === null
        if (noNextGroup) {
          cb(groupFocused?.id || null)
        }
      }
    }

    api.on(ArrowNavigationEvents.GROUP_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.GROUP_FOCUS, handler)
    }
  }, [direction, api, group, groupPattern, cb])
}
