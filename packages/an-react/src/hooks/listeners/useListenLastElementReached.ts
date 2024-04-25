import { ArrowNavigationEvents, Direction, FocusEventResult, FocusableElement, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect } from 'react'

export type LastElementCallback = (element: string | null) => void

interface Options {
  group?: string
  inGroup?: boolean
  elementPattern?: RegExp
}

export default function useListenLastElementReached(
  cb: LastElementCallback,
  direction: Direction,
  { group, inGroup, elementPattern }: Options = {}
) {
  const api = getArrowNavigation()

  useEffect(() => {
    const handler = ({
      current: focusedElement,
      direction: dir
    }: FocusEventResult<FocusableElement>) => {
      if (!dir) return
      if (group?.toString() && focusedElement?.group !== group) return
      if (!elementPattern || focusedElement?.id.match(elementPattern)) {
        const noNextElement = api.getNextElement({ direction, inGroup }) === null
        if (noNextElement) {
          cb(focusedElement?.id || null)
        }
      }
    }

    api.on(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    }
  }, [direction, group, inGroup, api, elementPattern, cb])
}
