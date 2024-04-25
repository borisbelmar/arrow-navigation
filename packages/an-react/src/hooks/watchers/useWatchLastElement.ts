import { ArrowNavigationEvents, Direction, FocusableElement, getArrowNavigation } from '@arrow-navigation/core'
import { useEffect, useMemo, useState } from 'react'

interface Options {
  group?: string
  inGroup?: boolean
  elementPattern?: RegExp
}

export default function useWatchLastElement(
  direction: Direction,
  { group, inGroup, elementPattern }: Options = {}
) {
  const api = getArrowNavigation()
  const [reachedLastElement, setReachedLastElement] = useState<boolean>(false)
  const [element, setElement] = useState<string | null>(null)

  useEffect(() => {
    const handler = (focusedElement: FocusableElement) => {
      if (group?.toString() && focusedElement.group !== group) return
      if (elementPattern && !focusedElement.id.match(elementPattern)) {
        setReachedLastElement(false)
        return
      }
      const noNextElement = api.getNextElement({ direction, inGroup }) === null
      setReachedLastElement(noNextElement)
      if (noNextElement) {
        setElement(focusedElement.id)
      }
    }

    api.on(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    return () => {
      api.off(ArrowNavigationEvents.ELEMENT_FOCUS, handler)
    }
  }, [direction, group, inGroup, api, elementPattern])

  return useMemo(() => ({
    reachedLastElement,
    element
  }), [reachedLastElement, element])
}
