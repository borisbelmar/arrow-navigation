import { ArrowNavigationEvents, Direction, FocusEventResult, FocusableGroup, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  direction?: Direction
}

export default function useWatchNextGroup({ direction }: Props = {}) {
  const [nextGroup, setNextGroup] = useState<string | null>(null)
  const [dir, setDir] = useState<Direction | undefined>(direction)

  useEffect(() => {
    const api = getArrowNavigation()
    const handler = ({ direction: pressedDir }: FocusEventResult<FocusableGroup>) => {
      if (!pressedDir) return
      if (!direction || direction === pressedDir) {
        setNextGroup(api.getNextGroup({ direction: direction || pressedDir }) || null)
      }
      if (!direction) {
        setDir(pressedDir)
      }
    }

    api.on(ArrowNavigationEvents.GROUP_FOCUS, handler)
  }, [direction])

  return useMemo(() => ({
    nextGroup,
    direction: dir
  }), [nextGroup, dir])
}
